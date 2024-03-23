package org.kaiteki.backend.integrations.modules.spotify.services;


import com.google.gson.JsonArray;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.model_objects.miscellaneous.CurrentlyPlaying;
import se.michaelthelin.spotify.model_objects.miscellaneous.CurrentlyPlayingContext;
import se.michaelthelin.spotify.requests.data.player.*;


@Service
@RequiredArgsConstructor
public class SpotifyPlayerService {
    private final SpotifyCredentialsService spotifyCredentialsService;
    private final SpotifyService spotifyService;

    public CurrentlyPlayingContext getPlaybackState() {
        SpotifyApi authSpotifyApi = spotifyCredentialsService.getAuthSpotifyApi(spotifyService.getSpotifyApi());
        GetInformationAboutUsersCurrentPlaybackRequest request = authSpotifyApi.getInformationAboutUsersCurrentPlayback().build();

        try {
            return request.execute();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get users current playing context: " + e.getMessage());
        }
    }

    public void startResumePlayback(String trackUri) {
        SpotifyApi authSpotifyApi = spotifyCredentialsService.getAuthSpotifyApi(spotifyService.getSpotifyApi());

        JsonArray trackUris = new JsonArray();
        trackUris.add(trackUri);

        StartResumeUsersPlaybackRequest request = authSpotifyApi.startResumeUsersPlayback().uris(trackUris).build();

        try {
            request.execute();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to start/resume playback: " + e.getMessage());
        }
    }

    public void pausePlayback() {
        SpotifyApi authSpotifyApi = spotifyCredentialsService.getAuthSpotifyApi(spotifyService.getSpotifyApi());
        PauseUsersPlaybackRequest request = authSpotifyApi.pauseUsersPlayback().build();

        try {
            request.execute();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to start/resume playback: " + e.getMessage());
        }
    }

    public void setPlaybackVolume(int volume) {
        SpotifyApi authSpotifyApi = spotifyCredentialsService.getAuthSpotifyApi(spotifyService.getSpotifyApi());
        SetVolumeForUsersPlaybackRequest request = authSpotifyApi.setVolumeForUsersPlayback(volume).build();

        try {
            request.execute();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to start/resume playback: " + e.getMessage());
        }
    }

    public CurrentlyPlaying getCurrentPlayingTrack() {
        SpotifyApi authSpotifyApi = spotifyCredentialsService.getAuthSpotifyApi(spotifyService.getSpotifyApi());
        GetUsersCurrentlyPlayingTrackRequest request = authSpotifyApi.getUsersCurrentlyPlayingTrack().build();

        try {
            return request.execute();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to start/resume playback: " + e.getMessage());
        }
    }

    public void skipToNextTrack() {
        SpotifyApi authSpotifyApi = spotifyCredentialsService.getAuthSpotifyApi(spotifyService.getSpotifyApi());
        SkipUsersPlaybackToNextTrackRequest request = authSpotifyApi.skipUsersPlaybackToNextTrack().build();

        try {
            request.execute();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to skip to next track: " + e.getMessage());
        }
    }

    public void skipToPreviousTrack() {
        SpotifyApi authSpotifyApi = spotifyCredentialsService.getAuthSpotifyApi(spotifyService.getSpotifyApi());
        SkipUsersPlaybackToPreviousTrackRequest request = authSpotifyApi.skipUsersPlaybackToPreviousTrack().build();

        try {
            request.execute();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to skip to next track: " + e.getMessage());
        }
    }


    public void setTrackProgress(int position_ms) {
        SpotifyApi authSpotifyApi = spotifyCredentialsService.getAuthSpotifyApi(spotifyService.getSpotifyApi());
        SeekToPositionInCurrentlyPlayingTrackRequest request = authSpotifyApi.seekToPositionInCurrentlyPlayingTrack(position_ms).build();

        try {
            request.execute();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to skip to next track: " + e.getMessage());
        }
    }
}
