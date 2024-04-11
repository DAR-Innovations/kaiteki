package org.kaiteki.backend.teams.modules.analytics.models.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetTotalsStatisticsDTO {
    private long inProgressTasksCount;
    private long completedTasksCount;
    private long openTasksCount;
    private long totalTasksCount;
    private long teamMembersCount;
}
