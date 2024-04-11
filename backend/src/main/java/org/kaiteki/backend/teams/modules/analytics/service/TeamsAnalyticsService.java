package org.kaiteki.backend.teams.modules.analytics.service;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.shared.utils.UserFormattingUtils;
import org.kaiteki.backend.teams.modules.analytics.models.dto.AnalyticsGraphDTO;
import org.kaiteki.backend.teams.modules.analytics.models.dto.GetTotalsStatisticsDTO;
import org.kaiteki.backend.teams.modules.performance.models.TeamPerformance;
import org.kaiteki.backend.teams.modules.performance.services.TeamPerformanceService;
import org.kaiteki.backend.teams.modules.tasks.models.entity.TaskStatusType;
import org.kaiteki.backend.teams.modules.tasks.models.entity.Tasks;
import org.kaiteki.backend.teams.modules.tasks.service.TasksService;
import org.kaiteki.backend.teams.service.TeamMembersService;
import org.kaiteki.backend.teams.service.TeamsService;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeamsAnalyticsService {
    private final TeamsService teamsService;
    private final TasksService tasksService;
    private final TeamMembersService teamMembersService;
    private final TeamPerformanceService teamPerformanceService;

    public GetTotalsStatisticsDTO getStatistics(Long teamId) {
        //TODO: Refactor for parallel fetching
        long openTasks = tasksService.countTasksByTypeAndTeam(teamId, TaskStatusType.OPEN);
        long completedTasks = tasksService.countTasksByTypeAndTeam(teamId, TaskStatusType.DONE);
        long inProgressTasks = tasksService.countTasksByTypeAndTeam(teamId, TaskStatusType.REGULAR);
        long totalTasks = openTasks + completedTasks + inProgressTasks;

        long teamMembers = teamMembersService.countMembersByTeam(teamId);

        return GetTotalsStatisticsDTO.builder()
                .completedTasksCount(completedTasks)
                .inProgressTasksCount(inProgressTasks)
                .openTasksCount(openTasks)
                .totalTasksCount(totalTasks)
                .teamMembersCount(teamMembers)
                .build();
    }

    public AnalyticsGraphDTO getPerformanceByPeriod(Long teamId) {
        Map<ZonedDateTime, Long> performancesByMonth = teamPerformanceService.getAllPerformances(teamId).stream()
                .collect(
                        Collectors.groupingBy(TeamPerformance::getCreatedDate,
                                Collectors.summingLong(performance -> performance.getPerformance().longValue()))
                );

        List<String> labels = performancesByMonth.keySet().stream()
                .map(date -> date.format(DateTimeFormatter.ofPattern("MMMM, yyyy")))
                .collect(Collectors.toList());

        List<Long> data = new ArrayList<>(performancesByMonth.values());

        return AnalyticsGraphDTO.builder()
                .labels(labels)
                .data(data)
                .build();
    }

    public AnalyticsGraphDTO getTaskCountsByExecutorAndStatus(Long teamId, TaskStatusType statusType) {
        List<Tasks> tasks = tasksService.getTasksByTypeAndTeam(teamId, statusType);

        Map<String, Long> taskCountsByExecutor = tasks.stream()
                .collect(
                        Collectors.groupingBy(task -> UserFormattingUtils.getFullName(task.getExecutorMember().getUser()),
                        Collectors.counting())
                );

        long unassignedTasksCount = tasks.stream()
                .filter(task -> task.getExecutorMember() == null)
                .count();

        List<String> labels = new ArrayList<>(taskCountsByExecutor.keySet());
        List<Long> data = new ArrayList<>(taskCountsByExecutor.values());

        labels.add("Unassigned");
        data.add(unassignedTasksCount);

        return AnalyticsGraphDTO.builder()
                .labels(labels)
                .data(data)
                .build();
    }

}