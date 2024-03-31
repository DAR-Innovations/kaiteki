package org.kaiteki.backend.teams.modules.performance.models;

import lombok.*;
import org.kaiteki.backend.teams.modules.performance.models.enums.PerformanceMetricsType;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PerformanceMetricsSettings {
    private boolean enabled;
    private BigDecimal weight;
    private int normalValue;
    private PerformanceMetricsType type;
}