package org.kaiteki.backend.meetings.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.meetings.models.dto.MeetingsSignalRequestDTO;
import org.kaiteki.backend.meetings.services.MeetingsSignalingService;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class MeetingsSignalingController {
    private MeetingsSignalingService meetingsSignalingService;

    @MessageMapping("/meetings/{roomId}/signal")
    public void sendSignal(@DestinationVariable Long roomId, MeetingsSignalRequestDTO createDto) {
        meetingsSignalingService.sendSignal(roomId, createDto);
    }

    @SubscribeMapping("/queue/meetings/{roomId}")
    public void getRealtimeSignals() {}
}
