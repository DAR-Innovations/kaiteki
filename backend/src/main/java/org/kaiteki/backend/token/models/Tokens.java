package org.kaiteki.backend.token.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.kaiteki.backend.token.models.enums.TokenType;
import org.kaiteki.backend.users.models.Users;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tokens")
public class Tokens {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "token", unique = true)
    public String token;

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    public TokenType type;

    @Column(name = "revoked", nullable = false)
    public boolean revoked;

    @Column(name = "expired", nullable = false)
    public boolean expired;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore()
    public Users user;
}
