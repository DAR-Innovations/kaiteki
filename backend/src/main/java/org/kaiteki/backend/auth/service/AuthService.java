package org.kaiteki.backend.auth.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.auth.models.SecurityUserDetails;
import org.kaiteki.backend.auth.models.dto.LoginDTO;
import org.kaiteki.backend.auth.models.dto.RegistrationDTO;
import org.kaiteki.backend.auth.jwt.service.JwtService;
import org.kaiteki.backend.token.models.dto.TokenDTO;
import org.kaiteki.backend.token.models.enums.TokenType;
import org.kaiteki.backend.token.service.TokenService;
import org.kaiteki.backend.users.models.Users;
import org.kaiteki.backend.users.models.dto.UsersDTO;
import org.kaiteki.backend.users.models.enums.UserStatus;
import org.kaiteki.backend.users.service.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final SecurityUserDetailsService securityUserDetailsService;

    @Transactional
    public TokenDTO register(RegistrationDTO dto) {
        Users usersBuilder = Users.builder()
                .firstname(dto.getFirstname())
                .email(dto.getEmail())
                .birthDate(dto.getBirthDate())
                .status(UserStatus.NEW)
                .country(dto.getCountry())
                .lastname(dto.getLastname())
                .password(passwordEncoder.encode(dto.getPassword()))
                .build();

        Users users = userService.saveUser(usersBuilder);

        SecurityUserDetails securityUserDetails = securityUserDetailsService.convertFromUser(users);

        String jwtToken = jwtService.generateToken(securityUserDetails);
        String refreshToken = jwtService.generateRefreshToken(securityUserDetails);
        tokenService.createToken(users, jwtToken, TokenType.BEARER);

        return TokenDTO.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Transactional
    public TokenDTO login(LoginDTO dto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        dto.getEmail(),
                        dto.getPassword()
                )
        );

        Users users = userService.getByEmail(dto.getEmail());
        SecurityUserDetails securityUserDetails = securityUserDetailsService.convertFromUser(users);

        String jwtToken = jwtService.generateToken(securityUserDetails);
        String  refreshToken = jwtService.generateRefreshToken(securityUserDetails);

        tokenService.revokeAllTokensByType(users, TokenType.BEARER);
        tokenService.createToken(users, jwtToken, TokenType.BEARER);

        return TokenDTO.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Transactional
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail != null) {
            Users users = userService.getByEmail(userEmail);
            SecurityUserDetails userDetails = securityUserDetailsService.convertFromUser(users);

            if (jwtService.isTokenValid(refreshToken, userDetails)) {
                var accessToken = jwtService.generateToken(userDetails);

                tokenService.revokeAllTokensByType(users, TokenType.BEARER);
                tokenService.createToken(users, accessToken, TokenType.BEARER);

                var authResponse = TokenDTO.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();

                try {
                    new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
                } catch (IOException exception) {
                    throw new RuntimeException("Failed to refresh token");
                }
            }
        }
    }
}
