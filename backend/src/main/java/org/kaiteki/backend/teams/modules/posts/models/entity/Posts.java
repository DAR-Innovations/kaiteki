package org.kaiteki.backend.teams.modules.posts.models.entity;

import jakarta.persistence.*;
import lombok.*;
import org.kaiteki.backend.files.model.AppFiles;
import org.kaiteki.backend.shared.entity.BaseEntity;
import org.kaiteki.backend.teams.model.entity.TeamMembers;
import org.kaiteki.backend.teams.model.entity.Teams;

import java.time.ZonedDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EqualsAndHashCode(callSuper = true, exclude = {"heroImage", "authorTeamMember", "team"})
@Table(name = "posts")
public class Posts extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "content", nullable = false)
    private String content;

    @OneToOne
    @JoinColumn(name = "hero_image_id")
    private AppFiles heroImage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_member_id", nullable = false)
    private TeamMembers authorTeamMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", nullable = false)
    private Teams team;
}