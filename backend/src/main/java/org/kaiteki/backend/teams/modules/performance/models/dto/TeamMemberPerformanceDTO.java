package org.kaiteki.backend.teams.modules.performance.models.dto;

import lombok.Builder;
import lombok.Data;
import org.kaiteki.backend.teams.model.dto.TeamMembersDTO;

import java.math.BigDecimal;
import java.time.ZonedDateTime;

@Data
@Builder
public class TeamMemberPerformanceDTO {
    private BigDecimal performance;
    private TeamMembersDTO member;
    private ZonedDateTime createdDate;
}
