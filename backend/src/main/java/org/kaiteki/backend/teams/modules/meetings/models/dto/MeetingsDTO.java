package org.kaiteki.backend.meetings.models.dto;

import lombok.Builder;
import lombok.Data;
import org.kaiteki.backend.meetings.models.enums.MeetingsStatus;
import org.kaiteki.backend.teams.model.dto.TeamMembersDTO;

import java.time.ZonedDateTime;
import java.util.Set;

@Data
@Builder
public class MeetingsDTO {
    private Long id;
    private String title;
    private String description;
    private MeetingsStatus status;
    private Set<TeamMembersDTO> invitedMembers;
    private TeamMembersDTO createdMember;
    private ZonedDateTime createdDate;
    private ZonedDateTime start;
    private ZonedDateTime end;
}
