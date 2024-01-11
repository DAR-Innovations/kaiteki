package org.kaiteki.backend.teams.repository;

import org.kaiteki.backend.teams.model.entity.MemberActivities;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberActivitiesRepository extends
        JpaRepository<MemberActivities, Long>,
        PagingAndSortingRepository<MemberActivities, Long>,
        JpaSpecificationExecutor<MemberActivities> {
    @Query("SELECT a FROM MemberActivities a WHERE a.teamMember.id = :teamMemberId ORDER BY a.periodDate DESC LIMIT 1")
    Optional<MemberActivities> findLastActivityByTeamMemberId(Long teamMemberId);
}
