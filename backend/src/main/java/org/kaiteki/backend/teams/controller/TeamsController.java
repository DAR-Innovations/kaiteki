package org.kaiteki.backend.teams.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.events.controllers.EventsController;
import org.kaiteki.backend.teams.model.dto.*;
import org.kaiteki.backend.teams.service.TeamsService;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/teams")
@RequiredArgsConstructor
public class TeamsController {
    private final TeamsService teamsService;

    @GetMapping()
    public ResponseEntity<List<TeamsDTO>> getTeams() {
        return ResponseEntity.ok(teamsService.getTeams());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeamsDTO> getTeam(@PathVariable Long id) {
        return ResponseEntity.ok(teamsService.getTeamDTO(id));
    }

    @GetMapping("/{teamId}/members")
    public ResponseEntity<Page<TeamMembersDTO>> getTeamMembers(@PathVariable Long teamId,
                                                               @PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable,
                                                               TeamMembersFilterDTO filter) {
        return ResponseEntity.ok(teamsService.getTeamMembers(teamId, filter, pageable));
    }

    @GetMapping("/{teamId}/members/all")
    public ResponseEntity<List<TeamMembersDTO>> getAllTeamMembers(@PathVariable Long teamId, @RequestParam boolean excludeCurrentMember) {
        return ResponseEntity.ok(teamsService.getAllTeamMembers(teamId, excludeCurrentMember));
    }

    @GetMapping("/{teamId}/members/user/{userId}")
    public ResponseEntity<TeamMembersDTO> getTeamMemberByUserId(@PathVariable Long teamId,
                                                                @PathVariable Long userId) {
        return ResponseEntity.ok(teamsService.getTeamMemberByUserId(teamId, userId));
    }

    @PostMapping()
    public void createTeam(@RequestBody CreateTeamDTO dto) {
        teamsService.createTeam(dto);
    }

    @PutMapping("/{id}")
    public void updateTeam(@PathVariable Long id, @ModelAttribute UpdateTeamDTO dto) {
        teamsService.updateTeam(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteTeam(@PathVariable Long id) {
        teamsService.deleteTeam(id);
    }

    @DeleteMapping("/{teamId}/members/{teamMemberId}")
    public void deleteTeamMember(@PathVariable Long teamId, @PathVariable Long teamMemberId) {
        teamsService.deleteTeamMember(teamId, teamMemberId);
    }

    @GetMapping("/invitations/{teamId}")
    public ResponseEntity<TeamsInvitationsDTO> getTeamInvitationLink(@PathVariable Long teamId) {
        return ResponseEntity.ok(teamsService.getTeamInvitationLink(teamId));
    }

    @PostMapping("/invitations/join/{token}")
    public void joinTeamByInvitationLink(@PathVariable String token) {
        teamsService.joinTeamByInvitationToken(token);
    }
}
