package org.kaiteki.backend.tasks.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.tasks.models.dto.SaveTaskStatusesDTO;
import org.kaiteki.backend.tasks.models.dto.TaskStatusDTO;
import org.kaiteki.backend.tasks.service.TaskStatusService;
import org.kaiteki.backend.tasks.service.TasksService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/tasks")
public class TasksController {
    private final TaskStatusService taskStatusService;
    private final TasksService tasksService;

    @GetMapping("/{teamId}")
    public ResponseEntity<List<TaskStatusDTO>> getStatusesWithTasks(@PathVariable Long teamId) {
        return ResponseEntity.ok(taskStatusService.getTaskStatuses(teamId));
    }

    @PutMapping("/statuses/{teamId}")
    public void saveTaskStatuses(@PathVariable Long teamId,
                                 @RequestBody List<SaveTaskStatusesDTO> dtoList) {
        taskStatusService.saveTaskStatuses(teamId, dtoList);
    }

}
