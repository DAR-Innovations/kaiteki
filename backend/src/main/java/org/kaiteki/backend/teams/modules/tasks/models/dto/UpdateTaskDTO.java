package org.kaiteki.backend.teams.modules.tasks.models.dto;

import lombok.Builder;
import lombok.Data;
import org.kaiteki.backend.teams.modules.tasks.models.entity.TaskPriority;

import java.time.ZonedDateTime;

@Data
@Builder
public class UpdateTaskDTO {
    private String title;
    private String content;
    private String description;
    private String tag;
    private ZonedDateTime endDate;
    private ZonedDateTime startDate;
    private TaskPriority priority;
    private Long statusId;
    private Long executorId;
}
