package org.kaiteki.backend.tasks.models.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TasksDTO {
    private Long id;
    private String title;
}
