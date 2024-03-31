package org.kaiteki.backend.teams.model.dto;

import lombok.Builder;
import lombok.Data;
import org.kaiteki.backend.users.models.enitities.Users;

import java.time.ZonedDateTime;

@Data
@Builder
public class TeamsDTO {
        private Long id;
        private String name;
        private ZonedDateTime createdDate;
        private Users owner;
}
