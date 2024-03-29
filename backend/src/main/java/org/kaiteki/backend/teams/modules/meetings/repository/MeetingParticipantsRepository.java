package org.kaiteki.backend.teams.modules.meetings.repository;

import org.kaiteki.backend.teams.model.entity.TeamMembers;
import org.kaiteki.backend.teams.modules.meetings.models.entity.MeetingParticipants;
import org.kaiteki.backend.teams.modules.meetings.models.entity.Meetings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MeetingParticipantsRepository extends
        JpaRepository<MeetingParticipants, Long>,
        PagingAndSortingRepository<MeetingParticipants, Long>,
        JpaSpecificationExecutor<MeetingParticipants> {

    Optional<MeetingParticipants> findByMeetingAndMember(Meetings meeting, TeamMembers member);
}
