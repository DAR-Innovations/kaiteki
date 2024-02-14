package org.kaiteki.backend.files.model.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UploadTeamFileDTO {
    private String description;
    private MultipartFile file;
}
