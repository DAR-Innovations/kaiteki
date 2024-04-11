package org.kaiteki.backend.teams.modules.analytics.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.teams.modules.analytics.models.dto.AnalyticsGraphDTO;
import org.kaiteki.backend.teams.modules.analytics.models.dto.GetTotalsStatisticsDTO;
import org.kaiteki.backend.teams.modules.analytics.service.TeamsAnalyticsService;
import org.kaiteki.backend.teams.modules.tasks.models.entity.TaskStatusType;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/teams/analytics")
@RequiredArgsConstructor
public class TeamsAnalyticsController {
    private final TeamsAnalyticsService teamsAnalyticsService;

    @GetMapping("/statistics")
    @Cacheable(value = "analytics_statistics", key = "#teamId")
    public GetTotalsStatisticsDTO getStatistics(@RequestParam Long teamId) {
        return teamsAnalyticsService.getStatistics(teamId);
    }

    @GetMapping("/performance-by-period")
    @Cacheable(value = "analytics_performance_period", key = "#teamId")
    public AnalyticsGraphDTO getPerformanceByPeriod(@RequestParam Long teamId) {
        return teamsAnalyticsService.getPerformanceByPeriod(teamId);
    }

    @GetMapping("/tasks-by-executor")
    @Cacheable(value = "analytics_task_executor", key = "#teamId + '-' + #type.name()")
    public AnalyticsGraphDTO getTaskCountsByExecutorAndStatusType(@RequestParam Long teamId, @RequestParam TaskStatusType type) {
        return teamsAnalyticsService.getTaskCountsByExecutorAndStatusType(teamId, type);
    }
}
