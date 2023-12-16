package org.kaiteki.backend.tasks.service;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.shared.utils.JpaSpecificationBuilder;
import org.kaiteki.backend.tasks.models.TaskStatus;
import org.kaiteki.backend.tasks.models.dto.SaveTaskStatusesDTO;
import org.kaiteki.backend.tasks.models.dto.TaskStatusDTO;
import org.kaiteki.backend.tasks.repository.TaskStatusRepository;
import org.kaiteki.backend.teams.service.TeamsService;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.Objects.isNull;

@Service
@RequiredArgsConstructor
public class TaskStatusService {
    private final TaskStatusRepository taskStatusRepository;
    private final TeamsService teamsService;

//    public List<TaskStatusDTO> getTaskStatuses(Long teamId) {
//        JpaSpecificationBuilder<TaskStatus> filterBuilder = new JpaSpecificationBuilder<TaskStatus>()
//                .joinAndEqual("team", "id", teamId);
//
//        taskStatusRepository.findAll();
//    }

//    public void saveTaskStatuses(Long teamId, List<SaveTaskStatusesDTO> statusesList) {
//        statusesList.forEach(status -> {
//            if (isNull(status.getId())) {
//
//            }
//        });
//
//    }

    private TaskStatusDTO convertToDTO(TaskStatus taskStatus) {


        return TaskStatusDTO.builder()
                .name(taskStatus.getId())
                .color(taskStatus.getColor())
                .order(taskStatus.getOrder())
                .build();

    }
}
