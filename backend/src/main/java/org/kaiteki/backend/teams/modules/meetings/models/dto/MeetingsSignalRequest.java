package org.kaiteki.backend.teams.modules.meetings.models.dto;

import lombok.Data;
import org.kaiteki.backend.teams.modules.meetings.models.enums.MeetingsSignalType;

@Data
public class MeetingsSignalRequest {
    private String to;
    private String from;
    private MeetingsSignalType type;
    private String content;
}
