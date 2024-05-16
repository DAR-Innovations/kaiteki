package org.kaiteki.backend.integrations.modules.github.models.dto;

import lombok.Builder;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
@Builder
public class CreateGitHubCredentialsDTO {
    private String accessToken;
    private String refreshToken;
    private String scope;
    private Long userId;
    private ZonedDateTime expiresDate;
}
