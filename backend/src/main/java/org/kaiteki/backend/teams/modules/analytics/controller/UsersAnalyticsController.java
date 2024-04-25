package org.kaiteki.backend.teams.modules.analytics.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.teams.modules.analytics.models.dto.AnalyticsGraphDTO;
import org.kaiteki.backend.teams.modules.analytics.models.dto.UserTotalsStatisticsDTO;
import org.kaiteki.backend.teams.modules.analytics.service.UsersAnalyticsService;
import org.kaiteki.backend.teams.modules.tasks.models.entity.TaskStatusType;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/v1/users/analytics")
@RequiredArgsConstructor
public class UsersAnalyticsController {
    private final UsersAnalyticsService usersAnalyticsService;

    @GetMapping("/statistics")
    @Cacheable(value = "users_analytics_statistics", keyGenerator = "currentUserCacheKeyGenerator")
    public UserTotalsStatisticsDTO getStatistics() {
        return usersAnalyticsService.getStatistics();
    }

    @GetMapping("/performance-by-period")
    @Cacheable(value = "users_analytics_performance_period", keyGenerator = "currentUserCacheKeyGenerator")
    public AnalyticsGraphDTO<BigDecimal> getPerformanceByPeriod() {
        return usersAnalyticsService.getPerformanceByPeriod();
    }

    @GetMapping("/tasks-by-teams")
    @Cacheable(value = "users_analytics_tasks_by_teams", keyGenerator = "currentUserCacheKeyGenerator")
    public AnalyticsGraphDTO<Long> getTasksByTeams() {
        return usersAnalyticsService.getTasksByTeams();
    }
}
