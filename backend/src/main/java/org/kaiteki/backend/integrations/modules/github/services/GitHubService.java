package org.kaiteki.backend.integrations.modules.github.services;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.apache.hc.core5.net.URIBuilder;
import org.kaiteki.backend.auth.service.CurrentSessionService;
import org.kaiteki.backend.integrations.models.enums.PredefinedIntegrations;
import org.kaiteki.backend.integrations.models.interfaces.IntegrationService;
import org.kaiteki.backend.integrations.modules.github.models.dto.*;
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
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

import static java.util.Objects.isNull;

@Service
@RequiredArgsConstructor
public class GitHubService implements IntegrationService {
//    @Value("${integrations.github.client.id}")
//    private String clientId;
//    @Value("${integrations.github.client.secret}")
//    private String clientSecret;
//    @Value("${integrations.github.redirect-url}")
//    private String redirectUri;

    private final IntegrationsService integrationsService;
    private final CurrentSessionService currentSessionService;
    private final GitHubCredentialsRepository gitHubCredentialsRepository;

    @Transactional
    public void saveGithubCredentials(CreateGitHubCredentialsDTO dto) {
        Long currentUserId = currentSessionService.getCurrentUserId();

        GitHubCredentials gitHubCredentials = gitHubCredentialsRepository.findByUserId(currentUserId)
                .orElseGet(() -> GitHubCredentials.builder()
                        .userId(currentUserId)
                        .build()
                );

        gitHubCredentials.setGithubUsername(dto.getGithubUsername().trim());

        gitHubCredentialsRepository.save(gitHubCredentials);
    }

    public Object onConnectIntegration() {
        integrationsService.toggleIntegrationState(PredefinedIntegrations.GITHUB, true);
        return true;
    }

    @Transactional
    public void onDisconnectIntegration() {
        integrationsService.toggleIntegrationState(PredefinedIntegrations.GITHUB, false);
        Long currentUserId = currentSessionService.getCurrentUserId();

        Optional<GitHubCredentials> credentials = gitHubCredentialsRepository.findByUserId(currentUserId);
        credentials.ifPresent(gitHubCredentialsRepository::delete);
    }

    public List<GithubRepositoryDTO> getRepositories() {
        String username = getGithubUsername();

        try {
            URI uri = new URIBuilder(String.format("https://api.github.com/users/%s/repos", username.trim()))
                    .build();

            HttpHeaders headers = new HttpHeaders();
            headers.setAccept(List.of(MediaType.APPLICATION_JSON));
            HttpEntity<?> requestEntity = new HttpEntity<>(headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<GithubRepositoryDTO[]> response = restTemplate.exchange(uri, HttpMethod.GET, requestEntity, GithubRepositoryDTO[].class);

            if (isNull(response.getBody())) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to users repositories");
            }

            return List.of(response.getBody());
        } catch (URISyntaxException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to fetch repositories: " + e.getMessage());
        }
    }

    public GithubRepoDetails getGithubRepositoryDetails(String repoName) {
        String username = getGithubUsername();

        CompletableFuture<List<GithubRepoActivity>> activitiesFuture = CompletableFuture.supplyAsync(() -> getRepoActivities(repoName, username));
        CompletableFuture<List<GithubPullRequestDTO>> pullRequestsFuture = CompletableFuture.supplyAsync(() -> getRepoPullRequests(repoName, username));
        CompletableFuture<List<GithubIssueDTO>> issuesFuture = CompletableFuture.supplyAsync(() -> getRepoIssues(repoName, username));
        CompletableFuture<GithubRepositoryDTO> repositoryFuture = CompletableFuture.supplyAsync(() -> getRepository(repoName, username));

        CompletableFuture<Void> allFutures = CompletableFuture.allOf(repositoryFuture, activitiesFuture, pullRequestsFuture, issuesFuture);

        try {
            allFutures.join();
            return GithubRepoDetails.builder()
                    .pullRequests(pullRequestsFuture.join())
                    .repository(repositoryFuture.join())
                    .activities(activitiesFuture.join())
                    .issues(issuesFuture.join())
                    .build();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get repository details: " + e.getMessage());
        }
    }

    public GithubRepositoryDTO getRepository(String repoName, String username) {
        try {
            URI uri = new URIBuilder(String.format("https://api.github.com/repos/%s/%s", username.trim(), repoName.trim()))
                    .build();

            HttpHeaders headers = new HttpHeaders();
            headers.setAccept(List.of(MediaType.APPLICATION_JSON));
            HttpEntity<?> requestEntity = new HttpEntity<>(headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<GithubRepositoryDTO> response = restTemplate.exchange(uri, HttpMethod.GET, requestEntity, GithubRepositoryDTO.class);

            if (isNull(response.getBody())) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to repository: body is null");
            }

            return response.getBody();
        } catch (URISyntaxException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get repository: " + e.getMessage());
        }
    }

    public List<GithubRepoActivity> getRepoActivities(String repoName, String username) {
        try {
            URI uri = new URIBuilder(String.format("https://api.github.com/repos/%s/%s/activity?per_page=10", username.trim(), repoName.trim()))
                    .build();

            HttpHeaders headers = new HttpHeaders();
            headers.setAccept(List.of(MediaType.APPLICATION_JSON));
            HttpEntity<?> requestEntity = new HttpEntity<>(headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<GithubRepoActivity[]> response = restTemplate.exchange(uri, HttpMethod.GET, requestEntity, GithubRepoActivity[].class);

            if (isNull(response.getBody())) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get repository activities: missing body");
            }

            return List.of(response.getBody());
        } catch (URISyntaxException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get repository activities: " + e.getMessage());
        }
    }

    public List<GithubPullRequestDTO> getRepoPullRequests(String repoName, String username) {
        try {
            URI uri = new URIBuilder(String.format("https://api.github.com/repos/%s/%s/pulls?per_page=10", username.trim(), repoName.trim()))
                    .build();

            HttpHeaders headers = new HttpHeaders();
            headers.setAccept(List.of(MediaType.APPLICATION_JSON));
            HttpEntity<?> requestEntity = new HttpEntity<>(headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<GithubPullRequestDTO[]> response = restTemplate.exchange(uri, HttpMethod.GET, requestEntity, GithubPullRequestDTO[].class);

            if (isNull(response.getBody())) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get repository activities: missing body");
            }

            return List.of(response.getBody());
        } catch (URISyntaxException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get repository activities: " + e.getMessage());
        }
    }

    public List<GithubIssueDTO> getRepoIssues(String repoName, String username) {
        try {
            URI uri = new URIBuilder(String.format("https://api.github.com/repos/%s/%s/issues?per_page=10", username.trim(), repoName.trim()))
                    .build();

            HttpHeaders headers = new HttpHeaders();
            headers.setAccept(List.of(MediaType.APPLICATION_JSON));
            HttpEntity<?> requestEntity = new HttpEntity<>(headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<GithubIssueDTO[]> response = restTemplate.exchange(uri, HttpMethod.GET, requestEntity, GithubIssueDTO[].class);

            if (isNull(response.getBody())) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get repository activities: missing body");
            }

            return List.of(response.getBody());
        } catch (URISyntaxException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get repository activities: " + e.getMessage());
        }
    }

    public String getGithubUsername() {
        GitHubCredentials gitHubCredentials = getGithubCredentials();

        if (StringUtils.isEmpty(gitHubCredentials.getGithubUsername())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Github username is missing");
        }

        return gitHubCredentials.getGithubUsername();
    }

    public GitHubCredentials getGithubCredentials() {
        Long currentUserId = currentSessionService.getCurrentUserId();

        return gitHubCredentialsRepository.findByUserId(currentUserId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No GitHub credentials found"));
    }

//    @Transactional
//    public void refreshGitHubAccessToken() {
//        Long userId = currentSessionService.getCurrentUserId();
//
//        GitHubCredentials gitHubCredentials = gitHubCredentialsRepository.findByUserId(userId)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "GitHub credentials not found"));
//
//        try {
//            URI uri = new URIBuilder("https://github.com/login/oauth/access_token")
//                    .addParameter("client_id",  clientId)
//                    .addParameter("client_secret",  clientSecret)
//                    .addParameter("grant_type",  "refresh_token")
//                    .addParameter("refresh_token", gitHubCredentials.getRefreshToken())
//                    .build();
//
//            HttpHeaders headers = new HttpHeaders();
//            headers.setAccept(List.of(MediaType.APPLICATION_JSON));
//            HttpEntity<?> requestEntity = new HttpEntity<>(headers);
//
//            RestTemplate restTemplate = new RestTemplate();
//            ResponseEntity<GitHubAccessTokenResponse> response = restTemplate.exchange(uri, HttpMethod.POST, requestEntity, GitHubAccessTokenResponse.class);
//
//            if (isNull(response.getBody())) {
//                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get access token");
//            }
//
//            gitHubCredentials.setAccessToken(response.getBody().getAccessToken());
//            gitHubCredentials.setRefreshToken(response.getBody().getRefreshToken());
//            gitHubCredentials.setExpiresDate(ZonedDateTime.now().plusSeconds(response.getBody().getExpiresIn()));
//
//            gitHubCredentialsRepository.save(gitHubCredentials);
//        } catch (URISyntaxException e) {
//            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to build OAuth url");
//        }
//    }
//
//    @Transactional
//    public GitHubUserDTO getUserDetails() {
//        Long userId = currentSessionService.getCurrentUserId();
//
//        GitHubCredentials gitHubCredentials = gitHubCredentialsRepository.findByUserId(userId)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "GitHub credentials not found"));
//
//        try {
//            URI uri = new URIBuilder("https://api.github.com/user")
//                    .build();
//
//            HttpHeaders headers = new HttpHeaders();
//            headers.add("Accept", "application/vnd.github+json");
//            headers.add("Authorization", "Bearer " + gitHubCredentials.getAccessToken());
//
//            HttpEntity<?> requestEntity = new HttpEntity<>(headers);
//
//            RestTemplate restTemplate = new RestTemplate();
//            ResponseEntity<GitHubUserDTO> response = restTemplate.exchange(uri, HttpMethod.GET, requestEntity, GitHubUserDTO.class);
//
//            if (isNull(response.getBody())) {
//                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get authenticated user");
//            }
//
//            return response.getBody();
//        } catch (URISyntaxException e) {
//            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to build OAuth url");
//        }
//    }



    //    public GitHubLoginDTO getOAuthUrl() {
//        try {
//            URI uri = new URIBuilder("https://github.com/login/oauth/authorize")
//                    .addParameter("client_id",  clientId)
//                    .addParameter("redirect_uri",  redirectUri)
//                    .addParameter("scope", "user public_repo repo repo:status read:org notifications repo_deployment security_events project")
//                    .build();
//
//            return GitHubLoginDTO
//                    .builder()
//                    .loginUrl(uri.toString())
//                    .build();
//        } catch (URISyntaxException e) {
//            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to build OAuth url: " + e.getMessage());
//        }
//    }

//    @Transactional
//    public void getAccessTokenByCode(String code) {
//        Long currentUserId = currentSessionService.getCurrentUserId();
//
//        try {
//            URI uri = new URIBuilder("https://github.com/login/oauth/access_token")
//                    .addParameter("client_id",  clientId)
//                    .addParameter("client_secret",  clientSecret)
//                    .addParameter("code",  code)
//                    .addParameter("redirect_uri", redirectUri)
//                    .build();
//
//            HttpHeaders headers = new HttpHeaders();
//            headers.setAccept(List.of(MediaType.APPLICATION_JSON));
//            HttpEntity<?> requestEntity = new HttpEntity<>(headers);
//
//            RestTemplate restTemplate = new RestTemplate();
//            ResponseEntity<Map> response = restTemplate.exchange(uri, HttpMethod.POST, requestEntity, Map.class);
//
//            if (isNull(response.getBody())) {
//                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get response body");
//            }
//
//            Map responseBody = response.getBody();
//
//            System.out.println("RESPONSE " + response);
//
//            if (isNull(responseBody.get("access_token")) || isNull(responseBody.get("scope"))) {
//                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to get access token from body");
//            }
//
//            CreateGitHubCredentialsDTO createDTO = CreateGitHubCredentialsDTO.builder()
//                    .accessToken((String) responseBody.get("access_token"))
//                    .scope((String) responseBody.get("scope"))
//                    .userId(currentUserId)
//                    .build();
//
//            createGithubCredentials(createDTO);
//
//            onConnectIntegration();
//        } catch (URISyntaxException e) {
//            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to build OAuth url");
//        }
//    }
}
