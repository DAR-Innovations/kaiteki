package org.kaiteki.backend.notes.model.dto;

import lombok.Builder;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
@Builder
public class NotesDTO {
    private Long id;
    private String title;
    private String content;
    private ZonedDateTime createdDate;
}
