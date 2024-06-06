package org.kaiteki.backend.config.jwt;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.kaiteki.backend.auth.service.JwtService;
import org.kaiteki.backend.auth.service.SecurityUserDetailsService;
import org.kaiteki.backend.config.SecurityConfiguration;
import org.kaiteki.backend.integrations.services.IntegrationsService;
import org.kaiteki.backend.token.models.enums.TokenType;
import org.kaiteki.backend.token.service.TokenService;
import org.kaiteki.backend.users.models.enitities.Users;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.PathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.stream.Stream;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final TokenService tokenService;
    private final SecurityUserDetailsService userDetailsService;
    private final IntegrationsService integrationsService;
    private final PathMatcher pathMatcher;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws IOException {
        try {
            if (shouldSkipAuthentication(request)) {
                filterChain.doFilter(request, response);
                return;
            }

            UserDetails userDetails = getUserDetailsFromAuthenticationSource(request);

            if (userDetails != null) {
                UsernamePasswordAuthenticationToken authentication = createAuthenticationToken(userDetails);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized user");
            }

            filterChain.doFilter(request, response);
        } catch (JwtException | SecurityException e) {
            if (!response.isCommitted()) {
                response.sendError(HttpServletResponse.SC_FORBIDDEN, "Invalid or unauthorized token: " + e.getMessage());
            }
        } catch (Exception e) {
            if (!response.isCommitted()) {
                response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Authentication verification failed: " + e.getMessage());
            }
        }
    }

    private boolean shouldSkipAuthentication(HttpServletRequest request) {
        String path = request.getServletPath();
        return Stream.of(SecurityConfiguration.WHITE_LIST_URL).anyMatch(whiteListUrl -> pathMatcher.match(whiteListUrl, path));
    }

    private UserDetails getUserDetailsFromAuthenticationSource(HttpServletRequest request) {
        String integrationKey = extractIntegrationKey(request);
        if (StringUtils.isNotEmpty(integrationKey)) {
            return getUserDetailsFromIntegrationKey(integrationKey);
        }

        String jwt = extractJwtFromHeader(request);
        return isValidJwt(jwt) ? getUserDetailsFromJwt(jwt) : null;
    }

    private String extractJwtFromHeader(HttpServletRequest request) {
//        String authHeader = request.getHeader("Authorization");
//        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//            return null;
//        }
//        return authHeader.substring(7);

        if(request.getCookies() != null){
            for(Cookie cookie: request.getCookies()){
                if(cookie.getName().equals("kaiteki-token")){
                    return cookie.getValue();
                }
            }
        }

        return null;
    }

    private String extractIntegrationKey(HttpServletRequest request) {
        return request.getHeader("Kaiteki-Integration-Key");
    }

    private boolean isValidJwt(String jwt) {
        if (StringUtils.isEmpty(jwt)) return false;

        return jwtService.isTokenValid(jwt, jwtService.extractUsername(jwt))
                && tokenService.getByTokenAndType(jwt, TokenType.BEARER)
                .map(tokenService::isValid)
                .orElse(false);
    }

    private UserDetails getUserDetailsFromJwt(String jwt) {
        String userEmail = jwtService.extractUsername(jwt);
        return userEmail != null ? userDetailsService.loadUserByUsername(userEmail) : null;
    }

    private UserDetails getUserDetailsFromIntegrationKey(String integrationKey) {
        Users user = integrationsService.getUserByKey(integrationKey);
        String userEmail = user.getEmail();

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
