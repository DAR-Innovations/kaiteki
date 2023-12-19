package org.kaiteki.backend.tasks.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.tasks.models.dto.SaveTaskStatusesDTO;
import org.kaiteki.backend.tasks.models.dto.TaskStatusDTO;
import org.kaiteki.backend.tasks.service.TaskStatusService;
import org.kaiteki.backend.tasks.service.TasksService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.util.Objects.isNull;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/tasks")
public class TasksController {
    private final TaskStatusService taskStatusService;
    private final TasksService tasksService;

    @GetMapping()
    public ResponseEntity<List<TaskStatusDTO>> getStatusesWithTasks(@RequestParam Long teamId) {
        if (isNull(teamId)) {
            throw new RuntimeException("Missing teamId query parameter");
        }

        return ResponseEntity.ok(taskStatusService.getTaskStatuses(teamId));
    }

//    @GetMapping("/statuses/customization")
//    public ResponseEntity<List<TaskStatusDTO>> getStatusesWithTasks(@RequestParam Long teamId) {
//        if (isNull(teamId)) {
//            throw new RuntimeException("Missing teamId query parameter");
//        }
//
//        return ResponseEntity.ok(taskStatusService.getTaskStatuses(teamId));
//    }

    @PutMapping("/statuses")
    public void saveTaskStatuses(@RequestParam Long teamId,
                                 @RequestBody List<SaveTaskStatusesDTO> dtoList) {
        taskStatusService.saveTaskStatuses(teamId, dtoList);
    }

}
