package org.kaiteki.backend.tasks.service;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.tasks.models.Tasks;
import org.kaiteki.backend.tasks.models.dto.TasksDTO;
import org.kaiteki.backend.tasks.repository.TasksRepository;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TasksService {
    private final TasksRepository tasksRepository;
    private final TaskStatusService taskStatusService;

    public TasksDTO getTaskDTO(Long id) {
        return tasksRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public TasksDTO convertToDTO(Tasks task) {
        //TODO: STATUS MISSSING
        return TasksDTO.builder()
                .id(task.getId())
                .title(task.getTitle())
                .content(task.getContent())
                .build();
    }
}
