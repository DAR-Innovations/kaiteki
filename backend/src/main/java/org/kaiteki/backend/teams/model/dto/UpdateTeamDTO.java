package org.kaiteki.backend.teams.model.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@RequiredArgsConstructor
public class UpdateTeamDTO {
    private String name;
    private String description;
    private MultipartFile logo;
}
