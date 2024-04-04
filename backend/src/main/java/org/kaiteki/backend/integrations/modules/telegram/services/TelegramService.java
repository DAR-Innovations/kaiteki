package org.kaiteki.backend.integrations.modules.telegram.services;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.auth.service.CurrentSessionService;
import org.kaiteki.backend.integrations.models.enums.PredefinedIntegrations;
import org.kaiteki.backend.integrations.models.interfaces.IntegrationService;
import org.kaiteki.backend.integrations.services.IntegrationsService;
import org.kaiteki.backend.teams.model.entity.Teams;
import org.kaiteki.backend.teams.modules.tasks.models.dto.TasksDTO;
import org.kaiteki.backend.teams.modules.tasks.models.dto.TasksFilterDTO;
import org.kaiteki.backend.teams.modules.tasks.service.TasksService;
import org.kaiteki.backend.teams.service.TeamsService;
import org.kaiteki.backend.users.models.enitities.Users;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TelegramService implements IntegrationService {
    private final IntegrationsService integrationsService;
    private final TasksService tasksService;
    private final CurrentSessionService currentSessionService;
    private final TeamsService teamsService;

    public Object onConnectIntegration() {
        integrationsService.toggleIntegrationState(PredefinedIntegrations.TELEGRAM, true);
        return true;
    }

    public void onDisconnectIntegration() {
        integrationsService.toggleIntegrationState(PredefinedIntegrations.TELEGRAM, false);
    }

    public List<TasksDTO> getUpcomingTasks() {
        Users currentUser = currentSessionService.getCurrentUser();
        Set<Long> usersTeams = teamsService.getUsersTeams(currentUser)
                .stream()
                .map(Teams::getId)
                .collect(Collectors.toSet());

        TasksFilterDTO filter = TasksFilterDTO.builder()
                .startDate(LocalDate.now().minusWeeks(1))
                .endDate(LocalDate.now())
                .teamIds(usersTeams)
                .build();

        return tasksService.searchTasks(filter);
    }

    public List<TasksDTO> getUpcomingMeetings() {
        Users currentUser = currentSessionService.getCurrentUser();
        Set<Long> usersTeams = teamsService.getUsersTeams(currentUser)
                .stream()
                .map(Teams::getId)
                .collect(Collectors.toSet());

        TasksFilterDTO filter = TasksFilterDTO.builder()
                .startDate(LocalDate.now().minusWeeks(1))
                .endDate(LocalDate.now())
                .teamIds(usersTeams)
                .build();

        return tasksService.searchTasks(filter);
    }
}
