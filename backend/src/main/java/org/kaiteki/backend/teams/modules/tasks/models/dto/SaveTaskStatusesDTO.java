package org.kaiteki.backend.teams.modules.tasks.models.dto;

import lombok.Builder;
import lombok.Data;
import org.kaiteki.backend.teams.modules.tasks.models.entity.TaskStatusType;

@Data
@Builder
public class SaveTaskStatusesDTO {
    private Long id;
    private Integer order;
    private String name;
    private String color;
    private TaskStatusType type;
}
