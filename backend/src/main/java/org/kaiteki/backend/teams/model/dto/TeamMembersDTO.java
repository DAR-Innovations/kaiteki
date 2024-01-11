package org.kaiteki.backend.teams.model.dto;

import lombok.Builder;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
@Builder
public class TeamMembersDTO {
    private Long id;
    private String fullName;
    private String shortenFullName;
    private String firstname;
    private String lastname;
    private String email;
    private String position;
    private ZonedDateTime joinedDate;
    private int performance;
}
