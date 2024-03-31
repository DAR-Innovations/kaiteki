package org.kaiteki.backend.teams.modules.meetings.models.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MeetingSignatureResponse {
    private String signature;
}
