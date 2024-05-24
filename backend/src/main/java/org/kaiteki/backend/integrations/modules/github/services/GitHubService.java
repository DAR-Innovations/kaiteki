package org.kaiteki.backend.integrations.modules.github.services;

import lombok.RequiredArgsConstructor;
import org.apache.hc.core5.net.URIBuilder;
import org.kaiteki.backend.auth.service.CurrentSessionService;
import org.kaiteki.backend.integrations.models.enums.PredefinedIntegrations;
import org.kaiteki.backend.integrations.models.interfaces.IntegrationService;
import org.kaiteki.backend.integrations.modules.github.models.dto.CreateGitHubCredentialsDTO;
import org.kaiteki.backend.integrations.modules.github.models.dto.GitHubAccessTokenResponse;
import org.kaiteki.backend.integrations.modules.github.models.dto.GitHubLoginDTO;
import org.kaiteki.backend.integrations.modules.github.models.dto.GitHubUserDTO;
import org.kaiteki.backend.integrations.modules.github.models.entities.GitHubCredentials;
import org.kaiteki.backend.integrations.modules.github.repositories.GitHubCredentialsRepository;
import org.kaiteki.backend.integrations.services.IntegrationsService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;

import static java.util.Objects.isNull;

@Service
@RequiredArgsConstructor
public class GitHubService implements IntegrationService {
    @Value("${integrations.github.client.id}")
    private String clientId;
    @Value("${integrations.github.client.secret}")
    private String clientSecret;
    @Value("${integrations.github.redirect-url}")
    private String redirectUri;

    private final IntegrationsService integrationsService;
    private final CurrentSessionService currentSessionService;
    private final GitHubCredentialsRepository gitHubCredentialsRepository;

    public GitHubLoginDTO getOAuthUrl() {
        try {
            URI uri = new URIBuilder("https://github.com/login/oauth/authorize")
                    .addParameter("client_id",  clientId)
                    .addParameter("redirect_uri",  redirectUri)
                    .addParameter("scope", "user public_repo repo repo:status read:org notifications repo_deployment security_events project")
                    .build();

            return GitHubLoginDTO
                    .builder()
                    .loginUrl(uri.toString())
                    .build();
        } catch (URISyntaxException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to build OAuth url: " + e.getMessage());
        }
    }

    @Transactional
    public void getAccessTokenByCode(String code) {
        Long currentUserId = currentSessionService.getCurrentUserId();

        try {
            URI uri = new URIBuilder("https://github.com/login/oauth/access_token")
                    .addParameter("client_id",  clientId)
                    .addParameter("client_secret",  clientSecret)
                    .addParameter("code",  code)
                    .addParameter("redirect_uri", redirectUri)
                    .build();

            HttpHeaders headers = new HttpHeaders();
            headers.setAccept(List.of(MediaType.APPLICATION_JSON));
            HttpEntity<?> requestEntity = new HttpEntity<>(headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<GitHubAccessTokenResponse> response = restTemplate.exchange(uri, HttpMethod.POST, requestEntity, GitHubAccessTokenResponse.class);

            System.out.println("REPOSEEEENSEE "+ response.getBody());

            System.out.println("ACCCESSS TOKEN "+ response.getBody().getAccessToken());


//            if (isNull(response.getBody())) {
//                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get access token");
//            }
//
//            CreateGitHubCredentialsDTO createDTO = CreateGitHubCredentialsDTO.builder()
//                    .accessToken(response.getBody().getAccessToken())
//                    .refreshToken(response.getBody().getRefreshToken())
//                    .scope(response.getBody().getScope())
//                    .userId(currentUserId)
//                    .expiresDate(ZonedDateTime.now().plusSeconds(response.getBody().getExpiresIn()))
//                    .build();
//
//            createGithubCredentials(createDTO);
//
//            onConnectIntegration();

        } catch (URISyntaxException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to build OAuth url");
        }
    }

    @Transactional
    public void refreshGitHubAccessToken() {
        Long userId = currentSessionService.getCurrentUserId();

        GitHubCredentials gitHubCredentials = gitHubCredentialsRepository.findByUserId(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "GitHub credentials not found"));

        try {
            URI uri = new URIBuilder("https://github.com/login/oauth/access_token")
                    .addParameter("client_id",  clientId)
                    .addParameter("client_secret",  clientSecret)
                    .addParameter("grant_type",  "refresh_token")
                    .addParameter("refresh_token", gitHubCredentials.getRefreshToken())
                    .build();

            HttpHeaders headers = new HttpHeaders();
            headers.setAccept(List.of(MediaType.APPLICATION_JSON));
            HttpEntity<?> requestEntity = new HttpEntity<>(headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<GitHubAccessTokenResponse> response = restTemplate.exchange(uri, HttpMethod.POST, requestEntity, GitHubAccessTokenResponse.class);

            if (isNull(response.getBody())) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get access token");
            }

            gitHubCredentials.setAccessToken(response.getBody().getAccessToken());
            gitHubCredentials.setRefreshToken(response.getBody().getRefreshToken());
            gitHubCredentials.setExpiresDate(ZonedDateTime.now().plusSeconds(response.getBody().getExpiresIn()));

            gitHubCredentialsRepository.save(gitHubCredentials);
        } catch (URISyntaxException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to build OAuth url");
        }
    }

    @Transactional
    public GitHubUserDTO getUserDetails() {
        Long userId = currentSessionService.getCurrentUserId();

        GitHubCredentials gitHubCredentials = gitHubCredentialsRepository.findByUserId(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "GitHub credentials not found"));

        try {
            URI uri = new URIBuilder("https://api.github.com/user")
                    .build();

            HttpHeaders headers = new HttpHeaders();
            headers.add("Accept", "application/vnd.github+json");
            headers.add("Authorization", "Bearer " + gitHubCredentials.getAccessToken());

            HttpEntity<?> requestEntity = new HttpEntity<>(headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<GitHubUserDTO> response = restTemplate.exchange(uri, HttpMethod.GET, requestEntity, GitHubUserDTO.class);

            if (isNull(response.getBody())) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get authenticated user");
            }

            return response.getBody();
        } catch (URISyntaxException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to build OAuth url");
        }
    }

    public void createGithubCredentials(CreateGitHubCredentialsDTO dto) {
        GitHubCredentials.builder()
                .accessToken(dto.getAccessToken())
                .scope(dto.getScope())
                .refreshToken(dto.getRefreshToken())
                .userId(dto.getUserId())
                .build();
    }

    public Object onConnectIntegration() {
        integrationsService.toggleIntegrationState(PredefinedIntegrations.GITHUB, true);
        return true;
    }

    public void onDisconnectIntegration() {
        integrationsService.toggleIntegrationState(PredefinedIntegrations.GITHUB, false);
    }
}
