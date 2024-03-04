package org.kaiteki.backend.meetings.services;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.kaiteki.backend.integrations.zoom.ZoomIntegrationService;
import org.kaiteki.backend.integrations.zoom.models.ZoomSignatureRequest;
import org.kaiteki.backend.integrations.zoom.models.ZoomSignatureResponse;
import org.kaiteki.backend.meetings.models.dto.*;
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

import static java.util.Objects.nonNull;

@Service
@RequiredArgsConstructor
public class MeetingsService {
    private final MeetingsRepository meetingsRepository;
    private final TeamMembersService teamMembersService;
    private final TeamsService teamsService;
    private final ZoomIntegrationService zoomIntegrationService;

    private Meetings getById(Long id) {
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

    public MeetingSignatureResponse generateMeetingSignature(MeetingSignatureRequest request) {
        Meetings meeting = getById(request.getMeetingRoomId());

        ZoomSignatureRequest zoomReq = ZoomSignatureRequest.builder()
                .meetingRoomId(meeting.getId())
                .role(request.getRole())
                .build();

        ZoomSignatureResponse zoomResp = zoomIntegrationService.generateSignature(zoomReq);

        return MeetingSignatureResponse.builder()
                .signature(zoomResp.getSignature())
                .build();
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
