package org.kaiteki.backend.teams.modules.posts.models.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
public class UpdatePostDTO {
    private String title;
    private String description;
    private String content;
    private MultipartFile image;
}
