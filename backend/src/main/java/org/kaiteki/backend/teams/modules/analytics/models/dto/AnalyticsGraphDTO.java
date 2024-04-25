package org.kaiteki.backend.teams.modules.analytics.models.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class AnalyticsGraphDTO<DataType extends Number> {
    private List<String> labels;
    private List<DataType> data;
}
