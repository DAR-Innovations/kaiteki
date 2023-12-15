package org.kaiteki.backend.teams.model;

import jakarta.persistence.*;
import lombok.*;
import org.kaiteki.backend.activities.model.Activities;
import org.kaiteki.backend.users.models.Users;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "team_members")
public class TeamMembers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "position", nullable = false)
    private String position;

    @Column(name = "joined_date", nullable = false)
    private Date joinedDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", nullable = false)
    private Teams team;

    @OneToMany(mappedBy = "teamMember", cascade = CascadeType.ALL)
    private List<Activities> activities;
}
