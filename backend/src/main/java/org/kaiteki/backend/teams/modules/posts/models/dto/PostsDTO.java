package org.kaiteki.backend.teams.modules.posts.models.dto;

import lombok.Builder;
import lombok.Data;
import org.kaiteki.backend.teams.model.dto.TeamMembersDTO;
import org.kaiteki.backend.users.models.dto.UsersDTO;

import java.time.ZonedDateTime;

@Data
@Builder
public class PostsDTO {
    private Long id;
    private String title;
    private String description;
    private String content;
    private ZonedDateTime createdDate;
    private Long heroImageId;
    private boolean isLiked;
    private TeamMembersDTO authorTeamMember;
}
