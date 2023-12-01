package org.kaiteki.backend.users.models;

import jakarta.persistence.*;
import lombok.*;
import org.kaiteki.backend.roles.models.Roles;
import org.kaiteki.backend.users.models.enums.UserStatus;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;
import java.util.Set;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class Users implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String firstname;

    @Column(name = "last_name", nullable = false)
    private String lastname;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "birth_date", nullable = false)
    private Date birthDate;

    @Column(name = "country", nullable = false)
    private String country;

    @Column(name="status", nullable = false)
    @Enumerated(EnumType.STRING)
    private UserStatus status;

    @ManyToMany(mappedBy = "users")
    private Set<Roles> roles;
}
