package org.kaiteki.backend.integrations.modules.spotify.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.integrations.modules.spotify.models.dto.SpotifyLoginDTO;
import org.kaiteki.backend.integrations.modules.spotify.services.SpotifyPlayerService;
import org.kaiteki.backend.integrations.modules.spotify.services.SpotifyService;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.*;
import se.michaelthelin.spotify.model_objects.specification.Playlist;
import se.michaelthelin.spotify.model_objects.specification.PlaylistSimplified;

import java.util.List;

@RestController
@RequestMapping("/api/v1/integrations/spotify")
@RequiredArgsConstructor
public class SpotifyController {
    private final SpotifyService spotifyService;

    @GetMapping("/connect")
    public SpotifyLoginDTO getConnectIntegrationUrl() {
        return spotifyService.getConnectIntegrationUrl();
    }

    @DeleteMapping("/disconnect")
    public void disconnectSpotifyIntegration() {
        spotifyService.disconnectSpotifyIntegration();
    }

    @GetMapping("/auth")
    public void handleUserAuth(@RequestParam("code") String userCode) {
        spotifyService.getSpotifyUserCode(userCode);
    }
}
