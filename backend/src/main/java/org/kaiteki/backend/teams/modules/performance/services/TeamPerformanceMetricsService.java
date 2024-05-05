package org.kaiteki.backend.teams.modules.performance.services;

import org.springframework.transaction.annotation.Transactional;
import org.kaiteki.backend.teams.model.entity.Teams;
import org.kaiteki.backend.teams.modules.performance.models.PerformanceMetricsSettings;
import org.kaiteki.backend.teams.modules.performance.models.TeamPerformanceMetrics;
import org.kaiteki.backend.teams.modules.performance.models.dto.UpdateTeamPerformanceMetricsDTO;
import org.kaiteki.backend.teams.modules.performance.models.enums.PerformanceMetricsType;
import org.kaiteki.backend.teams.modules.performance.reporisotiry.TeamPerformanceMetricsRepository;
import org.kaiteki.backend.teams.service.TeamMembersService;
import org.kaiteki.backend.teams.service.TeamsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

import static java.util.Objects.nonNull;

@Service
public class TeamPerformanceMetricsService {
    private TeamPerformanceMetricsRepository teamPerformanceMetricsRepository;
    private TeamMemberPerformanceService teamMemberPerformanceService;
    private TeamPerformanceService teamPerformanceService;
    private TeamMembersService teamMembersService;
    private TeamsService teamsService;

    @Autowired
    public void setTeamsService(TeamsService teamsService) {
        this.teamsService = teamsService;
    }

    @Autowired
    public void setTeamPerformanceService(TeamPerformanceService teamPerformanceService) {
        this.teamPerformanceService = teamPerformanceService;
    }

    @Autowired
    public void setTeamMemberPerformanceService(TeamMemberPerformanceService teamMemberPerformanceService) {
        this.teamMemberPerformanceService = teamMemberPerformanceService;
    }

    @Autowired
    public void setTeamMembersService(TeamMembersService teamMembersService) {
        this.teamMembersService = teamMembersService;
    }

    @Autowired
    public void setTeamPerformanceMetricsRepository(TeamPerformanceMetricsRepository teamPerformanceMetricsRepository) {
        this.teamPerformanceMetricsRepository = teamPerformanceMetricsRepository;
    }

    @Transactional
    public TeamPerformanceMetrics setupDefaultTeamPerformanceMetrics(Long teamId) {
        TeamPerformanceMetrics teamPerformanceMetrics = TeamPerformanceMetrics.builder()
                .highPriorityTasks(
                        PerformanceMetricsSettings
                                .builder()
                                .enabled(true)
                                .weight(BigDecimal.valueOf(0.4))
                                .normalValue(3)
                                .type(PerformanceMetricsType.HIGH_PRIORITY_TASKS)
                                .build()
                )
                .mediumPriorityTasks(
                        PerformanceMetricsSettings
                                .builder()
                                .enabled(true)
                                .weight(BigDecimal.valueOf(0.3))
                                .normalValue(5)
                                .type(PerformanceMetricsType.MEDIUM_PRIORITY_TASKS)
                                .build()
                )
                .lowPriorityTasks(
                        PerformanceMetricsSettings
                                .builder()
                                .enabled(true)
                                .weight(BigDecimal.valueOf(0.1))
                                .normalValue(10)
                                .type(PerformanceMetricsType.LOW_PRIORITY_TASKS)
                                .build()
                )
                .screenTimeMinutes(
                        PerformanceMetricsSettings
                                .builder()
                                .enabled(true)
                                .weight(BigDecimal.valueOf(0.1))
                                .normalValue(450)
                                .type(PerformanceMetricsType.SCREEN_TIME_MINUTES)
                                .build()
                )
                .attendantMeetings(
                        PerformanceMetricsSettings
                                .builder()
                                .enabled(true)
                                .weight(BigDecimal.valueOf(0.1))
                                .normalValue(8)
                                .type(PerformanceMetricsType.ATTENDANT_MEETINGS)
                                .build()
                )
                .updatedDate(null)
                .teamId(teamId)
                .build();

        validateMetrics(teamPerformanceMetrics);
        return teamPerformanceMetricsRepository.save(teamPerformanceMetrics);
    }

    public TeamPerformanceMetrics getMetricsByTeamId(Long teamId) {
        Teams team = teamsService.getTeamById(teamId);

        return teamPerformanceMetricsRepository.findByTeamId(team.getId())
                .orElseGet(() -> setupDefaultTeamPerformanceMetrics(team.getId()));
    }

    @Transactional
    public void updateTeamPerformanceMetrics(Long teamId, UpdateTeamPerformanceMetricsDTO dto) {
        teamsService.checkIfCurrentUserIsOwner(teamId);

        TeamPerformanceMetrics teamPerformanceMetrics = getMetricsByTeamId(teamId);
        ZonedDateTime periodAgo = ZonedDateTime.now().minusDays(3);

        if (nonNull(teamPerformanceMetrics.getUpdatedDate()) && teamPerformanceMetrics.getUpdatedDate().isAfter(periodAgo)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Team performance metrics can only be updated after a 3-day period.");
        }

        if (nonNull(dto.getHighPriorityTasks())) {
            PerformanceMetricsSettings settings = teamPerformanceMetrics.getHighPriorityTasks();
            settings.setEnabled(dto.getHighPriorityTasks().isEnabled());
            settings.setWeight(dto.getHighPriorityTasks().getWeight());

            teamPerformanceMetrics.setHighPriorityTasks(settings);
        }
        if (nonNull(dto.getMediumPriorityTasks())) {
            PerformanceMetricsSettings settings = teamPerformanceMetrics.getMediumPriorityTasks();
            settings.setEnabled(dto.getMediumPriorityTasks().isEnabled());
            settings.setWeight(dto.getMediumPriorityTasks().getWeight());

            teamPerformanceMetrics.setMediumPriorityTasks(settings);
        }
        if (nonNull(dto.getLowPriorityTasks())) {
            PerformanceMetricsSettings settings = teamPerformanceMetrics.getLowPriorityTasks();
            settings.setEnabled(dto.getLowPriorityTasks().isEnabled());
            settings.setWeight(dto.getLowPriorityTasks().getWeight());

            teamPerformanceMetrics.setLowPriorityTasks(settings);
        }
        if (nonNull(dto.getAttendantMeetings())) {
            PerformanceMetricsSettings settings = teamPerformanceMetrics.getAttendantMeetings();
            settings.setEnabled(dto.getAttendantMeetings().isEnabled());
            settings.setWeight(dto.getAttendantMeetings().getWeight());

            teamPerformanceMetrics.setAttendantMeetings(settings);
        }
        if (nonNull(dto.getScreenTimeMinutes())) {
            PerformanceMetricsSettings settings = teamPerformanceMetrics.getScreenTimeMinutes();
            settings.setEnabled(dto.getScreenTimeMinutes().isEnabled());
            settings.setWeight(dto.getScreenTimeMinutes().getWeight());

            teamPerformanceMetrics.setScreenTimeMinutes(settings);
        }

        validateMetrics(teamPerformanceMetrics);
        teamPerformanceMetrics.setUpdatedDate(ZonedDateTime.now());
        teamPerformanceMetricsRepository.save(teamPerformanceMetrics);

        teamMemberPerformanceService.calculateAndUpdatePerformance(teamMembersService.getTeamMemberIDsByTeam(teamId));
        teamPerformanceService.calculateAndUpdatePerformance(teamId);
    }

    public void validateMetrics(TeamPerformanceMetrics metrics) {
        BigDecimal totalWeight = BigDecimal.ZERO;

        if (metrics.getHighPriorityTasks().isEnabled()) {
            totalWeight = totalWeight.add(metrics.getHighPriorityTasks().getWeight());
        }
        if (metrics.getMediumPriorityTasks().isEnabled()) {
            totalWeight = totalWeight.add(metrics.getMediumPriorityTasks().getWeight());
        }
        if (metrics.getLowPriorityTasks().isEnabled()) {
            totalWeight = totalWeight.add(metrics.getLowPriorityTasks().getWeight());
        }
        if (metrics.getAttendantMeetings().isEnabled()) {
            totalWeight = totalWeight.add(metrics.getAttendantMeetings().getWeight());
        }
        if (metrics.getScreenTimeMinutes().isEnabled()) {
            totalWeight = totalWeight.add(metrics.getScreenTimeMinutes().getWeight());
        }

        if (totalWeight.compareTo(BigDecimal.ONE) != 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Total weight must be equal to 100%");
        }
    }

    public void deleteByTeamId(Long teamId) {
        teamPerformanceMetricsRepository.deleteAllByTeamId(teamId);
    }
}
