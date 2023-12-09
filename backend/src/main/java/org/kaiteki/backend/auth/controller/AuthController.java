package org.kaiteki.backend.auth.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.auth.models.dto.LoginDTO;
import org.kaiteki.backend.auth.models.dto.RefreshTokenDTO;
import org.kaiteki.backend.auth.models.dto.RegistrationDTO;
import org.kaiteki.backend.auth.service.AuthService;
import org.kaiteki.backend.token.models.dto.TokenDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public void register(@RequestBody RegistrationDTO dto) {
        authService.register(dto);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDTO> login(@RequestBody LoginDTO dto) {
        return ResponseEntity.ok(authService.login(dto));
    }

    @PostMapping("/verification/{token}")
    public void checkEmailVerificationToken(@PathVariable String token) {
        authService.checkEmailVerificationToken(token);
    }


    @PostMapping("/refresh-token")
    public ResponseEntity<TokenDTO> refreshToken(@RequestBody RefreshTokenDTO dto)  {
        return ResponseEntity.ok(authService.refreshToken(dto));

    }
}
