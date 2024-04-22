package org.kaiteki.backend.teams.modules.analytics.service;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.shared.utils.UserFormattingUtils;
import org.kaiteki.backend.teams.modules.analytics.models.dto.AnalyticsGraphDTO;
import org.kaiteki.backend.teams.modules.analytics.models.dto.TeamsTotalsStatisticsDTO;
import org.kaiteki.backend.teams.modules.performance.models.TeamPerformance;
import org.kaiteki.backend.teams.modules.performance.services.TeamPerformanceService;
import org.kaiteki.backend.teams.modules.tasks.models.entity.TaskStatusType;
import org.kaiteki.backend.teams.modules.tasks.models.entity.Tasks;
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
public class TeamsAnalyticsService {
    private final TasksService tasksService;
    private final TeamMembersService teamMembersService;
    private final TeamPerformanceService teamPerformanceService;

    public TeamsTotalsStatisticsDTO getStatistics(Long teamId) {
        CompletableFuture<Long> openTasksFuture = CompletableFuture.supplyAsync(() -> tasksService.countTasksByTypeAndTeam(teamId, TaskStatusType.OPEN));
        CompletableFuture<Long> completedTasksFuture = CompletableFuture.supplyAsync(() -> tasksService.countTasksByTypeAndTeam(teamId, TaskStatusType.DONE));
        CompletableFuture<Long> inProgressTasksFuture = CompletableFuture.supplyAsync(() -> tasksService.countTasksByTypeAndTeam(teamId, TaskStatusType.REGULAR));

        long teamMembers = teamMembersService.countMembersByTeam(teamId);

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
                .teamMembersCount(teamMembers)
                .build();
    }

    public AnalyticsGraphDTO<BigDecimal> getPerformanceByPeriod(Long teamId) {
        Map<ZonedDateTime, BigDecimal> performancesByMonth = teamPerformanceService.getAllPerformances(teamId).parallelStream()
                .collect(
                        Collectors.groupingBy(
                                TeamPerformance::getCreatedDate,
                                Collectors.mapping(
                                        TeamPerformance::getPerformance,
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

    public AnalyticsGraphDTO<Long> getTaskCountsByExecutorAndStatusType(Long teamId, TaskStatusType statusType) {
        List<Tasks> tasks = tasksService.getTasksByTypeAndTeam(teamId, statusType);

        Map<String, Long> taskCountsByExecutor = new ConcurrentHashMap<>();
        AtomicLong unassignedTasksCount = new AtomicLong(0);

        // Parallel stream to count tasks by executor
        tasks.parallelStream()
                .forEach(task -> {
                    if (task.getExecutorMember() != null) {
                        taskCountsByExecutor.merge(
                                UserFormattingUtils.getFullName(task.getExecutorMember().getUser()),
                                1L,
                                Long::sum
                        );
                    } else {
                        unassignedTasksCount.incrementAndGet();
                    }
                });

        List<String> labels = new ArrayList<>(taskCountsByExecutor.keySet().stream().toList());
        List<Long> data = new ArrayList<>(taskCountsByExecutor.values().stream().toList());

        labels.add("Unassigned");
        data.add(unassignedTasksCount.get());

        return AnalyticsGraphDTO.<Long>builder()
                .labels(labels)
                .data(data)
                .build();
    }
}