package org.kaiteki.backend.config.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.auth.service.JwtService;
import org.kaiteki.backend.auth.service.SecurityUserDetailsService;
import org.kaiteki.backend.token.models.enums.TokenType;
import org.kaiteki.backend.token.service.TokenService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final TokenService tokenService;
    private final SecurityUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        if (shouldSkipAuthentication(request)) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = extractJwt(request);

        if (jwt == null || !validateJwt(jwt)) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            filterChain.doFilter(request, response);
            return;
        }

        UserDetails userDetails = loadUserDetailsFromJwt(jwt);
        UsernamePasswordAuthenticationToken authentication = createAuthenticationToken(userDetails);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);
    }

    private boolean shouldSkipAuthentication(HttpServletRequest request) {
        String path = request.getServletPath();
        return path.contains("/api/v1/auth");
    }

    private String extractJwt(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        return authHeader.substring(7);
    }

    private boolean validateJwt(String jwt) {
        String userEmail = jwtService.extractUsername(jwt);
        return userEmail != null
                && jwtService.isTokenValid(jwt, userEmail)
                && tokenService.getByTokenAndType(jwt, TokenType.BEARER)
                .map(t -> !t.isExpired() && !t.isRevoked())
                .orElse(false);
    }

    private UserDetails loadUserDetailsFromJwt(String jwt) {
        String userEmail = jwtService.extractUsername(jwt);
        return userEmail != null ? userDetailsService.loadUserByUsername(userEmail) : null;
    }

    private UsernamePasswordAuthenticationToken createAuthenticationToken(UserDetails userDetails) {
        return new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );
    }
}
