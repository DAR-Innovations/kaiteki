package org.kaiteki.backend.teams.modules.performance.controllers;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.teams.modules.performance.models.TeamMemberPerformance;
import org.kaiteki.backend.teams.modules.performance.models.enums.PerformanceMetricsType;
import org.kaiteki.backend.teams.modules.performance.services.TeamMemberPerformanceService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/performance/team-members")
@RequiredArgsConstructor
public class TeamMemberPerformanceController {
    private final TeamMemberPerformanceService teamMemberPerformanceService;

    @GetMapping("/{memberId}")
    public TeamMemberPerformance getTeamMemberPerformance(@PathVariable Long memberId) {
        return teamMemberPerformanceService.getPerformance(memberId);
    }

    @PutMapping("/{memberId}/screen-time/{screenTimeMinutes}")
    public void updateScreenTime(@PathVariable Long memberId, @PathVariable int screenTimeMinutes) {
        teamMemberPerformanceService.handleUpdateMetricsByType(memberId, PerformanceMetricsType.SCREEN_TIME_MINUTES, screenTimeMinutes);
    }
}
