package org.kaiteki.backend.integrations.modules.github.models.dto;

import lombok.Data;

@Data
public class GithubOwnerDTO {
    private String login;
    private long id;
    private String nodeId;
    private String avatarUrl;
    private String gravatarId;
    private String url;
    private String type;
    private boolean siteAdmin;
}
