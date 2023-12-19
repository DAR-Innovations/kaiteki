package org.kaiteki.backend.tasks.service;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.tasks.models.TaskStatus;
import org.kaiteki.backend.tasks.models.Tasks;
import org.kaiteki.backend.tasks.models.dto.TaskStatusDTO;
import org.kaiteki.backend.tasks.models.dto.TasksDTO;
import org.kaiteki.backend.tasks.repository.TasksRepository;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TasksService {
    private final TasksRepository tasksRepository;

    public TasksDTO getTaskDTO(Long id) {
        return tasksRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public TasksDTO convertToDTO(Tasks task) {
        TaskStatus taskStatus = task.getStatus();
        TaskStatusDTO taskStatusDTO = TaskStatusDTO.builder()
                .tasks(null)
                .name(taskStatus.getName())
                .order(taskStatus.getOrder())
                .color(taskStatus.getColor())
                .id(taskStatus.getId())
                .build();

        return TasksDTO.builder()
                .id(task.getId())
                .title(task.getTitle())
                .statusName(taskStatusDTO)
                .content(task.getContent())
                .build();
    }
}
