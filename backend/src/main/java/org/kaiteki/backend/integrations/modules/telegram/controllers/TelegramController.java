package org.kaiteki.backend.integrations.modules.telegram.controllers;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.integrations.modules.telegram.models.dto.TelegramLinkDTO;
import org.kaiteki.backend.integrations.modules.telegram.services.TelegramService;
import org.kaiteki.backend.teams.modules.meetings.models.dto.MeetingsDTO;
import org.kaiteki.backend.teams.modules.tasks.models.dto.TasksDTO;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/integrations/telegram")
@RequiredArgsConstructor
public class TelegramController {
    private final TelegramService telegramService;

    @GetMapping("/link")
    public TelegramLinkDTO getBotLink() {
        return telegramService.getBotLink();
    }

    @PostMapping("/connect")
    public void connectIntegration() {
        telegramService.onConnectIntegration();
    }

    @DeleteMapping("/disconnect")
    public void disconnectIntegration() {
        telegramService.onDisconnectIntegration();
    }

    @GetMapping("/tasks")
    @Cacheable(value = "telegram-tasks", keyGenerator = "currentUserCacheKeyGenerator")
    public List<TasksDTO> getUpcomingTasks() {
        return telegramService.getUpcomingTasks();
    }

    @GetMapping("/meetings")
    @Cacheable(value = "telegram-meetings", keyGenerator = "currentUserCacheKeyGenerator")
    public List<MeetingsDTO> getUpcomingMeetings() {
        return telegramService.getUpcomingMeetings();
    }
}
