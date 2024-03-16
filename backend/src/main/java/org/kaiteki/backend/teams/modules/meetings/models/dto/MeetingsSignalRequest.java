package org.kaiteki.backend.meetings.models.dto;

import lombok.Data;
import org.kaiteki.backend.meetings.models.enums.MeetingsSignalType;

@Data
public class MeetingsSignalRequest {
    private String to;
    private String from;
    private MeetingsSignalType type;
    private String content;
}
