package org.kaiteki.backend.teams.model.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class TeamMembersDTO {
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String position;
    private Date joinedDate;
    private int performance;
}
