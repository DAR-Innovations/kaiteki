package org.kaiteki.backend.teams.model.entity;


import jakarta.persistence.*;
import lombok.*;
import org.kaiteki.backend.files.model.AppFiles;
import org.kaiteki.backend.shared.entity.BaseEntity;
import org.kaiteki.backend.users.models.enitities.Users;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EqualsAndHashCode(callSuper = true)
@Table(name = "teams")
public class Teams extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "owner_id")
    private Users owner;

    @OneToOne
    @JoinColumn(name = "logo_id")
    private AppFiles logo;

    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL)
    private Set<TeamMembers> members;
}
