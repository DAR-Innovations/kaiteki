package org.kaiteki.backend.auth.models.dto;

import lombok.Data;

import java.util.Date;

@Data
public class RegistrationDTO {
    private String firstname;
    private String lastname;
    private String username;
    private String email;
    private String password;
    private Date birthDate;
}
