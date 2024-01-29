package org.kaiteki.backend.teams.model.dto;

import lombok.Data;

@Data
public class TeamMembersFilterDTO {
    private Integer size;
    private Integer page;
    private String searchValue;
    private String sort;
}
