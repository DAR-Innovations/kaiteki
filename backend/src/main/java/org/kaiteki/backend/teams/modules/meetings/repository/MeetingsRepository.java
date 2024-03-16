package org.kaiteki.backend.teams.modules.meetings.repository;

import org.kaiteki.backend.teams.modules.meetings.models.entity.Meetings;
import org.kaiteki.backend.teams.model.entity.Teams;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MeetingsRepository extends
        JpaRepository<Meetings, Long>,
        PagingAndSortingRepository<Meetings, Long>,
        JpaSpecificationExecutor<Meetings> {
    Optional<Meetings> findByIdAndTeam(Long id, Teams team);
    List<Meetings> findAllByTeamIn(List<Teams> teams);
}
