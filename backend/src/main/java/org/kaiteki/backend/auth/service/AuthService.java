package org.kaiteki.backend.auth.service;

import lombok.RequiredArgsConstructor;
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
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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
        Users usersBuilder = Users.builder()
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

//    private void sendEmailVerification(Users user) {
//        Tokens registeredToken = tokenService.createToken(user, UUID.randomUUID().toString(), TokenType.VERIFICATION);
//        String verificationUrl = "http://localhost:4200/auth/verification/" + registeredToken.getToken();
//
//        String subject = "Confirm Your Email Address for KAITEKI";
//        String body = String.format(
//                """
//                        Hi %s %s,
//
//                        Thanks for signing up for KAITEKI! Please verify your email address to complete your registration and unlock all the features.
//
//                        Click the link below to confirm or copy and paste the following URL into your browser:
//                        %s
//
//                        If you didn't sign up for KAITEKI, you can safely disregard this email and delete this message.
//
//                        Thank you,
//                        The KAITEKI Team
//
//                        """,
//                user.getFirstname(), user.getLastname(), verificationUrl
//        );
//
//
//        emailService.sendSimpleMessage(subject, user.getEmail(), body);
//    }

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
        userService.saveUser(user);
    }

    @Transactional
    public TokenDTO login(LoginDTO dto) {
        Users users = userService.getByEmail(dto.getEmail());

        if (List.of(UserStatus.NEW, UserStatus.BLOCK).contains(users.getStatus())) {
            throw new RuntimeException("User is not activated or blocked");
        }

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    dto.getEmail(),
                    dto.getPassword()
            ));
        } catch (AuthenticationException e) {
            e.printStackTrace();
            throw new RuntimeException("Invalid email or password " + e.getMessage());
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
