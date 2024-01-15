package org.kaiteki.backend.teams.service;

import org.kaiteki.backend.auth.service.CurrentSessionService;
import org.kaiteki.backend.tasks.service.TaskStatusService;
import org.kaiteki.backend.teams.model.entity.TeamMembers;
import org.kaiteki.backend.teams.model.entity.Teams;
import org.kaiteki.backend.teams.model.dto.*;
import org.kaiteki.backend.teams.repository.TeamsRepository;
import org.kaiteki.backend.users.models.Users;
import org.kaiteki.backend.users.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static java.util.Objects.isNull;
import static java.util.Objects.nonNull;

@Service
public class TeamsService {
    private TeamsRepository teamsRepository;
    private CurrentSessionService currentSessionService;
    private TeamsInvitationsService teamsInvitationsService;
    private TeamMembersService teamMembersService;
    private TeamsPerformanceService teamsPerformanceService;
    private UsersService usersService;
    private TaskStatusService taskStatusService;

    @Autowired
    public void setTeamsRepository(TeamsRepository teamsRepository) {
        this.teamsRepository = teamsRepository;
    }

    @Autowired
    public void setCurrentSessionService(CurrentSessionService currentSessionService) {
        this.currentSessionService = currentSessionService;
    }

    @Autowired
    public void setTeamsInvitationsService(TeamsInvitationsService teamsInvitationsService) {
        this.teamsInvitationsService = teamsInvitationsService;
    }

    @Autowired
    public void setTeamMembersService(TeamMembersService teamMembersService) {
        this.teamMembersService = teamMembersService;
    }

    @Autowired
    public void setTeamsPerformanceService(TeamsPerformanceService teamsPerformanceService) {
        this.teamsPerformanceService = teamsPerformanceService;
    }

    @Autowired
    public void setUsersService(UsersService usersService) {
        this.usersService = usersService;
    }

    @Autowired
    public void setTaskStatusService(TaskStatusService taskStatusService) {
        this.taskStatusService = taskStatusService;
    }

    public void createTeam(CreateTeamDTO dto) {
        Users user = currentSessionService.getCurrentUser();

        Teams teamsBuilder = Teams
                .builder()
                .createdDate(ZonedDateTime.now())
                .description(dto.getDescription())
                .name(dto.getName())
                .owner(user)
                .members(new HashSet<>())
                .build();

        Teams createdTeam = teamsRepository.save(teamsBuilder);

        setupTeamsMetaData(createdTeam, user);
    }

    @Async
    private void setupTeamsMetaData(Teams createdTeam, Users teamOwner) {
        teamMembersService.createTeamMember(createdTeam, teamOwner, "Owner");
        teamsPerformanceService.createTeamPerformance(createdTeam);
        taskStatusService.setupTeamDefaultStatuses(createdTeam);
    }

    public List<TeamsDTO> getTeams() {
        Users user = currentSessionService.getCurrentUser();

        return teamsRepository.findAllByUserId(user.getId())
                .stream()
                .map(this::convertToTeamsDTO)
                .collect(Collectors.toList());
    }

    public TeamsDTO getTeamDTO(Long id) {
        return teamsRepository.findById(id)
                .map(this::convertToTeamsDTO)
                .orElseThrow(() -> new RuntimeException("Team not found"));
    }

    public Teams getTeam(Long id) {
        return teamsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Team not found"));
    }

    public TeamsInvitationsDTO getTeamInvitationLink(Long teamId) {
        Teams team = teamsRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found with id: " + teamId));

        String link = teamsInvitationsService.getInvitationLink(team);

        return TeamsInvitationsDTO.builder()
                .link(link)
                .build();
    }

    public void deleteTeam(Long id) {
        checkIfCurrentUserIsOwner(id);
        teamsRepository.deleteById(id);
    }

    public void updateTeam(Long id, UpdateTeamDTO dto) {
        checkIfCurrentUserIsOwner(id);

        Teams team = teamsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Team not found with id: " + id));

        if (nonNull(dto.getName())) {
            team.setName(dto.getName());
        }

        if (nonNull(dto.getDescription())) {
            team.setDescription(dto.getDescription());
        }

        teamsRepository.save(team);
    }

    public void joinTeamByInvitationToken(String token) {
        Teams team = teamsInvitationsService.getTeamByInvitationToken(token);
        Users user = currentSessionService.getCurrentUser();

        if (teamMembersService.containsUserInTeam(user.getId(), team.getId())) {
            throw new RuntimeException("User is already in this team");
        }

        TeamMembers teamMember = teamMembersService.createTeamMember(team, user, "Member");

        team.getMembers().add(teamMember);
        teamsRepository.save(team);
    }

    private void checkIfCurrentUserIsOwner(Long teamId) {
        Users user = currentSessionService.getCurrentUser();

        Teams team = teamsRepository.findById(teamId)
                .orElseThrow(() -> new RuntimeException("Team not found with id: " + teamId));

        if (!Objects.equals(user.getId(), team.getOwner().getId())) {
            throw new RuntimeException("The current user is not the owner");
        }
    }

    public TeamsDTO convertToTeamsDTO(Teams  team) {
        return TeamsDTO.builder()
                .createdDate(team.getCreatedDate())
                .id(team.getId())
                .owner(team.getOwner())
                .name(team.getName())
                .build();
    }

    public Page<TeamMembersDTO> getTeamMembers(Long id, TeamMembersFilterDTO filter, Pageable pageable) {
        Teams team = teamsRepository.findById(id).orElseThrow(() -> new RuntimeException("Team not found"));

        if (isNull(filter)) {
            filter = new TeamMembersFilterDTO();
        }

        return teamMembersService.search(team, filter, pageable);
    }

    public void deleteTeamMember(Long teamId, Long teamMemberId) {
        checkIfCurrentUserIsOwner(teamId);

        Teams team = teamsRepository.findById(teamId).orElseThrow(() -> new RuntimeException("Team not found"));
        TeamMembers teamMember = teamMembersService.getTeamMemberById(teamMemberId);

        if (team.getOwner().getId().equals(teamMember.getUser().getId())) {
            throw new RuntimeException("Can not remove owner from team");
        }

        teamMembersService.deleteTeamMember(teamMemberId);
    }

    public List<TeamMembersDTO> getAllTeamMembers(Long teamId, boolean excludeCurrentMember) {
        Teams team = teamsRepository.findById(teamId).orElseThrow(() -> new RuntimeException("Team not found"));
        return teamMembersService.getAll(team, excludeCurrentMember);
    }

    public TeamMembersDTO getTeamMemberByUserId(Long teamId, Long userId) {
        Teams team = teamsRepository.findById(teamId).orElseThrow(() -> new RuntimeException("Team not found"));
        Users user = usersService.getById(userId);

        return teamMembersService.getTeamMemberDTOByUserId(team, user);
    }
}
