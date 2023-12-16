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

    public TasksDTO convertToDTO(Tasks task) {
        return TasksDTO.builder()
                .build();
    }
}
