package org.kaiteki.backend.integrations.modules.github.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.auth.service.CurrentSessionService;
import org.kaiteki.backend.integrations.modules.github.models.dto.CreateGitHubCredentialsDTO;
import org.kaiteki.backend.integrations.modules.github.models.dto.GithubRepoDetails;
import org.kaiteki.backend.integrations.modules.github.models.dto.GithubRepositoryDTO;
import org.kaiteki.backend.integrations.modules.github.models.entities.GitHubCredentials;
import org.kaiteki.backend.integrations.modules.github.services.GitHubService;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.concurrent.ConcurrentMapCache;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.concurrent.ConcurrentMap;

import static java.util.Objects.nonNull;

@RestController
@RequestMapping("/api/v1/integrations/github")
@RequiredArgsConstructor
public class GitHubController {
    private final GitHubService gitHubService;
    private final CurrentSessionService currentSessionService;
    private final CacheManager cacheManager;

    @PostMapping("/connect")
    public void getConnectIntegrationUrl() {
        gitHubService.onConnectIntegration();
    }

    @PutMapping("/disconnect")
    public void disconnectSpotifyIntegration() {
        gitHubService.onDisconnectIntegration();
    }

    @PostMapping("/credentials")
    public void saveCredentials(@RequestBody CreateGitHubCredentialsDTO dto) {
        gitHubService.saveGithubCredentials(dto);

        Long currentUserId = currentSessionService.getCurrentUserId();
        String cacheKey = currentUserId + "_GitHubController_getUsersRepos_";

        Cache cache = cacheManager.getCache("github_repos");
        if (cache != null) {
            cache.evict(cacheKey);
        }
    }

    @GetMapping("/credentials")
    public GitHubCredentials getCredentials() {
        return gitHubService.getGithubCredentials();
    }

    @GetMapping("/repos")
    @Cacheable(value = "github_repos", keyGenerator = "currentUserCacheKeyGenerator")
    public List<GithubRepositoryDTO> getUsersRepos() {
        return gitHubService.getRepositories();
    }

    @GetMapping("/repos/{repoName}")
    @Cacheable(value = "github_repo_details", key = "#repoName")
    public GithubRepoDetails getUsersRepos(@PathVariable String repoName) {
        return gitHubService.getGithubRepositoryDetails(repoName);
    }

    //    @GetMapping("/auth")
//    public void handleUserAuth(@RequestParam("code") String userCode) {
//        gitHubService.getAccessTokenByCode(userCode);
//    }
}
