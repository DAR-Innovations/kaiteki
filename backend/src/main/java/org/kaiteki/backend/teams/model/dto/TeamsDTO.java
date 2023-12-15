package org.kaiteki.backend.teams.model.dto;

import lombok.Builder;
import lombok.Data;
import org.kaiteki.backend.users.models.Users;

import java.util.Date;

@Data
@Builder
public class TeamsDTO {
        private Long id;
        private String name;
        private Date createdDate;
        private Users owner;
}
