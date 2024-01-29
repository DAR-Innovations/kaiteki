package org.kaiteki.backend.tasks.models.dto;

import lombok.Builder;
import lombok.Data;
import org.kaiteki.backend.tasks.models.entity.TaskStatusType;

import java.util.List;

@Data
@Builder
public class TaskStatusDTO {
    private Long id;
    private String name;
    private String color;
    private Integer order;
    private TaskStatusType type;
    private List<TasksDTO> tasks;
}
