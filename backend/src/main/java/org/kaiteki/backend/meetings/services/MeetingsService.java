package org.kaiteki.backend.meetings.services;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.kaiteki.backend.meetings.models.dto.CreateMeetingDTO;
import org.kaiteki.backend.meetings.models.dto.MeetingsDTO;
import org.kaiteki.backend.meetings.models.dto.MeetingsFilterDTO;
import org.kaiteki.backend.meetings.models.dto.UpdateMeetingDTO;
import org.kaiteki.backend.meetings.models.entity.Meetings;
import org.kaiteki.backend.meetings.models.enums.MeetingsStatus;
import org.kaiteki.backend.meetings.repository.MeetingsRepository;
import org.kaiteki.backend.shared.utils.DateFormattingUtil;
import org.kaiteki.backend.shared.utils.JpaSpecificationBuilder;
import org.kaiteki.backend.teams.model.dto.TeamMembersDTO;
import org.kaiteki.backend.teams.model.entity.TeamMembers;
import org.kaiteki.backend.teams.model.entity.Teams;
import org.kaiteki.backend.teams.service.TeamMembersService;
import org.kaiteki.backend.teams.service.TeamsService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MeetingsService {
    private final MeetingsRepository meetingsRepository;
    private final TeamMembersService teamMembersService;
    private final TeamsService teamsService;

    private Meetings getById(Long id) {
        return meetingsRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Meeting not found"));
    }

    @Transactional
    private void createMeeting(CreateMeetingDTO dto) {
        Teams team = teamsService.getTeam(dto.getTeamId());
        TeamMembers currentMember = teamMembersService.getCurrentTeamMember(team);

        Set<TeamMembers> invitedMembers = new HashSet<>(
                teamMembersService.getAllTeamMembersByIds(dto.getInvitedMemberIds())
        );

        invitedMembers.add(currentMember);

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

    public Page<MeetingsDTO> searchMeetings(Pageable pageable, MeetingsFilterDTO filter) {
        Specification<Meetings> filterSpec = getFilterSpecification(filter);

        return meetingsRepository.findAll(filterSpec, pageable)
                .map(this::convertToDTO);
    }

    private Specification<Meetings> getFilterSpecification(MeetingsFilterDTO filterDTO) {
        JpaSpecificationBuilder<Meetings> filterBuilder = new JpaSpecificationBuilder<Meetings>()
                .equal("status", filterDTO.getStatus())
                .between("createdDate", filterDTO.getStartDate(), DateFormattingUtil.setTimeToEndOfDay(filterDTO.getEndDate()))
                .joinAndEqual("createdMember", "id", filterDTO.getCreatedMemberId())
                .joinAndIdsIn("invitedMembers", "id", filterDTO.getInvitedMemberIds());

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
        Teams team = teamsService.getTeam(teamId);
        TeamMembers currentMember = teamMembersService.getCurrentTeamMember(team);

        if (!meeting.getCreatedMember().getId().equals(currentMember.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Current members is not creator of meeting");
        }

        meetingsRepository.delete(meeting);
    }

    @Transactional
    public void updateMeeting(Long meetingId, UpdateMeetingDTO dto) {
        Meetings meeting = getById(meetingId);
        Teams team = teamsService.getTeam(dto.getTeamId());
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
        if (Objects.nonNull(dto.getStartDate())) {
            dto.setStartDate(dto.getStartDate());
        }
        if (!dto.getInvitedMemberIds().isEmpty()) {
            Set<TeamMembers> invitedMembers = new HashSet<>(
                    teamMembersService.getAllTeamMembersByIds(dto.getInvitedMemberIds())
            );

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
}
