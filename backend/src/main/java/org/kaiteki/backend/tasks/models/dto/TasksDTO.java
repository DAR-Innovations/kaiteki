package org.kaiteki.backend.tasks.models.dto;

import lombok.Builder;
import lombok.Data;
import org.kaiteki.backend.tasks.models.entity.TaskPriority;
import org.kaiteki.backend.teams.model.dto.TeamMembersDTO;

import java.time.LocalDate;

@Data
@Builder
public class TasksDTO {
    private Long id;
    private String title;
    private String description;
    private String content;
    private LocalDate endDate;
    private LocalDate startDate;
    private TaskPriority priority;
    private Boolean completed;
    private TaskStatusDTO status;
    private TeamMembersDTO executorMember;
    private TeamMembersDTO createdMember;
    private String tag;
}
