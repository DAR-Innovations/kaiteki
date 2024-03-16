package org.kaiteki.backend.teams.files.models.dto;

import lombok.Data;

@Data
public class UpdateTeamFileDTO {
    private String filename;
    private String description;
}
