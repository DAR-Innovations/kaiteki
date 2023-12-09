package org.kaiteki.backend.demo;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.auth.service.CurrentSessionService;
import org.kaiteki.backend.users.models.Users;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/demo")
@RequiredArgsConstructor
public class DemoController {
    private final CurrentSessionService currentSessionService;

    @GetMapping("/anonymous")
    public ResponseEntity<String> greetAnonym() {
        return ResponseEntity.ok("Hello World");
    }

    @GetMapping("/secured")
    public ResponseEntity<String> greetSecure() {
        Optional<Users> currentUser = currentSessionService.getCurrentUser();
        return currentUser
                .map(user -> ResponseEntity.ok(String.format("Hello, %s", user.getFirstname())))
                .orElseGet(() -> ResponseEntity.ok("Hello World"));
    }
}
