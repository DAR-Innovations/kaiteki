package org.kaiteki.backend.integrations.modules.spotify.services;

import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.auth.service.CurrentSessionService;
import org.kaiteki.backend.integrations.modules.spotify.models.SpotifyCredentials;
import org.kaiteki.backend.integrations.modules.spotify.repositories.SpotifyCredentialsRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.model_objects.credentials.AuthorizationCodeCredentials;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeRefreshRequest;

import java.time.ZonedDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SpotifyCredentialsService {
    private final CurrentSessionService currentSessionService;
    private final SpotifyCredentialsRepository spotifyCredentialsRepository;

    @Transactional
    public SpotifyCredentials saveUserCredentials(AuthorizationCodeCredentials credentials) {
        Long currentUserId = currentSessionService.getCurrentUserId();

        Optional<SpotifyCredentials> spotifyCredentialsOptional = spotifyCredentialsRepository.findByUserId(currentUserId);
        ZonedDateTime now = ZonedDateTime.now();

        if (spotifyCredentialsOptional.isPresent()) {
            SpotifyCredentials existingCredentials = spotifyCredentialsOptional.get();

            existingCredentials.setAccessToken(credentials.getAccessToken());
            existingCredentials.setScope(credentials.getScope());
            existingCredentials.setExpiresDate(now.plusSeconds(credentials.getExpiresIn()));

            return spotifyCredentialsRepository.save(existingCredentials);
        } else {
            SpotifyCredentials createdCredentials = SpotifyCredentials.builder()
                    .accessToken(credentials.getAccessToken())
                    .refreshToken(credentials.getRefreshToken())
                    .expiresDate(now.plusSeconds(credentials.getExpiresIn()))
                    .userId(currentUserId)
                    .scope(credentials.getScope())
                    .build();

            return spotifyCredentialsRepository.save(createdCredentials);
        }
    }

    public SpotifyCredentials getCurrentUserCredentials(SpotifyApi spotifyApi) {
        Long currentUserId = currentSessionService.getCurrentUserId();

        SpotifyCredentials spotifyCredentials = spotifyCredentialsRepository
                .findByUserId(currentUserId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized: Connect Spotify integration"));

        if (spotifyCredentials.getExpiresDate().isBefore(ZonedDateTime.now())) {
            spotifyCredentials = getRefreshedSpotifyCredentials(spotifyApi, spotifyCredentials);
        }

        return spotifyCredentials;
    }

    public SpotifyApi getAuthSpotifyApi(SpotifyApi spotifyApi) {
        SpotifyCredentials spotifyCredentials = getCurrentUserCredentials(spotifyApi);

        spotifyApi.setAccessToken(spotifyCredentials.getAccessToken());
        spotifyApi.setRefreshToken(spotifyCredentials.getRefreshToken());

        return spotifyApi;
    }

    @Transactional
    public SpotifyCredentials getRefreshedSpotifyCredentials(SpotifyApi spotifyApi, SpotifyCredentials spotifyCredentials) {
        if (!spotifyCredentials.getExpiresDate().isBefore(ZonedDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The token is still valid");
        }

        try {
            AuthorizationCodeRefreshRequest authorizationCodeRefreshRequest = spotifyApi
                    .authorizationCodeRefresh()
                    .grant_type("refresh_token")
                    .refresh_token(spotifyCredentials.getRefreshToken())
                    .build();

            AuthorizationCodeCredentials newCredentials = authorizationCodeRefreshRequest.execute();

            spotifyApi.setAccessToken(newCredentials.getAccessToken());
            spotifyApi.setRefreshToken(newCredentials.getRefreshToken());

            return saveUserCredentials(newCredentials);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to refresh users token");
        }
    }

    @Transactional
    public void deleteCurrentUserCredentials() {
        Long currentUserId = currentSessionService.getCurrentUserId();

        Optional<SpotifyCredentials> spotifyCredentials = spotifyCredentialsRepository
                .findByUserId(currentUserId);

        spotifyCredentials.ifPresent(credentials -> spotifyCredentialsRepository.deleteById(credentials.getId()));
    }
}
