package org.kaiteki.backend.auth.models.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class RegistrationDTO {
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private Date birthDate;
}
