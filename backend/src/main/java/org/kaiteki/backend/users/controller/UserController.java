package org.kaiteki.backend.users.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.users.models.dto.UsersDTO;
import org.kaiteki.backend.users.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/current")
    public ResponseEntity<UsersDTO> getCurrentUser() {
        return ResponseEntity.ok(userService.getCurrentUser());
    }

//    @PatchMapping("/")
//    public ResponseEntity<void> changePassword(
//            @RequestBody ChangePasswordRequest request
//    ) {
//        service.changePassword(request, connectedUser);
//        return ResponseEntity.ok().build();
//    }
}