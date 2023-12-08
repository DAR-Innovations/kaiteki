package org.kaiteki.backend.auth.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.auth.models.dto.LoginDTO;
import org.kaiteki.backend.auth.models.dto.RefreshTokenDTO;
import org.kaiteki.backend.auth.models.dto.RegistrationDTO;
import org.kaiteki.backend.auth.service.AuthService;
import org.kaiteki.backend.auth.service.CurrentSessionService;
import org.kaiteki.backend.token.models.dto.TokenDTO;
import org.kaiteki.backend.users.models.Users;
import org.kaiteki.backend.users.models.dto.UsersDTO;
import org.kaiteki.backend.users.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<TokenDTO> register(@RequestBody RegistrationDTO dto) {
        return ResponseEntity.ok(authService.register(dto));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDTO> authenticate(@RequestBody LoginDTO dto) {
        return ResponseEntity.ok(authService.login(dto));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<TokenDTO> refreshToken(@RequestBody RefreshTokenDTO dto)  {
        return ResponseEntity.ok(authService.refreshToken(dto));

    }
}
