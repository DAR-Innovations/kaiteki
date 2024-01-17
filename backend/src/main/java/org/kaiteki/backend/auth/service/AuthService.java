package org.kaiteki.backend.auth.service;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.kaiteki.backend.auth.models.SecurityUserDetails;
import org.kaiteki.backend.auth.models.dto.LoginDTO;
import org.kaiteki.backend.auth.models.dto.RefreshTokenDTO;
import org.kaiteki.backend.auth.models.dto.RegistrationDTO;
import org.kaiteki.backend.shared.utils.EmailService;
import org.kaiteki.backend.token.models.Tokens;
import org.kaiteki.backend.token.models.dto.TokenDTO;
import org.kaiteki.backend.token.models.enums.TokenType;
import org.kaiteki.backend.token.service.TokenService;
import org.kaiteki.backend.users.models.Users;
import org.kaiteki.backend.users.models.enums.UserStatus;
import org.kaiteki.backend.users.service.UsersService;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.thymeleaf.context.Context;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UsersService userService;
    private final AuthenticationManager authenticationManager;
    private final SecurityUserDetailsService securityUserDetailsService;
    private final EmailService emailService;

    @Transactional
    public void register(RegistrationDTO dto) {
        validateRegistrationDto(dto);

        Users usersBuilder = Users.builder()
                .username(dto.getUsername())
                .firstname(dto.getFirstname())
                .email(dto.getEmail())
                .birthDate(dto.getBirthDate())
                .status(UserStatus.NEW)
                .lastname(dto.getLastname())
                .password(passwordEncoder.encode(dto.getPassword()))
                .build();

        Users user = userService.saveUser(usersBuilder);

        sendEmailVerification(user);
    }

    private void validateRegistrationDto(RegistrationDTO dto) {
        if (StringUtils.isEmpty(dto.getEmail())) {
            throw new RuntimeException("Email is required");
        }

        if (userService.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email is already in use");
        }

        if (StringUtils.isEmpty(dto.getUsername())) {
            throw new RuntimeException("Username is required");
        }

        if (userService.existsByUsername(dto.getUsername())) {
            throw new RuntimeException("Username is already in use");
        }

        if (StringUtils.isEmpty(dto.getFirstname()) || StringUtils.isEmpty(dto.getLastname())) {
            throw new RuntimeException("Firstname and Lastname are required");
        }

        if (StringUtils.isEmpty(dto.getPassword())) {
            throw new RuntimeException("Password is required");
        }

        // TODO: Add more strict validation and also dates
    }

    private void sendEmailVerification(Users user) {
        Tokens registeredToken = tokenService.createToken(user, UUID.randomUUID().toString(), TokenType.VERIFICATION);
        String verificationUrl = "http://localhost:4200/auth/verification/" + registeredToken.getToken();

        String subject = "Confirm Your Email Address for KAITEKI";

        Context context = new Context();
        context.setVariable("url", verificationUrl);

        emailService.sendHtml(subject, user.getEmail(), "email_verification.html", context);
    }

    public void checkEmailVerificationToken(String tokenString) {
        Tokens token = tokenService.getByTokenAndType(tokenString, TokenType.VERIFICATION)
                .orElseThrow(() -> new RuntimeException("Verification token not found"));

        if (!tokenService.isValid(token)) {
            throw new RuntimeException("Verification token is not valid");
        }

        Users user = token.getUser();
        user.setStatus(UserStatus.ACTIVE);
        tokenService.revokeTokenById(token.getId());
        userService.saveUser(user);
    }

    @Transactional
    public TokenDTO login(LoginDTO dto) {
        Users users = userService.getByEmailOrUsername(dto.getEmailOrUsername());

        if (List.of(UserStatus.NEW, UserStatus.BLOCK).contains(users.getStatus())) {
            throw new RuntimeException("User is not activated or blocked");
        }

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    users.getEmail(),
                    dto.getPassword()
            ));
        } catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }

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
    public TokenDTO refreshToken(RefreshTokenDTO dto) {
       String refreshToken = dto.getRefreshToken();
        String userEmail = jwtService.extractUsername(refreshToken);

        Users users = userService.getByEmail(userEmail);
        SecurityUserDetails userDetails = securityUserDetailsService.convertFromUser(users);

        if (!jwtService.isTokenValid(refreshToken, userDetails.getUsername())) {
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
