package org.kaiteki.backend.integrations.modules.telegram.controllers;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.integrations.modules.telegram.services.TelegramService;
import org.kaiteki.backend.teams.modules.tasks.models.dto.TasksDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/integrations/telegram")
@RequiredArgsConstructor
public class TelegramController {
    private final TelegramService telegramService;

    @PostMapping("/connect")
    public void connectIntegration() {
        telegramService.onConnectIntegration();
    }

    @DeleteMapping("/disconnect")
    public void disconnectIntegration() {
        telegramService.onDisconnectIntegration();
    }

    @PostMapping("/tasks")
    public List<TasksDTO> getUpcomingTasks() {
        return telegramService.getUpcomingTasks();
    }
}
