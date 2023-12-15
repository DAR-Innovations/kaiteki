package org.kaiteki.backend.tasks.service;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.tasks.repository.TasksRepository;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class TasksService {
    private final TasksRepository tasksRepository;
}
