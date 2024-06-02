package org.kaiteki.backend.teams.modules.posts.models.entity;

import jakarta.persistence.*;
import lombok.*;
import org.kaiteki.backend.shared.entity.BaseEntity;
import org.kaiteki.backend.teams.model.entity.TeamMembers;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EqualsAndHashCode(callSuper = true, exclude = {"teamMember", "post"})
@Table(name = "liked_posts")
public class LikedPosts extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_member_id")
    private TeamMembers teamMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Posts post;
}
