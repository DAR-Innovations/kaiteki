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

    public Users getCurrentUser() {
        Long userId = getCurrentUserId();
        return usersRepository.findById(userId).orElseThrow(() -> new AccessDeniedException("User not found"));
    }

    public Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null
                && authentication.isAuthenticated()
                && authentication.getPrincipal() instanceof SecurityUserDetails loggedInUser) {
            return loggedInUser.getUser().getId();
        }

        throw new AccessDeniedException("User not authorized");
    }
}
