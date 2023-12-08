package org.kaiteki.backend.auth.service;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.auth.models.SecurityUserDetails;
import org.kaiteki.backend.users.models.Users;
import org.kaiteki.backend.users.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SecurityUserDetailsService implements UserDetailsService {
    @Autowired
    private final UsersRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) {
        Users users = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return SecurityUserDetails.builder()
                .roles(users.getRoles())
                .password(users.getPassword())
                .id(users.getId())
                .email(users.getEmail())
                .build();
    }

    public SecurityUserDetails convertFromUser(Users users) {
        return SecurityUserDetails
                .builder()
                .id(users.getId())
                .email(users.getEmail())
                .password(users.getPassword())
                .build();

    }
}
