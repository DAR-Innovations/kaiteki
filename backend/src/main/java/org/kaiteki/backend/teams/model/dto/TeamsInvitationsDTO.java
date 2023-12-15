package org.kaiteki.backend.teams.model.dto;


import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Builder
public class TeamsInvitationsDTO {
    private String link;
}
