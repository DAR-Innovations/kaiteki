package org.kaiteki.backend.token.repository;

import org.kaiteki.backend.token.models.Tokens;
import org.kaiteki.backend.token.models.enums.TokenType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokensRepository extends JpaRepository<Tokens, Long> {

    @Query(value = """
      select t from Tokens t inner join Users u\s
      on t.user.id = u.id\s
      where u.id = :id and (t.expired = false or t.revoked = false)\s
      """)
    List<Tokens> findAllValidTokenByUser(Long id);

    @Query(value = """
      select t from Tokens t inner join Users u\s
      on t.user.id = u.id\s
      where u.id = :id and (t.expired = false or t.revoked = false) AND t.type = :type\s
      """)
    List<Tokens> findAllValidTokenByUserAndType(Long id, TokenType type);

    Optional<Tokens> findByTokenAndType(String token, TokenType type);
}