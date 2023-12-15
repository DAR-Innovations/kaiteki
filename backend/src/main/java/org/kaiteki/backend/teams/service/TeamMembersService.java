package org.kaiteki.backend.teams.service;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.kaiteki.backend.activities.model.Activities;
import org.kaiteki.backend.activities.service.ActivitiesService;
import org.kaiteki.backend.shared.utils.JpaSpecificationBuilder;
import org.kaiteki.backend.teams.model.TeamMembers;
import org.kaiteki.backend.teams.model.Teams;
import org.kaiteki.backend.teams.model.dto.TeamMembersDTO;
import org.kaiteki.backend.teams.model.dto.TeamMembersFilterDTO;
import org.kaiteki.backend.teams.repository.TeamMembersRepository;
import org.kaiteki.backend.users.models.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class TeamMembersService {
    private final TeamMembersRepository teamMembersRepository;
    private final ActivitiesService activitiesService;

    public TeamMembers createTeamMember(Teams team, Users user, String position) {
        TeamMembers teamMembers = teamMembersRepository.save(TeamMembers.builder()
                .joinedDate(new Date())
                .position(position)
                .team(team)
                .user(user)
                .activities(Collections.emptyList())
                .build()
        );

        activitiesService.createActivity(teamMembers);

        return teamMembers;
    }

    public void deleteTeamMember(Long teamMemberId) {
        teamMembersRepository.deleteById(teamMemberId);
    }

    public TeamMembersDTO convertToTeamMembersDTO(TeamMembers teamMember) {
        Users user = teamMember.getUser();
        Activities lastActivity = activitiesService.getLastActivity(teamMember);

        return TeamMembersDTO.builder()
                .email(user.getEmail())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .performance(lastActivity.getPerformance())
                .position(teamMember.getPosition())
                .joinedDate(teamMember.getJoinedDate())
                .id(teamMember.getId())
                .build();
    }

    public boolean containsUserInTeam(Long userId, Long teamId) {
         return teamMembersRepository.countUsersInTeam(userId, teamId) > 0;
    }

    public TeamMembers getTeamMemberById(Long teamMemberId) {
        return teamMembersRepository.findById(teamMemberId).orElseThrow(() -> new RuntimeException("Team member not found"));
    }

    public Page<TeamMembersDTO> search(Teams team, TeamMembersFilterDTO filter, Pageable pageable) {
        JpaSpecificationBuilder<TeamMembers> filterBuilder = new JpaSpecificationBuilder<TeamMembers>()
                .joinAndEqual("team", "id", team.getId());

        if (!StringUtils.isEmpty(filter.getSearchValue())) {
            String searchValue = filter.getSearchValue();

            Specification<TeamMembers> positionFilterSpec = new JpaSpecificationBuilder<TeamMembers>()
                    .like( "position", searchValue)
                    .build();

            Map<String, Object> userFilterMap = new HashMap<>();
            userFilterMap.put("firstname", searchValue);
            userFilterMap.put("lastname", searchValue);
            userFilterMap.put("email", filter.getSearchValue());

            Specification<TeamMembers> userFilterSpec = new JpaSpecificationBuilder<TeamMembers>()
                    .orMultipleJoinLike(List.of("user"), userFilterMap)
                    .build();

            Specification<TeamMembers> combinedSearchValueSpec = Specification.where(positionFilterSpec)
                    .or(userFilterSpec);

            filterBuilder.addSpecification(combinedSearchValueSpec);
        }

        return teamMembersRepository
                .findAll(filterBuilder.build(), pageable)
                .map(this::convertToTeamMembersDTO);
    }
}
