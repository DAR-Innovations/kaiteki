package org.kaiteki.backend.users.models.enitities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.kaiteki.backend.files.model.AppFiles;
import org.kaiteki.backend.shared.entity.BaseEntity;
import org.kaiteki.backend.users.models.enitities.Roles;
import org.kaiteki.backend.users.models.enums.UserStatus;

import java.util.Date;
import java.util.Set;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EqualsAndHashCode(callSuper = true, exclude = {"avatarFile", "roles"})
@Table(name = "users")
public class Users extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String firstname;

    @Column(name = "last_name", nullable = false)
    private String lastname;

    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    @JsonIgnore
    private String password;

    @Column(name = "birth_date", nullable = false)
    private Date birthDate;

    @OneToOne
    @JoinColumn(name = "avatar_id")
    private AppFiles avatarFile;

    @Column(name="status", nullable = false)
    @Enumerated(EnumType.STRING)
    @JsonIgnore
    private UserStatus status;

    @ManyToMany(mappedBy = "users")
    private Set<Roles> roles;
}
