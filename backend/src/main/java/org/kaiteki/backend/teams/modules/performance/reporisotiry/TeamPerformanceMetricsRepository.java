package org.kaiteki.backend.teams.modules.performance.reporisotiry;

import org.kaiteki.backend.teams.modules.performance.models.TeamPerformanceMetrics;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeamPerformanceMetricsRepository extends MongoRepository<TeamPerformanceMetrics, String> {
    Optional<TeamPerformanceMetrics> findByTeamId(Long teamId);

    void deleteAllByTeamId(Long teamId);
}
