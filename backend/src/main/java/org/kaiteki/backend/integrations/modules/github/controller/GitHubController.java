package org.kaiteki.backend.integrations.modules.github.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.integrations.modules.github.models.dto.GitHubLoginDTO;
import org.kaiteki.backend.integrations.modules.github.services.GitHubService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/integrations/github")
@RequiredArgsConstructor
public class GitHubController {
    private final GitHubService gitHubService;

    @GetMapping("/connect")
    public GitHubLoginDTO getConnectIntegrationUrl() {
        return gitHubService.getOAuthUrl();
    }

    @DeleteMapping("/disconnect")
    public void disconnectSpotifyIntegration() {
        gitHubService.onDisconnectIntegration();
    }

    @GetMapping("/auth")
    public void handleUserAuth(@RequestParam("code") String userCode) {
        gitHubService.getAccessTokenByCode(userCode);
    }
}
