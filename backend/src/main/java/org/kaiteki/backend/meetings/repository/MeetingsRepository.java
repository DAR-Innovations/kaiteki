package org.kaiteki.backend.meetings.repository;

import org.kaiteki.backend.meetings.models.entity.Meetings;
import org.kaiteki.backend.teams.model.entity.Teams;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MeetingsRepository extends
        JpaRepository<Meetings, Long>,
        PagingAndSortingRepository<Meetings, Long>,
        JpaSpecificationExecutor<Meetings> {
    Optional<Meetings> findByIdAndTeam(Long id, Teams team);
}
