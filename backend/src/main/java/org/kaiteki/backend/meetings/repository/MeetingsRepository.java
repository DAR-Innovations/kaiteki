package org.kaiteki.backend.meetings.repository;

import org.kaiteki.backend.meetings.models.entity.Meetings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingsRepository extends
        JpaRepository<Meetings, Long>,
        PagingAndSortingRepository<Meetings, Long>,
        JpaSpecificationExecutor<Meetings> {
}
