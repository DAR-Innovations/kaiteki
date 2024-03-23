package org.kaiteki.backend.integrations.modules.spotify.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.integrations.modules.spotify.services.SpotifyPlaylistsService;
import org.kaiteki.backend.integrations.modules.spotify.services.SpotifyService;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.michaelthelin.spotify.model_objects.specification.Playlist;
import se.michaelthelin.spotify.model_objects.specification.PlaylistSimplified;

import java.util.List;

@RestController
@RequestMapping("/api/v1/integrations/spotify/playlists")
@RequiredArgsConstructor
public class SpotifyPlaylistsController {
    private final SpotifyPlaylistsService spotifyPlaylistsService;

    @GetMapping("/saved")
    @Cacheable(value = "spotify-saved-playlists", keyGenerator = "currentUserCacheKeyGenerator")
    public List<PlaylistSimplified> getUserPlaylists() {
        return spotifyPlaylistsService.getUsersPlaylists();
    }

    @GetMapping("/category/{categoryId}")
    @Cacheable(value = "spotify-categories-playlists", keyGenerator = "currentUserCacheKeyGenerator")
    public List<PlaylistSimplified> getPlaylistsByCategory(@PathVariable String categoryId) {
        return spotifyPlaylistsService.getPlaylistsByCategory(categoryId);
    }

    @GetMapping("/{playlistId}")
    @Cacheable(value = "spotify-playlist", keyGenerator = "currentUserCacheKeyGenerator")
    public Playlist getPlaylistById(@PathVariable String playlistId) {
        return spotifyPlaylistsService.getPlaylistById(playlistId);
    }
}
