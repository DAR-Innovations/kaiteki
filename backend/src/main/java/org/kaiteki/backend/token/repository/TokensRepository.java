package org.kaiteki.backend.token.repository;

import org.kaiteki.backend.token.models.Tokens;
import org.kaiteki.backend.token.models.enums.TokenType;
import org.kaiteki.backend.users.models.enitities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokensRepository extends JpaRepository<Tokens, Long> {
    List<Tokens> findAllByUserAndType(Users user, TokenType type);

    Optional<Tokens> findByTokenAndType(String token, TokenType type);
}