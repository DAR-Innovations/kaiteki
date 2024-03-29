package org.kaiteki.backend.teams.modules.performance.reporisotiry;

import org.kaiteki.backend.teams.modules.performance.models.TeamMemberPerformance;
import org.kaiteki.backend.teams.modules.performance.models.TeamPerformance;
import org.kaiteki.backend.teams.modules.tasks.models.entity.TaskNotes;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TeamMemberPerformanceRepository extends
        MongoRepository<TeamMemberPerformance, String> {
    Optional<TeamMemberPerformance> findTopByTeamMemberIdOrderByCreatedDateDesc(Long teamMemberId);

    List<TeamMemberPerformance> findAllByTeamIdAndCreatedDateBetween(Long teamId, ZonedDateTime startDate, ZonedDateTime endDate);

    void deleteAllByTeamMemberId(Long teamMemberId);
}
