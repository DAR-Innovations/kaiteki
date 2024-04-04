package org.kaiteki.backend.token.service;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.token.models.Tokens;
import org.kaiteki.backend.token.models.enums.TokenType;
import org.kaiteki.backend.token.repository.TokensRepository;
import org.kaiteki.backend.users.models.enitities.Users;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TokenService {
    @Value("${application.security.jwt.refresh-token.expiration}")
    private long refreshExpirationMillis;

    private final TokensRepository tokenRepository;

    public Tokens createToken(Users users, String token, TokenType type) {
        revokeAllTokensByType(users, type);

        Tokens createdToken = Tokens.builder()
                .user(users)
                .token(token)
                .type(type)
                .expiredDate(ZonedDateTime.now().plusMinutes(refreshExpirationMillis / 1000 / 60))
                .build();

        return tokenRepository.save(createdToken);
    }

    public Optional<Tokens> getByTokenAndType(String token, TokenType type) {
        return tokenRepository.findByTokenAndType(token, type);
    }

    private void revokeAllTokensByType(Users users, TokenType type) {
        var validUserTokens = tokenRepository.findAllByUserAndType(users, type);
        validUserTokens.forEach(tokenRepository::delete);
    }

    public void revokeTokenById(Long id) {
        Tokens token = tokenRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Token not found"));

        tokenRepository.delete(token);
    }

    public void revokeToken(Tokens token) {
        tokenRepository.delete(token);
    }

    public boolean isValid(Tokens token) {
        ZonedDateTime now = ZonedDateTime.now();
        return now.isBefore(token.getExpiredDate());
    }
}
