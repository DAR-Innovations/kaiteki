package org.kaiteki.backend.events.models.dto;

import lombok.Builder;
import lombok.Data;
import org.kaiteki.backend.events.models.enums.EventType;

import java.time.ZonedDateTime;

@Data
@Builder
public class EventsDTO {
    private Long id;
    private String title;
    private String description;
    private ZonedDateTime start;
    private ZonedDateTime end;
    private EventType type;
}
