package org.kaiteki.backend.teams.modules.analytics.service;


import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.auth.service.CurrentSessionService;
import org.kaiteki.backend.shared.utils.UserFormattingUtils;
import org.kaiteki.backend.teams.model.entity.TeamMembers;
import org.kaiteki.backend.teams.model.entity.Teams;
import org.kaiteki.backend.teams.modules.analytics.models.dto.AnalyticsGraphDTO;
import org.kaiteki.backend.teams.modules.analytics.models.dto.PerformanceMapDataDTO;
import org.kaiteki.backend.teams.modules.analytics.models.dto.UserTotalsStatisticsDTO;
import org.kaiteki.backend.teams.modules.performance.models.TeamMemberPerformance;
import org.kaiteki.backend.teams.modules.performance.services.TeamMemberPerformanceService;
import org.kaiteki.backend.teams.modules.tasks.models.entity.TaskStatusType;
import org.kaiteki.backend.teams.modules.tasks.models.entity.Tasks;
import org.kaiteki.backend.teams.modules.tasks.service.TasksService;
import org.kaiteki.backend.teams.service.TeamMembersService;
import org.kaiteki.backend.users.models.enitities.Users;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.YearMonth;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsersAnalyticsService {
    private final TasksService tasksService;
    private final CurrentSessionService currentSessionService;
    private final TeamMembersService teamMembersService;
    private final TeamMemberPerformanceService teamMemberPerformanceService;

    public UserTotalsStatisticsDTO getStatistics() {
        Users currentUser = currentSessionService.getCurrentUser();
        List<TeamMembers> currentUsersMembers = teamMembersService.getAllUsersTeamMembers(currentUser);

        List<UserTotalsStatisticsDTO> counts = currentUsersMembers.parallelStream()
                .map(teamMember -> {
                    long openTasks = tasksService.countTasksByTypeAndAssignee(teamMember.getId(), TaskStatusType.OPEN);
                    long completedTasks = tasksService.countTasksByTypeAndAssignee(teamMember.getId(), TaskStatusType.DONE);
                    long inProgressTasks = tasksService.countTasksByTypeAndAssignee(teamMember.getId(), TaskStatusType.REGULAR);
                    long totalTasks = openTasks + completedTasks + inProgressTasks;

                    return UserTotalsStatisticsDTO.builder()
                            .completedTasksCount(completedTasks)
                            .inProgressTasksCount(inProgressTasks)
                            .openTasksCount(openTasks)
                            .totalTasksCount(totalTasks)
                            .build();
                })
                .toList();

        AtomicLong totalOpenTasks = new AtomicLong();
        AtomicLong totalCompletedTasks = new AtomicLong();
        AtomicLong totalInProgressTasks = new AtomicLong();

        counts.forEach(count -> {
            totalOpenTasks.addAndGet(count.getOpenTasksCount());
            totalCompletedTasks.addAndGet(count.getCompletedTasksCount());
            totalInProgressTasks.addAndGet(count.getInProgressTasksCount());
        });

        long totalTasks = totalOpenTasks.get() + totalCompletedTasks.get() + totalInProgressTasks.get();

        return UserTotalsStatisticsDTO.builder()
                .completedTasksCount(totalCompletedTasks.get())
                .inProgressTasksCount(totalInProgressTasks.get())
                .openTasksCount(totalOpenTasks.get())
                .totalTasksCount(totalTasks)
                .build();
    }

    public AnalyticsGraphDTO<BigDecimal> getPerformanceByPeriod() {
        Users currentUser = currentSessionService.getCurrentUser();
        List<TeamMembers> currentUsersMembers = teamMembersService.getAllUsersTeamMembers(currentUser);

        Map<YearMonth, PerformanceMapDataDTO> performancesByMonth = new ConcurrentHashMap<>();

        currentUsersMembers.parallelStream().forEach(teamMember -> {
            List<TeamMemberPerformance> performances = teamMemberPerformanceService.getAllPerformances(teamMember.getId());
            performances.forEach(performance -> {
                YearMonth month = YearMonth.from(performance.getCreatedDate());
                performancesByMonth.compute(month, (key, value) -> {
                    if (value == null) {
                        return PerformanceMapDataDTO.builder()
                                .totalPerformance(performance.getPerformance().multiply(BigDecimal.valueOf(100)))
                                .performanceCount(1)
                                .build();
                    } else {
                        value.setTotalPerformance(value.getTotalPerformance().add(performance.getPerformance().multiply(BigDecimal.valueOf(100))));
                        value.setPerformanceCount(value.getPerformanceCount() + 1);
                        return value;
                    }
                });
            });
        });

        List<String> labels = new ArrayList<>();
        List<BigDecimal> data = new ArrayList<>();

        performancesByMonth.forEach((month, performanceData) -> {
            labels.add(month.getMonth().toString() + ", " + month.getYear());
            BigDecimal averagePerformance = performanceData.getTotalPerformance()
                    .divide(BigDecimal.valueOf(performanceData.getPerformanceCount()), 2, RoundingMode.HALF_UP);
            data.add(averagePerformance);
        });

        return AnalyticsGraphDTO.<BigDecimal>builder()
                .labels(labels)
                .data(data)
                .build();
    }

    public AnalyticsGraphDTO<Long> getTasksByTeams() {
        Users currentUser = currentSessionService.getCurrentUser();
        List<TeamMembers> currentUsersMembers = teamMembersService.getAllUsersTeamMembers(currentUser);
        ZonedDateTime twoMonthAgo = ZonedDateTime.now().minusMonths(2);

        Map<String, Long> taskCountsByTeam = new ConcurrentHashMap<>();

        currentUsersMembers.parallelStream().forEach(teamMember -> {
            Teams team = teamMember.getTeam();
            long tasksCount = tasksService.countTasksByAssigneeAndPeriod(teamMember.getId(), twoMonthAgo);
            taskCountsByTeam.merge(team.getName(), tasksCount, Long::sum);
        });

        List<String> labels = new ArrayList<>(taskCountsByTeam.keySet());
        List<Long> data = new ArrayList<>(taskCountsByTeam.values());

        return AnalyticsGraphDTO.<Long>builder()
                .labels(labels)
                .data(data)
                .build();
    }
}
