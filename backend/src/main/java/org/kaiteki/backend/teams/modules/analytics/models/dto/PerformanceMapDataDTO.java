package org.kaiteki.backend.teams.modules.analytics.models.dto;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class PerformanceMapDataDTO {
    private BigDecimal totalPerformance;
    private int performanceCount;
}
