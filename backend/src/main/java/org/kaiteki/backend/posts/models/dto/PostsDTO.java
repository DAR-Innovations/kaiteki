package org.kaiteki.backend.posts.models.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class PostsDTO {
    private Long id;
    private String title;
    private String description;
    private String content;
    private LocalDateTime createdDate;
    private String authorFullName;
}
