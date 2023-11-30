package org.kaiteki.backend.auth.service;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.auth.models.SecurityUserDetails;
import org.kaiteki.backend.users.models.Users;
import org.kaiteki.backend.users.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CurrentSessionService {
    private final UserRepository usersRepository;

    public Optional<Users> currentUser() {
        Optional<Long> userId = currentUserId();
        return userId.map(usersRepository::findById).orElseThrow(() -> new RuntimeException("User not authorized"));

    }

    public Optional<Long> currentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null
                && authentication.isAuthenticated()
                && authentication.getPrincipal() instanceof SecurityUserDetails loggedInUser) {
            return Optional.of(loggedInUser.getId());
        }

        return Optional.empty();
    }
}
