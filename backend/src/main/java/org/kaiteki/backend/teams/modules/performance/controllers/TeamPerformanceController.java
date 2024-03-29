package org.kaiteki.backend.teams.modules.performance.controllers;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.teams.modules.performance.models.TeamPerformance;
import org.kaiteki.backend.teams.modules.performance.models.TeamPerformanceMetrics;
import org.kaiteki.backend.teams.modules.performance.models.dto.UpdateTeamPerformanceMetricsDTO;
import org.kaiteki.backend.teams.modules.performance.services.TeamPerformanceMetricsService;
import org.kaiteki.backend.teams.modules.performance.services.TeamPerformanceService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/performance/teams")
@RequiredArgsConstructor
public class TeamPerformanceController {
    private final TeamPerformanceMetricsService teamPerformanceMetricsService;
    private final TeamPerformanceService teamPerformanceService;

    @GetMapping("/{teamId}/metrics")
    public TeamPerformanceMetrics getMetrics(@PathVariable Long teamId) {
        return teamPerformanceMetricsService.getMetricsByTeamId(teamId);
    }

    @PutMapping("/{teamId}/metrics")
    public void updateMetrics(@PathVariable Long teamId, @RequestBody UpdateTeamPerformanceMetricsDTO dto) {
        teamPerformanceMetricsService.updateTeamPerformanceMetrics(teamId, dto);
    }

    @GetMapping("/{teamId}")
    public TeamPerformance getTeamPerformance(@PathVariable Long teamId) {
        return teamPerformanceService.getPerformance(teamId);
    }
}
