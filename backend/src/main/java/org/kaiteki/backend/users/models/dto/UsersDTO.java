package org.kaiteki.backend.users.models.dto;

import lombok.Builder;
import lombok.Data;
import org.kaiteki.backend.roles.models.Roles;

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
    private String country;
    private Set<Roles> roles;
}
