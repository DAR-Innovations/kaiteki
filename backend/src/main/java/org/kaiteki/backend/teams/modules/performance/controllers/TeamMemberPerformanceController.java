package org.kaiteki.backend.teams.modules.performance.controllers;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.teams.modules.performance.models.TeamMemberPerformance;
import org.kaiteki.backend.teams.modules.performance.models.dto.AddMemberPerformanceValuesDTO;
import org.kaiteki.backend.teams.modules.performance.models.dto.TeamMemberPerformanceDTO;
import org.kaiteki.backend.teams.modules.performance.models.enums.PerformanceMetricsType;
import org.kaiteki.backend.teams.modules.performance.services.TeamMemberPerformanceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/performance/team-members")
@RequiredArgsConstructor
public class TeamMemberPerformanceController {
    private final TeamMemberPerformanceService teamMemberPerformanceService;

    @GetMapping("/{memberId}")
    public TeamMemberPerformance getTeamMemberPerformance(@PathVariable Long memberId) {
        return teamMemberPerformanceService.getPerformance(memberId);
    }

    @GetMapping("/teams/{teamId}")
    public List<TeamMemberPerformanceDTO> getTeamMembersPerformanceByTeam(@PathVariable Long teamId) {
        return teamMemberPerformanceService.getPerformanceDTOByTeam(teamId);
    }

    @PostMapping("/{memberId}/add/screen-time")
    public void addMemberScreenTimeMinutes(@PathVariable Long memberId, @RequestParam int minutes) {
        teamMemberPerformanceService.addMemberPerformanceValues(
                memberId,
                AddMemberPerformanceValuesDTO.builder().screenTimeMinutes(minutes).build()
        );
    }
}
