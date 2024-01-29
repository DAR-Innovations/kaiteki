package org.kaiteki.backend.tasks.models.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateTaskNoteDTO {
    private String content;
    private Long taskId;
    private Long teamId;
}
