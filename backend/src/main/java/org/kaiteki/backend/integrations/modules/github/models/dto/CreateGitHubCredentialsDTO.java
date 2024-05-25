package org.kaiteki.backend.integrations.modules.github.models.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateGitHubCredentialsDTO {
    private String githubUsername;
//    private String accessToken;
//    private String refreshToken;
//    private String scope;
//    private Long userId;
//    private ZonedDateTime expiresDate;
}
