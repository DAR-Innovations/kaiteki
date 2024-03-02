package org.kaiteki.backend.meetings.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.meetings.models.dto.CreateMeetingDTO;
import org.kaiteki.backend.meetings.models.dto.MeetingsDTO;
import org.kaiteki.backend.meetings.models.dto.MeetingsFilterDTO;
import org.kaiteki.backend.meetings.models.dto.UpdateMeetingDTO;
import org.kaiteki.backend.meetings.services.MeetingsService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import static java.util.Objects.isNull;

@RestController
@RequestMapping("/api/v1/meetings")
@RequiredArgsConstructor
public class MeetingsController {
    private final MeetingsService meetingsService;

    @PostMapping()
    public void createMeeting(@RequestParam Long teamId, @RequestBody CreateMeetingDTO dto) {
        if (isNull(teamId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing teamId query parameter");
        }

        dto.setTeamId(teamId);
        meetingsService.createMeeting(dto);
    }

    @GetMapping()
    public Page<MeetingsDTO> getMeetings(@RequestParam Long teamId,
                                         @PageableDefault(sort = { "id" }, direction = Sort.Direction.DESC) Pageable pageable,
                                         MeetingsFilterDTO filter) {
        return meetingsService.getMeetings(teamId, pageable, filter);
    }

    @GetMapping("/{meetingId}")
    public MeetingsDTO getMeeting(@PathVariable Long meetingId, @RequestParam Long teamId) {
        if (isNull(teamId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing teamId query parameter");
        }

        return meetingsService.getMeetingDTO(meetingId, teamId);
    }

    @DeleteMapping("/{meetingId}")
    public void deleteMeeting(@RequestParam Long teamId, @PathVariable Long meetingId) {
        if (isNull(teamId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing teamId query parameter");
        }

        meetingsService.deleteMeeting(meetingId, teamId);
    }

    @PutMapping("/{meetingId}")
    public void updateMeeting(@RequestParam Long teamId, @PathVariable Long meetingId, @RequestBody UpdateMeetingDTO dto) {
        if (isNull(teamId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing teamId query parameter");
        }

        dto.setTeamId(teamId);
        meetingsService.updateMeeting(meetingId, dto);
    }

}
