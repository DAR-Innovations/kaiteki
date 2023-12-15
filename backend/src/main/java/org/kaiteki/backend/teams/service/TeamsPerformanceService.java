package org.kaiteki.backend.teams.service;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.teams.model.Teams;
import org.kaiteki.backend.teams.model.TeamsPerformance;
import org.kaiteki.backend.teams.repository.TeamsPerformanceRepository;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class TeamsPerformanceService {
    private final TeamsPerformanceRepository teamsPerformanceRepository;

    public TeamsPerformance createTeamPerformance(Teams team) {
        return teamsPerformanceRepository.save(
                TeamsPerformance.builder()
                        .team(team)
                        .performance(0)
                        .periodDate(new Date())
                        .build()
        );
    }
}
