package org.kaiteki.backend.teams.modules.tasks.models.dto;

import lombok.Builder;
import lombok.Data;
import org.kaiteki.backend.teams.modules.tasks.models.enums.ExportFormats;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
@Builder
public class ExportTasksDTO {
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDate startDate;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDate endDate;
    private Long executorId;
    private ExportFormats format;
    private Long teamId;
}
