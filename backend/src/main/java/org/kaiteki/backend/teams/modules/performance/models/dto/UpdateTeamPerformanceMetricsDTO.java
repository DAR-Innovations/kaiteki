package org.kaiteki.backend.teams.modules.performance.models.dto;

import lombok.Builder;
import lombok.Data;
import org.kaiteki.backend.teams.modules.performance.models.PerformanceMetricsSettings;

@Builder
@Data
public class UpdateTeamPerformanceMetricsDTO {
    private PerformanceMetricsSettings highPriorityTasks;
    private PerformanceMetricsSettings middlePriorityTasks;
    private PerformanceMetricsSettings lowPriorityTasks;
    private PerformanceMetricsSettings attendantMeetings;
    private PerformanceMetricsSettings screenTimeHours;
}
