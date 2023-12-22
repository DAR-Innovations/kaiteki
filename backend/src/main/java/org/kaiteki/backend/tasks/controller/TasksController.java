package org.kaiteki.backend.tasks.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.tasks.models.dto.CreateTaskDTO;
import org.kaiteki.backend.tasks.models.dto.CustomizeStatusesDTO;
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

    @PostMapping()
    public void createTask(@RequestParam Long teamId, @RequestBody CreateTaskDTO dto) {
        tasksService.createTask(teamId, dto);
    }

    @GetMapping("/statuses")
    public ResponseEntity<List<TaskStatusDTO>> getStatuses(@RequestParam Long teamId, @RequestParam Boolean includeTasks) {
        if (isNull(teamId)) {
            throw new RuntimeException("Missing teamId query parameter");
        }

        return ResponseEntity.ok(taskStatusService.getTaskStatuses(teamId, includeTasks));
    }

    @DeleteMapping("/statuses/{statusId}")
    public void getCustomizeStatuses(@RequestParam Long teamId, @PathVariable Long statusId) {
        taskStatusService.deleteStatus(teamId, statusId);
    }

    @GetMapping("/statuses/customize")
    public CustomizeStatusesDTO getCustomizeStatuses(@RequestParam Long teamId) {
        return taskStatusService.getCustomizeStatuses(teamId);
    }

    @PutMapping("/statuses/customize")
    public void saveCustomizeStatuses(@RequestParam Long teamId,
                                      @RequestBody List<SaveTaskStatusesDTO> dtoList) {
        taskStatusService.saveCustomizeStatuses(teamId, dtoList);
    }

}
