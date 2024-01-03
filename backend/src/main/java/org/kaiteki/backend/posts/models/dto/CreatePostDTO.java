package org.kaiteki.backend.posts.models.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Data
@Builder
public class CreatePostDTO {
    private String title;
    private String description;
    private String content;
    private MultipartFile image;
    private Long teamId;
}
