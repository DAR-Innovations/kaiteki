package org.kaiteki.backend.integrations.modules.github.models.dto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.ZonedDateTime;

@Data
public class GithubIssueDTO {
    private String url;
    private Long id;
    private String node_id;
    private String title;
    private String state;
    private GithubActivityActorDTO assignee;
    private int comments;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private ZonedDateTime created_at;
    private String body;
    private String html_url;
}
