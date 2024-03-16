package org.kaiteki.backend.users.models.dto;

import lombok.Builder;
import lombok.Data;
import org.kaiteki.backend.users.models.enitities.Roles;

import java.util.Date;
import java.util.Set;

@Builder
@Data
public class UsersDTO {
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private Date birthDate;
    private Long avatarId;
    private Set<Roles> roles;
}
