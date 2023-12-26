package org.kaiteki.backend.notes.model.dto;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
public class NotesDTO {
    private Long id;
    private String title;
    private String content;
    private LocalDateTime createdDate;
}
