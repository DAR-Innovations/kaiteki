package org.kaiteki.backend.teams.modules.analytics.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.teams.modules.analytics.models.dto.AnalyticsGraphDTO;
import org.kaiteki.backend.teams.modules.analytics.models.dto.ExportMembersDTO;
import org.kaiteki.backend.teams.modules.analytics.models.dto.TeamsTotalsStatisticsDTO;
import org.kaiteki.backend.teams.modules.analytics.service.TeamMemberAnalyticsExporter;
import org.kaiteki.backend.teams.modules.analytics.service.TeamMembersAnalyticsService;
import org.kaiteki.backend.teams.modules.tasks.models.dto.ExportTasksDTO;
import org.kaiteki.backend.teams.modules.tasks.models.entity.TaskPriority;
import org.kaiteki.backend.teams.modules.tasks.models.enums.ExportFormats;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.math.BigDecimal;

import static java.util.Objects.isNull;

@RestController
@RequestMapping("/api/v1/members/analytics")
@RequiredArgsConstructor
public class TeamMembersAnalyticsController {
    private final TeamMembersAnalyticsService teamMembersAnalyticsService;
    private final TeamMemberAnalyticsExporter teamMemberAnalyticsExporter;


    @GetMapping("/statistics")
    @Cacheable(value = "team_members_analytics_statistics", key = "#teamMemberId")
    public TeamsTotalsStatisticsDTO getStatistics(@RequestParam Long teamMemberId) {
        return teamMembersAnalyticsService.getStatistics(teamMemberId);
    }

    @GetMapping("/performance-by-period")
    @Cacheable(value = "team_members_analytics_performance_period", key = "#teamMemberId")
    public AnalyticsGraphDTO<BigDecimal> getPerformanceByPeriod(@RequestParam Long teamMemberId) {
        return teamMembersAnalyticsService.getPerformanceByPeriod(teamMemberId);
    }

    @GetMapping("/tasks-by-status")
    @Cacheable(value = "team_members_analytics_task_status", key = "#teamMemberId")
    public AnalyticsGraphDTO<Long> getTaskCountsByExecutorAndStatusType(@RequestParam Long teamMemberId) {
        return teamMembersAnalyticsService.getTaskCountsByStatus(teamMemberId);
    }

    @GetMapping("/tasks-priorities-by-periods")
    @Cacheable(value = "team_members_analytics_task_priorities_periods", key = "#teamMemberId + '_' + #taskPriority")
    public AnalyticsGraphDTO<Long> getTaskPrioritiesCountsByPeriods(@RequestParam Long teamMemberId, @RequestParam TaskPriority taskPriority) {
        return teamMembersAnalyticsService.getPriorityTasksCountsByPeriod(teamMemberId, taskPriority);
    }

    @GetMapping("/export")
    public ResponseEntity<byte[]> exportMembers(@RequestParam Long teamId, ExportMembersDTO dto) throws IOException {
        if (isNull(teamId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing teamId query parameter");
        }

        dto.setTeamId(teamId);

        return teamMemberAnalyticsExporter.exportTeamMembers(dto);
    }
}
