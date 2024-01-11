package org.kaiteki.backend.teams.repository;

import org.kaiteki.backend.teams.model.entity.TeamsPerformance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamsPerformanceRepository extends
        JpaRepository<TeamsPerformance, Long>,
        JpaSpecificationExecutor<TeamsPerformance>,
        PagingAndSortingRepository<TeamsPerformance, Long> {
}
