package org.kaiteki.backend.token.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.kaiteki.backend.token.models.enums.TokenType;
import org.kaiteki.backend.users.models.enitities.Users;

import java.time.ZonedDateTime;

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
    private Long id;

    @Column(name = "token", unique = true)
    private String token;

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    private TokenType type;

    @Column(name = "expired_date", nullable = false)
    private ZonedDateTime expiredDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore()
    private Users user;
}
