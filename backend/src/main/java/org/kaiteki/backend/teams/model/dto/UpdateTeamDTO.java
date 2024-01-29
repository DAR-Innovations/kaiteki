package org.kaiteki.backend.teams.model.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class UpdateTeamDTO {
    private String name;
    private String description;
}
