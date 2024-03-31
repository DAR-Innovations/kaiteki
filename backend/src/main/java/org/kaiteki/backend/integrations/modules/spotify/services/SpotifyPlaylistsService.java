package org.kaiteki.backend.integrations.modules.spotify.services;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.model_objects.specification.Paging;
import se.michaelthelin.spotify.model_objects.specification.Playlist;
import se.michaelthelin.spotify.model_objects.specification.PlaylistSimplified;
import se.michaelthelin.spotify.requests.data.browse.GetCategorysPlaylistsRequest;
import se.michaelthelin.spotify.requests.data.playlists.GetListOfCurrentUsersPlaylistsRequest;
import se.michaelthelin.spotify.requests.data.playlists.GetPlaylistRequest;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SpotifyPlaylistsService {
    private final SpotifyService spotifyService;
    private final SpotifyCredentialsService spotifyCredentialsService;

    public List<PlaylistSimplified> getUsersPlaylists() {
        SpotifyApi authSpotifyApi = spotifyCredentialsService.getAuthSpotifyApi(spotifyService.getSpotifyApi());

        GetListOfCurrentUsersPlaylistsRequest getListOfCurrentUsersPlaylistsRequest = authSpotifyApi.getListOfCurrentUsersPlaylists()
                .limit(10)
                .offset(0)
                .build();

        try {
            Paging<PlaylistSimplified> playlistSimplifiedPaging = getListOfCurrentUsersPlaylistsRequest.execute();
            return List.of(playlistSimplifiedPaging.getItems());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get users playlists: " + e.getMessage());
        }
    }

    public Playlist getPlaylistById(String playlistId) {
        SpotifyApi authSpotifyApi = spotifyCredentialsService.getAuthSpotifyApi(spotifyService.getSpotifyApi());

        GetPlaylistRequest getPlaylistRequest = authSpotifyApi.getPlaylist(playlistId).build();

        try {
            return getPlaylistRequest.execute();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get users playlists: " + e.getMessage());
        }
    }

    public List<PlaylistSimplified> getPlaylistsByCategory(String categoryId) {
        SpotifyApi authSpotifyApi = spotifyCredentialsService.getAuthSpotifyApi(spotifyService.getSpotifyApi());

        GetCategorysPlaylistsRequest getCategorysPlaylistsRequest = authSpotifyApi.getCategorysPlaylists(categoryId)
                .limit(10)
                .offset(0)
                .build();

        try {
            Paging<PlaylistSimplified> playlistSimplifiedPaging = getCategorysPlaylistsRequest.execute();
            return List.of(playlistSimplifiedPaging.getItems());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get playlists by category: " + e.getMessage());
        }
    }
}
