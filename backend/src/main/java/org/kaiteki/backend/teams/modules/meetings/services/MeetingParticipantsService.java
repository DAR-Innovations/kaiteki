package org.kaiteki.backend.teams.modules.meetings.services;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.teams.model.entity.TeamMembers;
import org.kaiteki.backend.teams.modules.meetings.models.entity.MeetingParticipants;
import org.kaiteki.backend.teams.modules.meetings.models.entity.Meetings;
import org.kaiteki.backend.teams.modules.meetings.repository.MeetingParticipantsRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MeetingParticipantsService {
    private final MeetingParticipantsRepository meetingParticipantsRepository;

    public MeetingParticipants getByMeetingIdAndMemberId(Meetings meeting, TeamMembers member) {
        return meetingParticipantsRepository.findByMeetingAndMember(meeting, member)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No such meeting participant"));
    }

    @Transactional
    public MeetingParticipants createMeetingParticipant(Meetings meeting, TeamMembers member) {
        Optional<MeetingParticipants> existingParticipants = meetingParticipantsRepository.findByMeetingAndMember(meeting, member);

        if (existingParticipants.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Participant already exists");
        }

        MeetingParticipants meetingParticipants = MeetingParticipants.builder()
                .meeting(meeting)
                .joinedTime(ZonedDateTime.now())
                .member(member)
                .leftTime(null)
                .build();


        return meetingParticipantsRepository.save(meetingParticipants);
    }

    @Transactional
    public void updateMeetingParticipants(Meetings meeting, TeamMembers member, ZonedDateTime lefTime) {
        MeetingParticipants meetingParticipants = getByMeetingIdAndMemberId(meeting, member);

        meetingParticipants.setLeftTime(lefTime);

        meetingParticipantsRepository.save(meetingParticipants);
    }
}
