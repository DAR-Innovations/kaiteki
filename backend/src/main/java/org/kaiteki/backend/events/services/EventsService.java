package org.kaiteki.backend.events.services;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.auth.service.CurrentSessionService;
import org.kaiteki.backend.events.models.dto.EventsDTO;
import org.kaiteki.backend.events.models.enums.EventType;
import org.kaiteki.backend.shared.utils.DateFormattingUtil;
import org.kaiteki.backend.teams.model.entity.Teams;
import org.kaiteki.backend.teams.modules.meetings.models.entity.Meetings;
import org.kaiteki.backend.teams.modules.meetings.services.MeetingsService;
import org.kaiteki.backend.teams.modules.tasks.models.entity.Tasks;
import org.kaiteki.backend.teams.modules.tasks.service.TasksService;
import org.kaiteki.backend.teams.service.TeamsService;
import org.kaiteki.backend.users.models.enitities.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.config.Task;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Stream;

import static java.util.Objects.nonNull;

@Service
@RequiredArgsConstructor
public class EventsService {
    private final MeetingsService meetingsService;
    private final TasksService tasksService;
    private final TeamsService teamsService;
    private final CurrentSessionService currentSessionService;

    public List<EventsDTO> getAllEvents() {
        Users currentUser = currentSessionService.getCurrentUser();
        List<Teams> usersTeams = teamsService.getUsersTeams(currentUser);

        List<EventsDTO> meetingsEvents = meetingsService.findAllByTeamIn(usersTeams)
                .stream()
                .map(this::convertMeetingToEvent)
                .toList();

        List<EventsDTO> taskEvents = tasksService.findAllByTeamIn(usersTeams)
                .stream()
                .map(this::convertTaskToEvent)
                .toList();

        return Stream
                .concat(meetingsEvents.parallelStream(), taskEvents.parallelStream())
                .toList();
    }

    public Page<EventsDTO> getAllEventsByTeam(Long teamId, Pageable pageable) {
        Teams team = teamsService.getTeamById(teamId);

        Page<EventsDTO> meetingsEvents = meetingsService.findAllByTeam(team, pageable)
                .map(this::convertMeetingToEvent);

        Page<EventsDTO> taskEvents = tasksService.findAllByTeam(team, pageable)
                .map(this::convertTaskToEvent);

        return new PageImpl<>(
                Stream.concat(meetingsEvents.stream(), taskEvents.stream()).toList(),
                pageable,
                meetingsEvents.getTotalElements() + taskEvents.getTotalElements()
        );
    }

    private EventsDTO convertMeetingToEvent(Meetings meeting) {
        return EventsDTO.builder()
                .id(meeting.getId())
                .type(EventType.MEETING)
                .title(meeting.getTitle())
                .start(meeting.getStartDate())
                .end(meeting.getEndDate())
                .description(meeting.getDescription())
                .build();
    }

    private EventsDTO convertTaskToEvent(Tasks task) {
        ZonedDateTime endDate = nonNull(task.getEndDate())
                ? task.getEndDate()
                : DateFormattingUtil.setTimeToEndOfDay(task.getStartDate());

        return EventsDTO.builder()
                .id(task.getId())
                .type(EventType.TASK)
                .title(task.getTitle())
                .start(task.getStartDate())
                .end(endDate)
                .description(task.getDescription())
                .build();
    }
}
