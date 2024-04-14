package org.kaiteki.backend.integrations.modules.zoom.models.dto;

import lombok.Builder;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
@Builder
public class ZoomMeetingDTO {
    private Long zoomMeetingId;
    private String title;
    private String description;
    private String creatorEmail;
    private ZonedDateTime startTime;
    private ZonedDateTime createdDate;
    private String joinUrl;
    private String password;
}
