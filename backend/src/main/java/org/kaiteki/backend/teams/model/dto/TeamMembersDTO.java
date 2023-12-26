package org.kaiteki.backend.teams.model.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

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
    private LocalDateTime joinedDate;
    private int performance;
}
