package org.kaiteki.backend.auth.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.token.models.Tokens;
import org.kaiteki.backend.token.models.enums.TokenType;
import org.kaiteki.backend.token.service.TokenService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

import static java.util.Objects.nonNull;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {
    private final TokenService tokenService;

    @Override
    public void logout(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) {
        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return;
        }

        String jwt = authHeader.substring(7);
        Tokens storedToken = tokenService.getByTokenAndType(jwt, TokenType.BEARER)
                .orElse(null);

        if (nonNull(storedToken)) {
            tokenService.revokeToken(storedToken);
            SecurityContextHolder.clearContext();
        }
    }
}
