package org.kaiteki.backend.teams.modules.analytics.models.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserTotalsStatisticsDTO {
    private long inProgressTasksCount;
    private long completedTasksCount;
    private long openTasksCount;
    private long totalTasksCount;
}
