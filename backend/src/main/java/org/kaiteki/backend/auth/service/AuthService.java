package org.kaiteki.backend.auth.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.auth.models.SecurityUserDetails;
import org.kaiteki.backend.auth.models.dto.LoginDTO;
import org.kaiteki.backend.auth.models.dto.RefreshTokenDTO;
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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        dto.getEmail(),
                        dto.getPassword()
                )
        );

        if (!authenticate.isAuthenticated()) {
            throw new UsernameNotFoundException("Failed to login");
        }

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
    public TokenDTO refreshToken(
            RefreshTokenDTO dto
    ) {
       String refreshToken = dto.getRefreshToken();
        String userEmail = jwtService.extractUsername(refreshToken);

        Users users = userService.getByEmail(userEmail);
        SecurityUserDetails userDetails = securityUserDetailsService.convertFromUser(users);

        if (!jwtService.isTokenValid(refreshToken, userDetails)) {
            throw new RuntimeException("Invalid tokens");
        }

        var accessToken = jwtService.generateToken(userDetails);

        tokenService.revokeAllTokensByType(users, TokenType.BEARER);
        tokenService.createToken(users, accessToken, TokenType.BEARER);

        return TokenDTO.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }
}
