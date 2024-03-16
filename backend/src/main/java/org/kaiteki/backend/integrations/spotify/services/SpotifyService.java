package org.kaiteki.backend.integrations.spotify.services;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.auth.service.CurrentSessionService;
import org.kaiteki.backend.integrations.spotify.models.SpotifyCredentials;
import org.kaiteki.backend.integrations.spotify.models.dto.SpotifyLoginDTO;
import org.kaiteki.backend.integrations.spotify.repositories.SpotifyCredentialsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.SpotifyHttpManager;
import se.michaelthelin.spotify.model_objects.credentials.AuthorizationCodeCredentials;
import se.michaelthelin.spotify.model_objects.specification.Paging;
import se.michaelthelin.spotify.model_objects.specification.SavedAlbum;
import se.michaelthelin.spotify.model_objects.specification.Track;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeRequest;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeUriRequest;
import se.michaelthelin.spotify.requests.data.library.GetCurrentUsersSavedAlbumsRequest;
import se.michaelthelin.spotify.requests.data.personalization.simplified.GetUsersTopTracksRequest;

import java.net.URI;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SpotifyService {
    private final CurrentSessionService currentSessionService;
    private final SpotifyCredentialsRepository spotifyCredentialsRepository;
    private final SpotifyApi spotifyApi;

    @Autowired
    public SpotifyService(CurrentSessionService currentSessionService,
                          SpotifyCredentialsRepository spotifyCredentialsRepository,
                          @Value("${integrations.spotify.redirect-url}") String redirectUrl,
                          @Value("${integrations.spotify.client.id}") String clientId,
                          @Value("${integrations.spotify.client.secret}") String clientSecret) {
        this.currentSessionService = currentSessionService;
        this.spotifyCredentialsRepository = spotifyCredentialsRepository;
        this.spotifyApi = new SpotifyApi.Builder()
                .setClientId(clientId)
                .setClientSecret(clientSecret)
                .setRedirectUri(SpotifyHttpManager.makeUri(redirectUrl))
                .build();
    }

    public SpotifyLoginDTO getLoginUrl() {
        AuthorizationCodeUriRequest authCodeUriReq = spotifyApi.authorizationCodeUri()
                .scope("user-read-private user-read-email user-top-read user-library-read")
                .show_dialog(true)
                .build();

        URI uri = authCodeUriReq.execute();

        return SpotifyLoginDTO.builder()
                .loginUrl(uri.toString())
                .build();
    }

    public void getSpotifyUserCode(String userCode, HttpServletResponse response) {
        AuthorizationCodeRequest authCodeReq = spotifyApi.authorizationCode(userCode).build();

        try {
            AuthorizationCodeCredentials credentials = authCodeReq.execute();

            spotifyApi.setAccessToken(credentials.getAccessToken());
            spotifyApi.setRefreshToken(credentials.getRefreshToken());

            saveUserCredentials(credentials);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    public List<SavedAlbum> getUserSavedAlbum() {
        SpotifyCredentials credentials = getCurrentUserCredentials();

        spotifyApi.setAccessToken(credentials.getAccessToken());
        spotifyApi.setRefreshToken(credentials.getRefreshToken());

        GetCurrentUsersSavedAlbumsRequest getUsersTopArtistsRequest = spotifyApi.getCurrentUsersSavedAlbums()
                .limit(50)
                .offset(0)
                .build();

        try {
            Paging<SavedAlbum> artistPaging = getUsersTopArtistsRequest.execute();
            return List.of(artistPaging.getItems());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get saved albums: " + e.getMessage());
        }
    }

    public List<Track> getUserTopTracks() {
        SpotifyCredentials credentials = getCurrentUserCredentials();

        spotifyApi.setAccessToken(credentials.getAccessToken());
        spotifyApi.setRefreshToken(credentials.getRefreshToken());

        GetUsersTopTracksRequest getUsersTopArtistsRequest = spotifyApi.getUsersTopTracks()
                .limit(50)
                .offset(0)
                .build();

        try {
            Paging<Track> artistPaging = getUsersTopArtistsRequest.execute();
            return List.of(artistPaging.getItems());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get users top tracks: " + e.getMessage());
        }
    }


    private void saveUserCredentials(AuthorizationCodeCredentials credentials) {
        Long currentUserId = currentSessionService.getCurrentUserId();

        Optional<SpotifyCredentials> spotifyCredentialsOptional = spotifyCredentialsRepository.findByUserId(currentUserId);
        ZonedDateTime now = ZonedDateTime.now();


        if (spotifyCredentialsOptional.isPresent()) {
            SpotifyCredentials existingCredentials = spotifyCredentialsOptional.get();

            existingCredentials.setAccessToken(credentials.getAccessToken());
            existingCredentials.setRefreshToken(credentials.getRefreshToken());
            existingCredentials.setExpiresDate(now.plusSeconds(credentials.getExpiresIn()));

            spotifyCredentialsRepository.save(existingCredentials);
        } else {
            SpotifyCredentials createdCredentials = SpotifyCredentials.builder()
                    .accessToken(credentials.getAccessToken())
                    .refreshToken(credentials.getRefreshToken())
                    .expiresDate(now.plusSeconds(credentials.getExpiresIn()))
                    .userId(currentUserId)
                    .build();

            spotifyCredentialsRepository.save(createdCredentials);
        }
    }

    private SpotifyCredentials getCurrentUserCredentials() {
        Long currentUserId = currentSessionService.getCurrentUserId();

        return spotifyCredentialsRepository
                .findByUserId(currentUserId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Spotify credentials not found"));
    }
}
