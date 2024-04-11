package org.kaiteki.backend.teams.modules.performance.services;

import jakarta.transaction.Transactional;
import org.kaiteki.backend.shared.utils.DateFormattingUtil;
import org.kaiteki.backend.teams.modules.performance.models.TeamMemberPerformance;
import org.kaiteki.backend.teams.modules.performance.models.TeamPerformance;
import org.kaiteki.backend.teams.modules.performance.reporisotiry.TeamPerformanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TeamPerformanceService {
    private TeamPerformanceRepository teamPerformanceRepository;
    private TeamMemberPerformanceService teamMemberPerformanceService;

    @Autowired
    public void setTeamMemberPerformanceService(TeamMemberPerformanceService teamMemberPerformanceService) {
        this.teamMemberPerformanceService = teamMemberPerformanceService;
    }

    @Autowired
    public void setTeamPerformanceRepository(TeamPerformanceRepository teamPerformanceRepository) {
        this.teamPerformanceRepository = teamPerformanceRepository;
    }

    @Transactional
    public TeamPerformance setupDefaultTeamPerformance(Long teamId) {
        TeamPerformance teamPerformance = TeamPerformance.builder()
                .teamId(teamId)
                .createdDate(DateFormattingUtil.setTimeToStartOfDay(ZonedDateTime.now()))
                .performance(BigDecimal.ZERO)
                .build();

        return teamPerformanceRepository.save(teamPerformance);
    }

    public List<TeamPerformance> getAllPerformances(Long teamId) {
        return teamPerformanceRepository.findAllByTeamId(teamId);
    }

    @Transactional
    public TeamPerformance getPerformance(Long teamId) {
        Optional<TeamPerformance> latestPerformance = teamPerformanceRepository.findTopByTeamIdOrderByCreatedDateDesc(teamId);

        if (latestPerformance.isEmpty()) {
            return setupDefaultTeamPerformance(teamId);
        }

        ZonedDateTime lastCreatedDate = latestPerformance.get().getCreatedDate();
        ZonedDateTime targetDate = lastCreatedDate.plusMonths(1);

        if (targetDate.isBefore(ZonedDateTime.now())) {
            return setupDefaultTeamPerformance(teamId);
        }

        return latestPerformance.get();
    }

    @Async
    @Transactional
    public void calculateAndUpdatePerformance(Long teamId) {
        TeamPerformance teamPerformance = getPerformance(teamId);
        ZonedDateTime periodDate = teamPerformance.getCreatedDate();

        List<TeamMemberPerformance> teamMemberPerformanceList = teamMemberPerformanceService.getPerformancesInPeriodDate(teamId, periodDate, periodDate.plusMonths(1));

        BigDecimal totalMembersPerformance = teamMemberPerformanceList.parallelStream()
                .map(TeamMemberPerformance::getPerformance)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalTeamPerformance = totalMembersPerformance.divide(BigDecimal.valueOf(teamMemberPerformanceList.size()), 2, RoundingMode.HALF_EVEN);
        teamPerformance.setPerformance(totalTeamPerformance);

        teamPerformanceRepository.save(teamPerformance);
    }

    @Transactional
    public void deleteByTeamId(Long teamId) {
        teamPerformanceRepository.deleteAllByTeamId(teamId);
    }
}
