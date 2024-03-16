package org.kaiteki.backend.teams.modules.meetings.models.dto;

import lombok.Data;
import org.kaiteki.backend.teams.modules.meetings.models.enums.MeetingsStatus;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Set;

@Data
public class MeetingsFilterDTO {
    private String searchValue;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDate startDate;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDate endDate;
    private MeetingsStatus status;
    private Set<Long> invitedMemberIds;
}
