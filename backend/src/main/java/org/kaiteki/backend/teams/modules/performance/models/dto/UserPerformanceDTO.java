package org.kaiteki.backend.teams.modules.performance.models.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class UserPerformanceDTO {
    private BigDecimal performance;
}
