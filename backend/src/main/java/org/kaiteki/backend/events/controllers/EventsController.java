package org.kaiteki.backend.events.controllers;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.events.models.dto.EventsDTO;
import org.kaiteki.backend.events.services.EventsService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/events")
@RequiredArgsConstructor
public class EventsController {
    private final EventsService eventsService;

    @GetMapping()
    public List<EventsDTO> getTeams() {
        return eventsService.getAllMeetings();
    }
}
