package org.kaiteki.backend.integrations.modules.spotify.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.integrations.modules.spotify.services.SpotifyPlayerService;
import org.springframework.web.bind.annotation.*;
import se.michaelthelin.spotify.model_objects.miscellaneous.CurrentlyPlaying;
import se.michaelthelin.spotify.model_objects.miscellaneous.CurrentlyPlayingContext;

@RestController
@RequestMapping("/api/v1/integrations/spotify/player")
@RequiredArgsConstructor
public class SpotifyPlayerController {
    private final SpotifyPlayerService spotifyPlayerService;

    @GetMapping
    public CurrentlyPlayingContext getPlaybackState() {
        return spotifyPlayerService.getPlaybackState();
    }

    @PutMapping("/volume")
    public void setPlaybackVolume(@RequestParam int volume) {
        spotifyPlayerService.setPlaybackVolume(volume);
    }

    @PostMapping("/start")
    public void startResumePlayback(@RequestParam String trackUri) {
        spotifyPlayerService.startResumePlayback(trackUri);
    }

    @PostMapping("/pause")
    public void pausePlayback() {
        spotifyPlayerService.pausePlayback();
    }

    @GetMapping("/current-track")
    public CurrentlyPlaying getCurrentPlayingTrack() {
        return spotifyPlayerService.getCurrentPlayingTrack();
    }

    @PostMapping("/next")
    public void skipToNextTrack() {
        spotifyPlayerService.skipToNextTrack();
    }

    @PostMapping("/previous")
    public void skipToPreviousTrack() {
        spotifyPlayerService.skipToPreviousTrack();
    }

    @PutMapping("/progress")
    public void setTrackProgress(@RequestParam int positionMs) {
        spotifyPlayerService.setTrackProgress(positionMs);
    }
}
