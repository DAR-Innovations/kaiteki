package org.kaiteki.backend.meetings.services;

import org.kaiteki.backend.meetings.models.dto.MeetingsSignalRequest;
import org.springframework.stereotype.Service;

@Service
public class MeetingsSignalingService {
    public void sendSignal(Long roomId, MeetingsSignalRequest createDto) {
    }
}
