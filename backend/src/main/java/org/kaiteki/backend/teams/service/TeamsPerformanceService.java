package org.kaiteki.backend.teams.service;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.teams.model.entity.Teams;
import org.kaiteki.backend.teams.model.entity.TeamsPerformance;
import org.kaiteki.backend.teams.repository.TeamsPerformanceRepository;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;

@Service
@RequiredArgsConstructor
public class TeamsPerformanceService {
    private final TeamsPerformanceRepository teamsPerformanceRepository;

    public TeamsPerformance createTeamPerformance(Teams team) {
        return teamsPerformanceRepository.save(
                TeamsPerformance.builder()
                        .team(team)
                        .performance(0)
                        .periodDate(ZonedDateTime.now())
                        .build()
        );
    }
}
