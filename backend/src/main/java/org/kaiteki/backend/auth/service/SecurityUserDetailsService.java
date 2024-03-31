package org.kaiteki.backend.auth.service;

import org.kaiteki.backend.auth.models.SecurityUserDetails;
import org.kaiteki.backend.users.models.enitities.Users;
import org.kaiteki.backend.users.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class SecurityUserDetailsService implements UserDetailsService {
    @Autowired
    private UsersRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Users users = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return convertFromUser(users);
    }

    public SecurityUserDetails convertFromUser(Users users) {
        return new SecurityUserDetails(users);
    }
}
