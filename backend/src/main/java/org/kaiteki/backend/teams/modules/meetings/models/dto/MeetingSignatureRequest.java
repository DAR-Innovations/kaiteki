package org.kaiteki.backend.teams.modules.meetings.models.dto;

import lombok.Data;

@Data
public class MeetingSignatureRequest {
    private Long meetingRoomId;
    private String role;
}
