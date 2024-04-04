package org.kaiteki.backend.teams.modules.tasks.models.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Data
@Builder
public class TasksFilterDTO {
    private Long statusId;
    private String searchValue;
    private Long executorId;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDate startDate;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDate endDate;
    private Long teamId;
    private Set<Long> teamIds;
}
