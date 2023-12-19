package org.kaiteki.backend.users.service;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.auth.service.CurrentSessionService;
import org.kaiteki.backend.users.models.Users;
import org.kaiteki.backend.users.models.dto.UsersDTO;
import org.kaiteki.backend.users.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import static java.util.Objects.isNull;

@Service
@RequiredArgsConstructor
public class UsersService {
    @Value("${application.server.url}")
    private String serverUrl;

    private final UsersRepository userRepository;
    private final CurrentSessionService currentSessionService;

    public Users saveUser(Users users) {
        return userRepository.save(users);
    }

    public Users getByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User with such email not found"));
    }

    public Users getById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public UsersDTO convertToUsersDTO(Users user) {
        String avatarUrl = null;
        if (!isNull(user.getAvatarGuid())) {
            avatarUrl = String.format("%s/api/v1/files/%s", serverUrl, user.getAvatarGuid());
        }

        return UsersDTO.builder()
                .id(user.getId())
                .roles(user.getRoles())
                .lastname(user.getLastname())
                .firstname(user.getFirstname())
                .birthDate(user.getBirthDate())
                .email(user.getEmail())
                .avatarUrl(avatarUrl)
                .build();
    }

    public UsersDTO getCurrentUser() {
        Users user = currentSessionService.getCurrentUser()
                .orElseThrow(() -> new RuntimeException("User not found"));

        return convertToUsersDTO(user);
    }

//    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {
//
//        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
//
//        // check if the current password is correct
//        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
//            throw new IllegalStateException("Wrong password");
//        }
//        // check if the two new passwords are the same
//        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
//            throw new IllegalStateException("Password are not the same");
//        }
//
//        // update the password
//        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
//
//        // save the new password
//        repository.save(user);
//    }
}
