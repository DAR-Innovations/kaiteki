package org.kaiteki.backend.tasks.models.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CustomizeStatusesDTO {
    SaveTaskStatusesDTO openStatus;
    SaveTaskStatusesDTO doneStatus;
    List<SaveTaskStatusesDTO> regularStatuses;
}
