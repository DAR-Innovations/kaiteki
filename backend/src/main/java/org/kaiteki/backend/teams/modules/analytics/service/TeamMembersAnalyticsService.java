package org.kaiteki.backend.teams.modules.analytics.service;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.shared.utils.UserFormattingUtils;
import org.kaiteki.backend.teams.model.entity.Teams;
import org.kaiteki.backend.teams.modules.analytics.models.dto.AnalyticsGraphDTO;
import org.kaiteki.backend.teams.modules.analytics.models.dto.TeamsTotalsStatisticsDTO;
import org.kaiteki.backend.teams.modules.performance.models.TeamMemberPerformance;
import org.kaiteki.backend.teams.modules.performance.models.TeamPerformance;
import org.kaiteki.backend.teams.modules.performance.services.TeamMemberPerformanceService;
import org.kaiteki.backend.teams.modules.performance.services.TeamPerformanceService;
import org.kaiteki.backend.teams.modules.tasks.models.dto.TaskStatusDTO;
import org.kaiteki.backend.teams.modules.tasks.models.dto.TasksDTO;
import org.kaiteki.backend.teams.modules.tasks.models.dto.TasksFilterDTO;
import org.kaiteki.backend.teams.modules.tasks.models.entity.TaskPriority;
import org.kaiteki.backend.teams.modules.tasks.models.entity.TaskStatusType;
import org.kaiteki.backend.teams.modules.tasks.models.entity.Tasks;
import org.kaiteki.backend.teams.modules.tasks.service.TaskStatusService;
import org.kaiteki.backend.teams.modules.tasks.service.TasksService;
import org.kaiteki.backend.teams.service.TeamMembersService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeamMembersAnalyticsService {
    private final TasksService tasksService;
    private final TeamMembersService teamMembersService;
    private final TaskStatusService taskStatusService;
    private final TeamMemberPerformanceService teamMemberPerformanceService;


    public TeamsTotalsStatisticsDTO getStatistics(Long teamMemberId) {
        CompletableFuture<Long> openTasksFuture = CompletableFuture.supplyAsync(() -> tasksService.countTasksByTypeAndExecutorId(teamMemberId, TaskStatusType.OPEN));
        CompletableFuture<Long> completedTasksFuture = CompletableFuture.supplyAsync(() -> tasksService.countTasksByTypeAndExecutorId(teamMemberId, TaskStatusType.DONE));
        CompletableFuture<Long> inProgressTasksFuture = CompletableFuture.supplyAsync(() -> tasksService.countTasksByTypeAndExecutorId(teamMemberId, TaskStatusType.REGULAR));

        CompletableFuture<Void> allTasksFuture = CompletableFuture.allOf(openTasksFuture, completedTasksFuture, inProgressTasksFuture);

        allTasksFuture.join();
        long openTasks = openTasksFuture.join();
        long completedTasks = completedTasksFuture.join();
        long inProgressTasks = inProgressTasksFuture.join();
        long totalTasks = openTasks + completedTasks + inProgressTasks;

        return TeamsTotalsStatisticsDTO.builder()
                .completedTasksCount(completedTasks)
                .inProgressTasksCount(inProgressTasks)
                .openTasksCount(openTasks)
                .totalTasksCount(totalTasks)
                .build();
    }

    public AnalyticsGraphDTO<BigDecimal> getPerformanceByPeriod(Long memberId) {
        Map<ZonedDateTime, BigDecimal> performancesByMonth = teamMemberPerformanceService.getAllPerformances(memberId).parallelStream()
                .collect(
                        Collectors.groupingBy(
                                TeamMemberPerformance::getCreatedDate,
                                Collectors.mapping(
                                        TeamMemberPerformance::getPerformance,
                                        Collectors.reducing(BigDecimal.ZERO, BigDecimal::add)
                                )
                        )
                );

        List<String> labels = performancesByMonth.keySet().stream()
                .map(date -> date.format(DateTimeFormatter.ofPattern("MMMM, yyyy")))
                .collect(Collectors.toList());

        List<BigDecimal> data = performancesByMonth.values().stream()
                .toList();

        return AnalyticsGraphDTO.<BigDecimal>builder()
                .labels(labels)
                .data(data)
                .build();
    }

    public AnalyticsGraphDTO<Long> getTaskCountsByStatus(Long memberId) {
        List<TasksDTO> tasks = tasksService.searchTasks(TasksFilterDTO.builder().executorId(memberId).build());
        Teams currentMemberTeam = teamMembersService.getTeamMemberById(memberId).getTeam();
        List<TaskStatusDTO> teamStatuses = taskStatusService.getTaskStatuses(currentMemberTeam.getId(), false, TasksFilterDTO.builder().build());

        Map<Long, Long> taskCountsByStatus = new ConcurrentHashMap<>();

        teamStatuses.forEach(status -> taskCountsByStatus.put(status.getId(), 0L));

        tasks.parallelStream()
                .map(task -> task.getStatus().getId())
                .forEach(statusId -> taskCountsByStatus.merge(statusId, 1L, Long::sum));

        List<Long> data = teamStatuses.stream()
                .map(status -> taskCountsByStatus.get(status.getId()))
                .collect(Collectors.toList());

        List<String> labels = teamStatuses.stream()
                .map(TaskStatusDTO::getName)
                .collect(Collectors.toList());

        return AnalyticsGraphDTO.<Long>builder()
                .labels(labels)
                .data(data)
                .build();
    }

    public AnalyticsGraphDTO<Long> getPriorityTasksCountsByPeriod(Long memberId, TaskPriority priority) {
        Teams currentMemberTeam = teamMembersService.getTeamMemberById(memberId).getTeam();
        List<TeamMemberPerformance> teamMemberPerformances = teamMemberPerformanceService.getAllPerformances(currentMemberTeam.getId());

        Map<String, Long> taskCountsByDate = new ConcurrentHashMap<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM, yyyy");

        teamMemberPerformances.parallelStream().forEach(performance -> {
            ZonedDateTime createdDate = performance.getCreatedDate();
            String dateKey = createdDate.format(formatter);

            long taskCount = switch (priority) {
                case HIGH -> performance.getHighPriorityTasks();
                case MEDIUM -> performance.getMediumPriorityTasks();
                case LOW -> performance.getLowPriorityTasks();
            };

            taskCountsByDate.merge(dateKey, taskCount, Long::sum);
        });

        List<String> labels = taskCountsByDate.keySet().stream().sorted().collect(Collectors.toList());
        List<Long> data = labels.stream().map(taskCountsByDate::get).collect(Collectors.toList());

        return AnalyticsGraphDTO.<Long>builder()
                .labels(labels)
                .data(data)
                .build();
    }}
