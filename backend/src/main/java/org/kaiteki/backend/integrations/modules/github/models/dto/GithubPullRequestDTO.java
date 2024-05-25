package org.kaiteki.backend.integrations.modules.github.models.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.ZonedDateTime;

@Data
public class GithubPullRequestDTO {
    private String url;
    private Long id;
    @JsonProperty("node_id")
    private String nodeId;
    private String state;
    private String title;
    private GithubActivityActorDTO user;
    @JsonProperty("created_at")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private ZonedDateTime createdAt;
    @JsonProperty("updated_at")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private ZonedDateTime updatedAt;
    private GithubActivityActorDTO assignee;
    private String html_url;
}
