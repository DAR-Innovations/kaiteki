package org.kaiteki.backend.users.service;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.auth.service.CurrentSessionService;
import org.kaiteki.backend.files.model.AppFiles;
import org.kaiteki.backend.users.models.Users;
import org.kaiteki.backend.users.models.dto.UsersDTO;
import org.kaiteki.backend.users.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User with such email not found"));
    }

    public Users getByEmailOrUsername(String emailOrUsername) {
        return userRepository.findByEmailOrUsername(emailOrUsername, emailOrUsername)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User with such email or username not found"));
    }

    public Users getById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    public UsersDTO convertToUsersDTO(Users user) {
        Long avatarId = isNull(user.getAvatarFile()) ? null : user.getAvatarFile().getId();

        return UsersDTO.builder()
                .id(user.getId())
                .roles(user.getRoles())
                .lastname(user.getLastname())
                .firstname(user.getFirstname())
                .birthDate(user.getBirthDate())
                .email(user.getEmail())
                .avatarId(avatarId)
                .build();
    }

    public UsersDTO getCurrentUser() {
        Users user = currentSessionService.getCurrentUser();
        return convertToUsersDTO(user);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
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
