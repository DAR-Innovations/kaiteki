package org.kaiteki.backend.teams.modules.performance.reporisotiry;

import org.kaiteki.backend.teams.modules.performance.models.TeamPerformance;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamPerformanceRepository extends MongoRepository<TeamPerformance, String> {
    Optional<TeamPerformance> findTopByTeamIdOrderByCreatedDateDesc(Long teamMemberId);
    Optional<TeamPerformance> findTopByTeamIdOrderByCreatedDateAsc(Long teamMemberId);

    void deleteAllByTeamId(Long teamId);

    List<TeamPerformance> findAllByTeamId(Long teamId);
    List<TeamPerformance> findAllByTeamIdOrderByCreatedDateAsc(Long teamId);

}
