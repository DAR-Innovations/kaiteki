package org.kaiteki.backend.integrations.modules.github.models.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
@Builder
public class GitHubUserDTO {
    private Long id;
    private String login;
    private String name;
    @JsonProperty("public_repos")
    private int publicRepos;
    @JsonProperty("node_id")
    private int nodeId;
    @JsonProperty("created_at")
    private ZonedDateTime createdAt;
    private String location;
    private String email;
    private String bio;
    @JsonProperty("avatar_url")
    private String avatarUrl;
}
