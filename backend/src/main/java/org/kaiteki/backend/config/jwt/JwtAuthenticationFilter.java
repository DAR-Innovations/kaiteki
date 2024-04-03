package org.kaiteki.backend.config.jwt;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.kaiteki.backend.auth.service.JwtService;
import org.kaiteki.backend.auth.service.SecurityUserDetailsService;
import org.kaiteki.backend.integrations.services.IntegrationsService;
import org.kaiteki.backend.token.models.enums.TokenType;
import org.kaiteki.backend.token.service.TokenService;
import org.kaiteki.backend.users.models.enitities.Users;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import static java.util.Objects.isNull;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final TokenService tokenService;
    private final SecurityUserDetailsService userDetailsService;
    private final IntegrationsService integrationsService;

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

        UserDetails userDetails;
        String integrationKey = extractIntegrationKey(request);

        if (StringUtils.isNotEmpty(integrationKey)) {
            userDetails = getIntegrationKeyUserDetails(integrationKey);
        } else {
            userDetails =  getJwtTokenUserDetails(request, response, filterChain);
        }

        if (isNull(userDetails)) {
            response.sendError(403, "User details not found");
            return;
        }

        UsernamePasswordAuthenticationToken authentication = createAuthenticationToken(userDetails);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);
    }

    private String extractIntegrationKey(HttpServletRequest request) {
        String integrationKey = request.getHeader("Integration-Key");
        if (StringUtils.isEmpty(integrationKey)) {
            return null;
        }
        return integrationKey;
    }

    private UserDetails getIntegrationKeyUserDetails(String key) {
        Users user = integrationsService.getUserByKey(key);
        return userDetailsService.loadUserByUsername(user.getEmail());

    }

    private UserDetails getJwtTokenUserDetails(@NonNull HttpServletRequest request,
                                               @NonNull HttpServletResponse response,
                                               @NonNull FilterChain filterChain) throws IOException {
        try {
            String jwt = extractJwt(request);

            if (jwt == null || !validateJwt(jwt)) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                filterChain.doFilter(request, response);
            }

            return loadUserDetailsFromJwt(jwt);
        } catch (JwtException jwtException) {
            response.sendError(403, "Token is invalid");
        } catch (Exception e) {
            response.sendError(500, "Failed to verify user authentication");
        }

        return null;
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
