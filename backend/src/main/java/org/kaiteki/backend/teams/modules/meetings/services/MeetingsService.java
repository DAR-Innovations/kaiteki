package org.kaiteki.backend.teams.modules.meetings.services;

import static java.util.Objects.nonNull;

import java.time.ZonedDateTime;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.kaiteki.backend.shared.utils.JpaSpecificationBuilder;
import org.kaiteki.backend.teams.model.dto.TeamMembersDTO;
import org.kaiteki.backend.teams.model.entity.TeamMembers;
import org.kaiteki.backend.teams.model.entity.Teams;
import org.kaiteki.backend.teams.modules.meetings.models.dto.CreateMeetingDTO;
import org.kaiteki.backend.teams.modules.meetings.models.dto.MeetingsDTO;
import org.kaiteki.backend.teams.modules.meetings.models.dto.MeetingsFilterDTO;
import org.kaiteki.backend.teams.modules.meetings.models.dto.UpdateMeetingDTO;
import org.kaiteki.backend.teams.modules.meetings.models.entity.MeetingParticipants;
import org.kaiteki.backend.teams.modules.meetings.models.entity.Meetings;
import org.kaiteki.backend.teams.modules.meetings.models.enums.MeetingsStatus;
import org.kaiteki.backend.teams.modules.meetings.repository.MeetingsRepository;
import org.kaiteki.backend.teams.modules.performance.models.dto.AddMemberPerformanceValuesDTO;
import org.kaiteki.backend.teams.modules.performance.models.enums.PerformanceMetricsType;
import org.kaiteki.backend.teams.modules.performance.services.TeamMemberPerformanceService;
import org.kaiteki.backend.teams.service.TeamMembersService;
import org.kaiteki.backend.teams.service.TeamsService;
import org.kaiteki.backend.users.models.enitities.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MeetingsService {
    private final MeetingsRepository meetingsRepository;
    private final TeamMembersService teamMembersService;
    private final TeamsService teamsService;
    private final MeetingParticipantsService meetingParticipantsService;
    private final TeamMemberPerformanceService teamMemberPerformanceService;

    public Meetings getById(Long id) {
        return meetingsRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Meeting not found"));
    }

    public MeetingsDTO getMeetingDTO(Long id, Long teamId) {
        Teams team = teamsService.getTeamById(teamId);

        return meetingsRepository.findByIdAndTeam(id, team)
                .map(this::convertToDTO)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Meeting not found"));
    }

    @Transactional
    public void createMeeting(CreateMeetingDTO dto) {
        Teams team = teamsService.getTeamById(dto.getTeamId());
        TeamMembers currentMember = teamMembersService.getCurrentTeamMember(team);

        Set<TeamMembers> invitedMembers = new HashSet<>(
                teamMembersService.getAllTeamMembersByIds(dto.getInvitedMemberIds()));

        Meetings meeting = Meetings.builder()
                .createdDate(ZonedDateTime.now())
                .createdMember(currentMember)
                .description(dto.getDescription())
                .endDate(dto.getEndDate())
                .title(dto.getTitle())
                .status(MeetingsStatus.SCHEDULED)
                .startDate(dto.getStartDate())
                .invitedMembers(invitedMembers)
                .team(team)
                .build();

        meetingsRepository.save(meeting);
    }

    public Page<MeetingsDTO> getMeetings(Long teamId, Pageable pageable, MeetingsFilterDTO filter) {
        Specification<Meetings> filterSpec = getFilterSpecification(filter, teamId);

        return meetingsRepository.findAll(filterSpec, pageable)
                .map(this::convertToDTO);
    }

    private Specification<Meetings> getFilterSpecification(MeetingsFilterDTO filterDTO, Long teamId) {
        JpaSpecificationBuilder<Meetings> filterBuilder = new JpaSpecificationBuilder<Meetings>()
                .equal("status", filterDTO.getStatus())
                .joinAndIdsIn("invitedMembers", "id", filterDTO.getInvitedMemberIds())
                .joinAndEqual("team", "id", teamId);

        if (nonNull(filterDTO.getStartDate()) && nonNull(filterDTO.getEndDate())) {
            filterBuilder.between("startDate",
                    filterDTO.getStartDate().atStartOfDay(),
                    filterDTO.getEndDate().atTime(23, 59, 59));
        }

        if (!StringUtils.isEmpty(filterDTO.getSearchValue())) {
            String searchValue = filterDTO.getSearchValue();

            Map<String, String> searchValueMap = new HashMap<>();
            searchValueMap.put("title", searchValue);
            searchValueMap.put("description", searchValue);

            filterBuilder.orLike(searchValueMap);
        }

        return filterBuilder.build();
    }

    @Transactional
    public void deleteMeeting(Long meetingId, Long teamId) {
        Meetings meeting = getById(meetingId);
        Teams team = teamsService.getTeamById(teamId);
        TeamMembers currentMember = teamMembersService.getCurrentTeamMember(team);

        if (!meeting.getCreatedMember().getId().equals(currentMember.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Current members is not creator of meeting");
        }

        meetingsRepository.delete(meeting);
    }

    @Transactional
    public void updateMeeting(Long meetingId, UpdateMeetingDTO dto) {
        Meetings meeting = getById(meetingId);
        Teams team = teamsService.getTeamById(dto.getTeamId());
        TeamMembers currentMember = teamMembersService.getCurrentTeamMember(team);

        if (!meeting.getCreatedMember().getId().equals(currentMember.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Current members is not creator of meeting");
        }

        if (StringUtils.isNotEmpty(dto.getDescription())) {
            meeting.setDescription(dto.getDescription());
        }
        if (StringUtils.isNotEmpty(dto.getTitle())) {
            meeting.setTitle(dto.getTitle());
        }
        if (nonNull(dto.getStartDate())) {
            dto.setStartDate(dto.getStartDate());
        }
        if (!dto.getInvitedMemberIds().isEmpty()) {
            Set<TeamMembers> invitedMembers = new HashSet<>(
                    teamMembersService.getAllTeamMembersByIds(dto.getInvitedMemberIds()));

            boolean membersEqual = invitedMembers.equals(meeting.getInvitedMembers());
            if (!membersEqual) {
                meeting.setInvitedMembers(invitedMembers);
            }
        }

        meeting.setEndDate(dto.getEndDate());
        meeting.setUpdatedDate(ZonedDateTime.now());

        meetingsRepository.save(meeting);
    }

    @Transactional
    public MeetingsDTO convertToDTO(Meetings meeting) {
        TeamMembersDTO createdMember = teamMembersService.convertToDTO(meeting.getCreatedMember());
        Set<TeamMembersDTO> invitedMembers = meeting.getInvitedMembers().stream()
                .map(teamMembersService::convertToDTO)
                .collect(Collectors.toSet());

        return MeetingsDTO.builder()
                .createdDate(meeting.getCreatedDate())
                .start(meeting.getStartDate())
                .end(meeting.getEndDate())
                .createdMember(createdMember)
                .id(meeting.getId())
                .description(meeting.getDescription())
                .invitedMembers(invitedMembers)
                .status(meeting.getStatus())
                .title(meeting.getTitle())
                .build();
    }
    public List<Meetings> findAllByTeamIn(List<Teams> teams) {
        return meetingsRepository.findAllByTeamIn(teams);
    }


    public  Page<Meetings> findAllByTeam(Teams team, Pageable pageable) {
        return meetingsRepository.findAllByTeam(team, pageable);
    }

    @Transactional
    public void joinMeetingRoom(Long teamId, Long meetingId) {
        Meetings meeting = getById(meetingId);
        TeamMembers currentTeamMember = teamMembersService.getCurrentTeamMember(teamId);

        Set<TeamMembers> invitedMembers = meeting.getInvitedMembers();

        if (!invitedMembers.contains(currentTeamMember)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Current user is not invited to the meeting");
        }

        MeetingParticipants newParticipant = meetingParticipantsService.createMeetingParticipant(meeting,
                currentTeamMember);

        Set<MeetingParticipants> participants = meeting.getParticipatedMembers();
        participants.add(newParticipant);

        meeting.setParticipatedMembers(participants);
        meetingsRepository.save(meeting);

        teamMemberPerformanceService.addMemberPerformanceValues(
                currentTeamMember.getId(),
                AddMemberPerformanceValuesDTO.builder().attendantMeetings(1).build()
        );
    }

    @Transactional
    public void leaveMeetingRoom(Long teamId, Long meetingId) {
        Meetings meeting = getById(meetingId);
        TeamMembers currentTeamMember = teamMembersService.getCurrentTeamMember(teamId);

        meetingParticipantsService.updateMeetingParticipants(meeting, currentTeamMember, ZonedDateTime.now());
    }

    public List<MeetingsDTO> getAllMeetingsByUser(Users currentUser) {
        Sort sort = Sort.by(Sort.Direction.DESC, "startDate");

        return meetingsRepository.findByInvitedMembers_User(currentUser, sort).stream()
                .map(this::convertToDTO)
                .toList();
    }
}
