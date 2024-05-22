package org.kaiteki.backend.integrations.modules.zoom.models.api;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Data
public class ZoomMeetingOccurrenceDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String occurrence_id;
    private String start_time;
    private Integer duration;
    private String status;
}