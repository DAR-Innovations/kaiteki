package org.kaiteki.backend.teams.model.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.Date;

@Data
@Builder
public class TeamMembersDTO {
    private Long id;
    private String fullName;
    private Long avatarId;
    private String shortenFullName;
    private String firstname;
    private String lastname;
    private String email;
    private String position;
    private ZonedDateTime joinedDate;
    private BigDecimal performance;
    private Date birthDate;
}
