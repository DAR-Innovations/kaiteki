package org.kaiteki.backend.teams.modules.performance.services;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.auth.service.CurrentSessionService;
import org.kaiteki.backend.teams.model.entity.TeamMembers;
import org.kaiteki.backend.teams.modules.performance.models.TeamMemberPerformance;
import org.kaiteki.backend.teams.modules.performance.models.dto.UserPerformanceDTO;
import org.kaiteki.backend.teams.service.TeamMembersService;
import org.kaiteki.backend.users.models.enitities.Users;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserPerformanceService {
    private final TeamMembersService teamMembersService;
    private final TeamMemberPerformanceService teamMemberPerformanceService;
    private final CurrentSessionService currentSessionService;

    public UserPerformanceDTO getLatestUserPerformance() {
        Users currentUser = currentSessionService.getCurrentUser();
        List<TeamMembers> currentUserTeamMembers = teamMembersService.getAllUsersTeamMembers(currentUser);

        Optional<BigDecimal> averagePerformance = currentUserTeamMembers.stream()
                .map(teamMember -> teamMemberPerformanceService.getPerformance(teamMember.getId()))
                .map(TeamMemberPerformance::getPerformance)
                .reduce(BigDecimal::add)
                .map(sum -> sum.divide(BigDecimal.valueOf(currentUserTeamMembers.size()), 2, RoundingMode.HALF_UP));

        if (averagePerformance.isPresent()) {
            return UserPerformanceDTO.builder().performance(averagePerformance.get()).build();
        }

        return UserPerformanceDTO.builder().performance(BigDecimal.ZERO).build();
    }
}
