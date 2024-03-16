package org.kaiteki.backend.teams.modules.tasks.models.entity;

import jakarta.persistence.*;
import lombok.*;
import org.kaiteki.backend.teams.model.entity.TeamMembers;
import org.kaiteki.backend.teams.model.entity.Teams;

import java.time.ZonedDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tasks")
public class Tasks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "tag", nullable = false)
    private String tag;

    @Column(name = "end_date")
    private ZonedDateTime endDate;

    @Column(name = "start_date")
    private ZonedDateTime startDate;

    @Column(name = "priority", nullable = false)
    @Enumerated(EnumType.STRING)
    private TaskPriority priority;

    @Column(name = "completed", nullable = false)
    private Boolean completed;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "status_id")
    private TaskStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Teams team;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "executor_member_id")
    private TeamMembers executorMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_member_id")
    private TeamMembers createdMember;
}
