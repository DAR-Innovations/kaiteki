package org.kaiteki.backend.tasks.models.dto;

import lombok.Builder;
import lombok.Data;
import org.kaiteki.backend.tasks.models.TaskPriority;

import java.time.LocalDate;

@Data
@Builder
public class UpdateTaskDTO {
    private String title;
    private String content;
    private String description;
    private String tag;
    private LocalDate endDate;
    private LocalDate startDate;
    private TaskPriority priority;
    private Long statusId;
    private Long executorId;
}
