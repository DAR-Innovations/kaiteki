package org.kaiteki.backend.teams.modules.performance.services;

import org.kaiteki.backend.teams.modules.performance.models.dto.PredictedTeamPerformanceDTO;
import org.springframework.transaction.annotation.Transactional;
import org.kaiteki.backend.shared.utils.DateFormattingUtil;
import org.kaiteki.backend.teams.modules.performance.models.TeamMemberPerformance;
import org.kaiteki.backend.teams.modules.performance.models.TeamPerformance;
import org.kaiteki.backend.teams.modules.performance.reporisotiry.TeamPerformanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public TeamPerformance getFirstPerformance(Long teamId) {
        Optional<TeamPerformance> firstPerformance = teamPerformanceRepository.findTopByTeamIdOrderByCreatedDateAsc(teamId);

        return firstPerformance.orElseGet(() -> setupDefaultTeamPerformance(teamId));

    }

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

    public PredictedTeamPerformanceDTO getPredictedPerformance(Long teamId) {
        List<TeamPerformance> teamPerformanceList = teamPerformanceRepository.findAllByTeamIdOrderByCreatedDateAsc(teamId);

        double alpha = 0.5;

        BigDecimal smoothedPerformance = null;

        if (teamPerformanceList.size() > 1) {
            for (int i = 0; i < teamPerformanceList.size() - 1; i++) {
                TeamPerformance performance = teamPerformanceList.get(i);

                if (smoothedPerformance == null) {
                    smoothedPerformance = performance.getPerformance();
                } else {
                    smoothedPerformance = smoothedPerformance
                            .multiply(BigDecimal.valueOf(1 - alpha))
                            .add(performance.getPerformance().multiply(BigDecimal.valueOf(alpha)));
                }
            }
        }

        if (smoothedPerformance != null) {
            smoothedPerformance = smoothedPerformance.setScale(1, RoundingMode.HALF_UP);
        }

        return PredictedTeamPerformanceDTO.builder()
                .performance(smoothedPerformance)
                .build();
    }
}
