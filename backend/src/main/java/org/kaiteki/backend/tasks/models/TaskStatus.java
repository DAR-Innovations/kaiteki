package org.kaiteki.backend.tasks.models;

import jakarta.persistence.*;
import lombok.*;
import org.kaiteki.backend.teams.model.Teams;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "task_status")
public class TaskStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "color", nullable = false)
    private String color;

    @Column(name = "display_order", nullable = false)
    private Integer order;

    @Column(name = "open", nullable = false)
    private Boolean isOpen;

    @Column(name = "done", nullable = false)
    private Boolean isDone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Teams team;

    @OneToMany(mappedBy = "status")
    private List<Tasks> tasks;
}
