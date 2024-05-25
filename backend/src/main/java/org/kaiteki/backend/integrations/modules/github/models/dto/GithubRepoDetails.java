package org.kaiteki.backend.integrations.modules.github.models.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class GithubRepoDetails {
    private List<GithubRepoActivity> activities;
    private List<GithubPullRequestDTO> pullRequests;
    private List<GithubIssueDTO> issues;
    private GithubRepositoryDTO repository;
}
