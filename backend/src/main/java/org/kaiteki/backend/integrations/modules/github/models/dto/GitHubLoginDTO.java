package org.kaiteki.backend.integrations.modules.github.models.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GitHubLoginDTO {
    private String loginUrl;
}
