package org.kaiteki.backend.token.service;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.token.models.Tokens;
import org.kaiteki.backend.token.models.enums.TokenType;
import org.kaiteki.backend.token.repository.TokensRepository;
import org.kaiteki.backend.users.models.Users;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenService {
    private final TokensRepository tokenRepository;

    public void createToken(Users users, String token, TokenType type) {
        Tokens createdToken = Tokens.builder()
                .user(users)
                .token(token)
                .tokenType(type)
                .expired(false)
                .revoked(false)
                .build();

        tokenRepository.save(createdToken);
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
}
