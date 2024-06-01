package org.kaiteki.backend.teams.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.teams.model.dto.TeamMembersDTO;
import org.kaiteki.backend.teams.service.TeamMembersService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class TeamMembersController {
    private final TeamMembersService teamMembersService;

    @GetMapping("/{teamMemberId}")
    public TeamMembersDTO getTeamMemberById(@PathVariable Long teamMemberId) {
        return teamMembersService.getTeamMemberDTOById(teamMemberId);
    }
}
