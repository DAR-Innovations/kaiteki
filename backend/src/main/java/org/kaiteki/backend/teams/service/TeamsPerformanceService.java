package org.kaiteki.backend.teams.service;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.teams.model.Teams;
import org.kaiteki.backend.teams.model.TeamsPerformance;
import org.kaiteki.backend.teams.repository.TeamsPerformanceRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
                        .periodDate(LocalDateTime.now())
                        .build()
        );
    }
}
