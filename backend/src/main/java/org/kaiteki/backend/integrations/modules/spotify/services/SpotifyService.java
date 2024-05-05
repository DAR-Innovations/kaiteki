package org.kaiteki.backend.integrations.modules.spotify.services;

import lombok.Getter;
import org.kaiteki.backend.integrations.models.enums.PredefinedIntegrations;
import org.kaiteki.backend.integrations.models.interfaces.IntegrationService;
import org.kaiteki.backend.integrations.modules.spotify.models.dto.SpotifyLoginDTO;
import org.kaiteki.backend.integrations.services.IntegrationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.SpotifyHttpManager;
import se.michaelthelin.spotify.model_objects.credentials.AuthorizationCodeCredentials;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeRequest;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeUriRequest;

import java.net.URI;

@Service
public class SpotifyService implements IntegrationService {
    @Getter
    private final SpotifyApi spotifyApi;
    private final SpotifyCredentialsService spotifyCredentialsService;
    private final IntegrationsService integrationsService;

    @Autowired
    public SpotifyService(@Value("${integrations.spotify.redirect-url}") String redirectUrl,
                          @Value("${integrations.spotify.client.id}") String clientId,
                          @Value("${integrations.spotify.client.secret}") String clientSecret,
                          SpotifyCredentialsService spotifyCredentialsService,
                          IntegrationsService integrationsService) {
        this.spotifyCredentialsService = spotifyCredentialsService;
        this.integrationsService = integrationsService;
        this.spotifyApi = new SpotifyApi.Builder()
                .setClientId(clientId)
                .setClientSecret(clientSecret)
                .setRedirectUri(SpotifyHttpManager.makeUri(redirectUrl))
                .build();
    }

    public SpotifyLoginDTO onConnectIntegration() {
        String defaultPermissionScope = "user-read-email " +
                "playlist-read-collaborative " +
                "playlist-read-private " +
                "streaming " +
                "user-follow-read " +
                "user-modify-playback-state " +
                "user-read-playback-state " +
                "user-read-currently-playing " +
                "user-library-read " +
                "user-read-recently-played " +
                "user-top-read " +
                "user-read-private ";

        AuthorizationCodeUriRequest authCodeUriReq = spotifyApi.authorizationCodeUri()
                .scope(defaultPermissionScope)
                .show_dialog(true)
                .build();

        try {
            URI uri = authCodeUriReq.execute();

            return SpotifyLoginDTO.builder()
                    .loginUrl(uri.toString())
                    .build();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get login url");
        }
    }

    @Transactional
    public void handleSpotifyUserAuth(String userCode) {
        AuthorizationCodeRequest authCodeReq = spotifyApi.authorizationCode(userCode).build();

        try {
            AuthorizationCodeCredentials credentials = authCodeReq.execute();

            spotifyApi.setAccessToken(credentials.getAccessToken());
            spotifyApi.setRefreshToken(credentials.getRefreshToken());

            spotifyCredentialsService.saveUserCredentials(credentials);
            integrationsService.toggleIntegrationState(PredefinedIntegrations.SPOTIFY, true);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @Transactional
    public void onDisconnectIntegration() {
        spotifyCredentialsService.deleteCurrentUserCredentials();
        integrationsService.toggleIntegrationState(PredefinedIntegrations.SPOTIFY, false);

    }
}
