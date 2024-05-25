package org.kaiteki.backend.integrations.modules.github.models.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.ZonedDateTime;

@Data
public class GithubRepoActivity {
    @JsonProperty("id")
    private long id;

    @JsonProperty("node_id")
    private String nodeId;

    @JsonProperty("before")
    private String before;

    @JsonProperty("after")
    private String after;

    @JsonProperty("ref")
    private String ref;

    @JsonProperty("timestamp")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private ZonedDateTime timestamp;

    @JsonProperty("activity_type")
    private String activityType;

    @JsonProperty("actor")
    private GithubActivityActorDTO actor;
}
