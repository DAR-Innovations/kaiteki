package org.kaiteki.backend.integrations.modules.spotify.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.integrations.modules.spotify.models.dto.SpotifyLoginDTO;
import org.kaiteki.backend.integrations.modules.spotify.services.SpotifyService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/integrations/spotify")
@RequiredArgsConstructor
public class SpotifyController {
    private final SpotifyService spotifyService;

    @GetMapping("/connect")
    public SpotifyLoginDTO getConnectIntegrationUrl() {
        return spotifyService.onConnectIntegration();
    }

    @DeleteMapping("/disconnect")
    public void disconnectSpotifyIntegration() {
        spotifyService.onDisconnectIntegration();
    }

    @GetMapping("/auth")
    public void handleUserAuth(@RequestParam("code") String userCode) {
        spotifyService.handleSpotifyUserAuth(userCode);
    }
}
