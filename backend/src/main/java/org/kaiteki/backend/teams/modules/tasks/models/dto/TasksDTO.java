package org.kaiteki.backend.teams.modules.tasks.models.dto;

import lombok.Builder;
import lombok.Data;
import org.kaiteki.backend.teams.model.dto.TeamsDTO;
import org.kaiteki.backend.teams.modules.tasks.models.entity.TaskPriority;
import org.kaiteki.backend.teams.model.dto.TeamMembersDTO;

import java.time.ZonedDateTime;

@Data
@Builder
public class TasksDTO {
    private Long id;
    private String title;
    private String description;
    private String content;
    private ZonedDateTime endDate;
    private ZonedDateTime startDate;
    private TaskPriority priority;
    private Boolean completed;
    private TaskStatusDTO status;
    private TeamsDTO teams;
    private TeamMembersDTO executorMember;
    private TeamMembersDTO createdMember;
    private String tag;
    private long notesAmount;
}
