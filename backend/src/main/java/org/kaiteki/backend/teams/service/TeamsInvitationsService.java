package org.kaiteki.backend.teams.service;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.teams.model.Teams;
import org.kaiteki.backend.teams.model.TeamsInvitations;
import org.kaiteki.backend.teams.repository.TeamsInvitationsRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TeamsInvitationsService {
    @Value("${application.client.url}")
    private String clientUrl;
    private final TeamsInvitationsRepository teamsInvitationsRepository;

    public Teams getTeamByInvitationToken(String token) {
        TeamsInvitations invitation = teamsInvitationsRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid invitation link"));

        return invitation.getTeam();
    }

    public String getInvitationLink(Teams team) {
        String token = UUID.randomUUID().toString();

        Optional<TeamsInvitations> invitation = teamsInvitationsRepository.findByToken(token);

        TeamsInvitations newInvitation = invitation.orElseGet(() ->
                teamsInvitationsRepository.save(
                        TeamsInvitations.builder()
                                .team(team)
                                .token(token)
                                .build()
                )
        );

        return String.format("%s/teams/invitation/%s", clientUrl, newInvitation.getToken());
    }
}
