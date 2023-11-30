package org.kaiteki.backend.auth.models.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationDTO {
    private String firstname;
    private String lastname;
    private String email;
    private String password;
    private Date birthDate;
    private String country;
}
