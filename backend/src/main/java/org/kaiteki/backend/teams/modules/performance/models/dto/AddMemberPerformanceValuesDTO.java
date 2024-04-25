package org.kaiteki.backend.teams.modules.performance.models.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddMemberPerformanceValuesDTO {
    private Integer highPriorityTasks;
    private Integer mediumPriorityTasks;
    private Integer lowPriorityTasks;
    private Integer attendantMeetings;
    private Integer screenTimeMinutes;
}
