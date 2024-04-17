package org.kaiteki.backend.integrations.modules.telegram.services;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.auth.service.CurrentSessionService;
import org.kaiteki.backend.integrations.models.enums.PredefinedIntegrations;
import org.kaiteki.backend.integrations.models.interfaces.IntegrationService;
import org.kaiteki.backend.integrations.modules.telegram.models.dto.TelegramLinkDTO;
import org.kaiteki.backend.integrations.services.IntegrationsService;
import org.kaiteki.backend.teams.modules.meetings.models.dto.MeetingsDTO;
import org.kaiteki.backend.teams.modules.meetings.services.MeetingsService;
import org.kaiteki.backend.teams.modules.tasks.models.dto.TasksDTO;
import org.kaiteki.backend.teams.modules.tasks.service.TasksService;
import org.kaiteki.backend.teams.service.TeamsService;
import org.kaiteki.backend.users.models.enitities.Users;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TelegramService implements IntegrationService {
    @Value("${integrations.telegram.bot-url}")
    private String telegramBotUrl;
    private final IntegrationsService integrationsService;
    private final TasksService tasksService;
    private final CurrentSessionService currentSessionService;
    private final TeamsService teamsService;
    private final MeetingsService meetingsService;

    public Object onConnectIntegration() {
        integrationsService.toggleIntegrationState(PredefinedIntegrations.TELEGRAM, true);
        return true;
    }

    public void onDisconnectIntegration() {
        integrationsService.toggleIntegrationState(PredefinedIntegrations.TELEGRAM, false);
    }

    public List<TasksDTO> getUpcomingTasks() {
        Users currentUser = currentSessionService.getCurrentUser();
        return tasksService.getAllTasksDTOByUser(currentUser);
    }

    public List<MeetingsDTO> getUpcomingMeetings() {
        Users currentUser = currentSessionService.getCurrentUser();
        return meetingsService.getAllMeetingsByUser(currentUser);
    }

    public TelegramLinkDTO getBotLink() {
        return TelegramLinkDTO.builder()
                .link(telegramBotUrl)
                .build();
    }
}
