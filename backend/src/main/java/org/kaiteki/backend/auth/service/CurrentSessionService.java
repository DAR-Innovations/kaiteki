package org.kaiteki.backend.auth.service;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.auth.models.SecurityUserDetails;
import org.kaiteki.backend.users.models.Users;
import org.kaiteki.backend.users.repository.UsersRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CurrentSessionService {
    private final UsersRepository usersRepository;

    public Optional<Users> currentUser() {
        Optional<Long> userId = currentUserId();
        return userId.map(usersRepository::findById).orElseThrow(() -> new AccessDeniedException("User not authorized"));

    }

    public Optional<Long> currentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null
                && authentication.isAuthenticated()
                && authentication.getPrincipal() instanceof SecurityUserDetails loggedInUser) {
            return Optional.of(loggedInUser.getUser().getId());
        }

        return Optional.empty();
    }
}
