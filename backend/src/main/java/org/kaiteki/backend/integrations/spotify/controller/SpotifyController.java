package org.kaiteki.backend.integrations.spotify.controller;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.integrations.spotify.models.dto.SpotifyLoginDTO;
import org.kaiteki.backend.integrations.spotify.services.SpotifyService;
import org.kaiteki.backend.notes.model.dto.NotesDTO;
import org.springframework.web.bind.annotation.*;
import se.michaelthelin.spotify.model_objects.specification.SavedAlbum;
import se.michaelthelin.spotify.model_objects.specification.Track;

import java.util.List;

@RestController
@RequestMapping("/api/v1/integrations/spotify")
@RequiredArgsConstructor
public class SpotifyController {
    private final SpotifyService spotifyService;

    @GetMapping("/login")
    public SpotifyLoginDTO getLoginUrl() {
        return spotifyService.getLoginUrl();
    }

    @GetMapping("/auth")
    public void handleUserAuth(@RequestParam("code") String userCode, HttpServletResponse response) {
        spotifyService.getSpotifyUserCode(userCode, response);
    }

    @GetMapping("/saved-albums")
    public List<SavedAlbum> getSavedAlbums() {
        return spotifyService.getUserSavedAlbum();
    }

    @GetMapping("/user-top-tracks")
    public List<Track> getUserTopTracks() {
        return spotifyService.getUserTopTracks();
    }
}
