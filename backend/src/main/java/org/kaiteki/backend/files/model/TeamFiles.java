package org.kaiteki.backend.files.model;

import jakarta.persistence.*;
import lombok.*;
import org.kaiteki.backend.teams.model.entity.TeamMembers;
import org.kaiteki.backend.teams.model.entity.Teams;

import java.time.ZonedDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "team_files")
public class TeamFiles {
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
    @JoinColumn(name = "uploaded_team_member", nullable = false)
    private TeamMembers uploadedTeamMember;

    @Column(name = "created_date", nullable = false)
    private ZonedDateTime createdDate;
}
