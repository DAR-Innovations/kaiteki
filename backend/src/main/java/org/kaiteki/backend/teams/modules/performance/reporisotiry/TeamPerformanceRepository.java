package org.kaiteki.backend.teams.modules.performance.reporisotiry;

import org.kaiteki.backend.teams.modules.performance.models.TeamPerformance;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeamPerformanceRepository extends MongoRepository<TeamPerformance, String> {
    Optional<TeamPerformance> findTopByTeamIdOrderByCreatedDateDesc(Long teamMemberId);

    void deleteAllByTeamId(Long teamId);
}
