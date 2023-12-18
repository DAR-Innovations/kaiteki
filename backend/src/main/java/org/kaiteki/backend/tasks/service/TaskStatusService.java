package org.kaiteki.backend.tasks.service;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.shared.utils.JpaSpecificationBuilder;
import org.kaiteki.backend.tasks.models.TaskStatus;
import org.kaiteki.backend.tasks.models.dto.SaveTaskStatusesDTO;
import org.kaiteki.backend.tasks.models.dto.TaskStatusDTO;
import org.kaiteki.backend.tasks.models.dto.TasksDTO;
import org.kaiteki.backend.tasks.repository.TaskStatusRepository;
import org.kaiteki.backend.teams.model.Teams;
import org.kaiteki.backend.teams.service.TeamsService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.util.Objects.nonNull;

@Service
@RequiredArgsConstructor
public class TaskStatusService {
    private final TaskStatusRepository taskStatusRepository;
    private final TeamsService teamsService;
    private final TasksService tasksService;

    public List<TaskStatusDTO> getTaskStatuses(Long teamId) {
        JpaSpecificationBuilder<TaskStatus> filterBuilder = new JpaSpecificationBuilder<TaskStatus>()
                .joinAndEqual("team", "id", teamId);

        return taskStatusRepository.findAll(filterBuilder.build())
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public void saveTaskStatuses(Long teamId, List<SaveTaskStatusesDTO> statusesList) {
        Teams team = teamsService.getTeam(teamId);

        statusesList.forEach(status -> {
            if (nonNull(status.getId())) {
                updateExistingTaskStatus(status);
            } else {
                saveTaskStatusFromDTO(team, status);
            }
        });
    }

    private void updateExistingTaskStatus(SaveTaskStatusesDTO status) {
        TaskStatus taskStatus = taskStatusRepository.findById(status.getId())
                .orElseThrow(() -> new RuntimeException("Task status not found"));

        taskStatus.setName(status.getName());
        taskStatus.setOrder(status.getOrder());
        taskStatus.setColor(status.getColor());

        taskStatusRepository.save(taskStatus);
    }

    private void saveTaskStatusFromDTO(Teams team, SaveTaskStatusesDTO status) {
        //TODO: CHECK WHOLE CODE
        TaskStatus taskStatus = TaskStatus.builder()
                .color(status.getColor())
                .order(status.getOrder())
                .team(team)
                .tasks(new ArrayList<>())
                .type(status.getType())
                .name(status.getName())
                .build();

        taskStatusRepository.save(taskStatus);
    }

     TaskStatusDTO convertToDTO(TaskStatus taskStatus) {
        List<TasksDTO> tasksDTOs = taskStatus.getTasks()
                .stream()
                .map(tasksService::convertToDTO)
                .toList();

        return TaskStatusDTO.builder()
                .id(taskStatus.getId())
                .name(taskStatus.getName())
                .color(taskStatus.getColor())
                .order(taskStatus.getOrder())
                .tasks(tasksDTOs)
                .build();

    }
}
