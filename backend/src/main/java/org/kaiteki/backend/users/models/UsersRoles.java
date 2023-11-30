package org.kaiteki.backend.users.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.kaiteki.backend.roles.models.Roles;

import java.io.Serial;
import java.io.Serializable;

@Getter
@Setter
@Entity
@Table(name = "users_roles")
public class UsersRoles implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Roles role;
}
