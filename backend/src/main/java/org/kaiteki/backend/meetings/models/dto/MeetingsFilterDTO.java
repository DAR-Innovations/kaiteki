package org.kaiteki.backend.meetings.models.dto;

import lombok.Data;
import org.kaiteki.backend.meetings.models.enums.MeetingsStatus;

import java.time.ZonedDateTime;
import java.util.Set;

@Data
public class MeetingsFilterDTO {
    private String searchValue;
    private ZonedDateTime startDate;
    private ZonedDateTime endDate;
    private MeetingsStatus status;
    private Long createdMemberId;
    private Set<Long> invitedMemberIds;
}
