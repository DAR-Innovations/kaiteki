package org.kaiteki.backend.chats.models.entity;

import jakarta.persistence.*;
import lombok.*;
import org.kaiteki.backend.chats.models.enums.ChatRoomsType;
import org.kaiteki.backend.roles.models.PredefinedRoles;
import org.kaiteki.backend.teams.model.TeamMembers;
import org.kaiteki.backend.teams.model.Teams;
import org.kaiteki.backend.users.models.Users;

import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "chat_rooms")
public class ChatRooms {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    private ChatRoomsType type;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "chat_room_members",
            joinColumns = @JoinColumn(name = "chat_room_id"),
            inverseJoinColumns = @JoinColumn(name = "member_id")
    )
    private Set<TeamMembers> teamMembers;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", nullable = false)
    private Teams team;
}
