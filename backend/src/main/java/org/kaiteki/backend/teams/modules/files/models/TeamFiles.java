package org.kaiteki.backend.teams.modules.files.models;

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
@EqualsAndHashCode(callSuper = true)
@Table(name = "team_files")
public class TeamFiles extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "team_id", nullable = false)
    private Teams team;

    @ManyToOne
    @JoinColumn(name = "file_id", nullable = false)
    private AppFiles file;

    @Column(name = "description", nullable = false)
    private String description;

    @ManyToOne
    @JoinColumn(name = "uploaded_team_member_id", nullable = false)
    private TeamMembers uploadedTeamMember;
}
