package org.kaiteki.backend.token.service;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.token.models.Tokens;
import org.kaiteki.backend.token.models.enums.TokenType;
import org.kaiteki.backend.token.repository.TokensRepository;
import org.kaiteki.backend.users.models.enitities.Users;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final TokensRepository tokenRepository;

    public Tokens createToken(Users users, String token, TokenType type) {
        Tokens createdToken = Tokens.builder()
                .user(users)
                .token(token)
                .type(type)
                .expired(false)
                .revoked(false)
                .build();

        return tokenRepository.save(createdToken);
    }

    public Optional<Tokens> getByTokenAndType(String token, TokenType type) {
        return tokenRepository.findByTokenAndType(token, type);
    }

    public Tokens saveToken(Tokens token) {
        return tokenRepository.save(token);
    }

    public void revokeAllTokensByType(Users users, TokenType type) {
        var validUserTokens = tokenRepository.findAllValidTokenByUserAndType(users.getId(), type);

        if (validUserTokens.isEmpty())
            return;

        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });

        tokenRepository.saveAll(validUserTokens);
    }

    public void revokeTokenById(Long id) {
        Tokens token = tokenRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Token not found"));

        token.setExpired(true);
        token.setRevoked(true);

        tokenRepository.save(token);
    }

    public void revokeAllTokens(Users users) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(users.getId());

        if (validUserTokens.isEmpty())
            return;

        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });

        tokenRepository.saveAll(validUserTokens);
    }

    public boolean isValid(Tokens token) {
        return !token.isExpired() && !token.isRevoked();
    }

    public Optional<Tokens> getByUserAndType(Users user, TokenType type) {
        return tokenRepository.findByUserAndType(user, type);
    }
}
