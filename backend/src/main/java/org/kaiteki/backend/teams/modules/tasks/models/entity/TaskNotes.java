package org.kaiteki.backend.teams.modules.tasks.models.entity;

import jakarta.persistence.*;
import lombok.*;
import org.kaiteki.backend.shared.entity.BaseEntity;
import org.kaiteki.backend.teams.model.entity.TeamMembers;

import java.time.ZonedDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EqualsAndHashCode(callSuper = true, exclude = {"task", "teamMember"})
@Table(name = "task_notes")
public class TaskNotes extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_member_id", nullable = false)
    private TeamMembers teamMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id", nullable = false)
    private Tasks task;
}
