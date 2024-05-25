package org.kaiteki.backend.integrations.modules.github.models.dto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.Date;

@Data
public class GithubRepositoryDTO {
    private long id;
    private String node_id;
    private String name;
    private String full_name;
    private GithubOwnerDTO owner;
    private String html_url;
    private String description;
    private boolean fork;
    private String url;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private ZonedDateTime created_at;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private ZonedDateTime updated_at;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private ZonedDateTime pushed_at;
    private String git_url;
    private String clone_url;
    private int stargazers_count;
    private String language;
    private boolean has_issues;
    private boolean has_projects;
    private boolean has_downloads;
    private boolean has_wiki;
    private boolean has_pages;
    private boolean has_discussions;
    private int forks_count;
    private boolean archived;
    private boolean disabled;
    private int open_issues_count;
    private boolean allow_forking;
    private boolean is_template;
    private String[] topics;
    private String visibility;
    private int forks;
    private int open_issues;
    private int watchers;
    private String default_branch;
}
