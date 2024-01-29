package org.kaiteki.backend.posts.models.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdatePostDTO {
    private String title;
    private String description;
    private String content;
}
