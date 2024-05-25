package org.kaiteki.backend.integrations.modules.zoom.models.dto;

import lombok.Builder;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
@Builder
public class CreateZoomMeetingDTO {
    private String title;
    private String description;
    private String password;
    private String creatorEmail;
    private ZonedDateTime startTime;
}