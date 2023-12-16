package org.kaiteki.backend.tasks.models.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SaveTaskStatusesDTO {
    private Long id;
    private Integer order;
    private String name;
    private Boolean isOpen;
    private Boolean isDone;
}
