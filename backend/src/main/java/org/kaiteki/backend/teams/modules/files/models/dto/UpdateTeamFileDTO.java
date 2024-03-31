package org.kaiteki.backend.teams.modules.files.models.dto;

import lombok.Data;

@Data
public class UpdateTeamFileDTO {
    private String filename;
    private String description;
}
