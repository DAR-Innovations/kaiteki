package org.kaiteki.backend.integrations.modules.github.models.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class GitHubAccessTokenResponse {
    @JsonProperty("access_token")
    private String accessToken;
    @JsonProperty("refresh_token")
    private String refreshToken;
    private List<String> scope;
    @JsonProperty("token_type")
    private String tokenType;
    @JsonProperty("token_type")
    private int expiresIn;
}
