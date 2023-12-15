package org.kaiteki.backend.activities.repository;

import org.kaiteki.backend.activities.model.Activities;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ActivitiesRepository extends
        JpaRepository<Activities, Long>,
        PagingAndSortingRepository<Activities, Long>,
        JpaSpecificationExecutor<Activities> {
    @Query("SELECT a FROM Activities a WHERE a.teamMember.id = :teamMemberId ORDER BY a.periodDate DESC LIMIT 1")
    Optional<Activities> findLastActivityByTeamMemberId(Long teamMemberId);
}
