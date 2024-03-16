package org.kaiteki.backend.teams.modules.meetings.repository;

import org.kaiteki.backend.teams.modules.meetings.models.entity.MeetingParticipants;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingParticipantsRepository extends
        JpaRepository<MeetingParticipants, Long>,
        PagingAndSortingRepository<MeetingParticipants, Long>,
        JpaSpecificationExecutor<MeetingParticipants> {

}
