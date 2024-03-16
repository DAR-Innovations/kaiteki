package org.kaiteki.backend.tasks.models.dto;

import lombok.Builder;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
@Builder
public class TaskNotesDTO {
    private Long id;
    private String authorFullName;
    private ZonedDateTime createdDate;
    private String content;
    private Long teamMemberId;
}
