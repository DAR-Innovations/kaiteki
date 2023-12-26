package org.kaiteki.backend.tasks.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.tasks.models.dto.*;
import org.kaiteki.backend.tasks.service.TaskNotesService;
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
    private final TaskNotesService taskNotesService;

    @PostMapping()
    public void createTask(@RequestParam Long teamId, @RequestBody CreateTaskDTO dto) {
        tasksService.createTask(teamId, dto);
    }

    @PutMapping("/{taskId}")
    public void updateTask(@PathVariable Long taskId, @RequestBody UpdateTaskDTO dto) {
        tasksService.updateTask(taskId, dto);
    }

    @DeleteMapping("/{taskId}")
    public void deleteTask(@PathVariable Long taskId) {
        tasksService.deleteTask(taskId);
    }

    @GetMapping("/{taskId}")
    public TasksDTO getTaskDTOById(@PathVariable Long taskId) {
        return tasksService.getTaskDTO(taskId);
    }

    @GetMapping("/statuses")
    public ResponseEntity<List<TaskStatusDTO>> getStatuses(@RequestParam Long teamId, @RequestParam Boolean includeTasks, TasksFilterDTO filter) {
        if (isNull(teamId)) {
            throw new RuntimeException("Missing teamId query parameter");
        }

        return ResponseEntity.ok(taskStatusService.getTaskStatuses(teamId, includeTasks, filter));
    }

    @DeleteMapping("/statuses/{statusId}")
    public void getCustomizeStatuses(@RequestParam Long teamId, @PathVariable Long statusId) {
        if (isNull(teamId)) {
            throw new RuntimeException("Missing teamId query parameter");
        }

        taskStatusService.deleteStatus(teamId, statusId);
    }

    @GetMapping("/statuses/customize")
    public CustomizeStatusesDTO getCustomizeStatuses(@RequestParam Long teamId) {
        if (isNull(teamId)) {
            throw new RuntimeException("Missing teamId query parameter");
        }

        return taskStatusService.getCustomizeStatuses(teamId);
    }

    @PutMapping("/statuses/customize")
    public void saveCustomizeStatuses(@RequestParam Long teamId,
                                      @RequestBody List<SaveTaskStatusesDTO> dtoList) {
        if (isNull(teamId)) {
            throw new RuntimeException("Missing teamId query parameter");
        }

        taskStatusService.saveCustomizeStatuses(teamId, dtoList);
    }

    @GetMapping("/{taskId}/notes")
    public ResponseEntity<List<TaskNotesDTO>> getTaskNotesByTaskId(@PathVariable Long taskId) {
        return ResponseEntity.ok(taskNotesService.getTaskNotesByTaskId(taskId));
    }

    @DeleteMapping("/notes/{noteId}")
    public void deleteTaskNote(@PathVariable Long noteId) {
        taskNotesService.deleteTaskNote(noteId);
    }

    @PostMapping("/{taskId}/notes")
    public void createTaskNote(@PathVariable Long taskId, @RequestParam Long teamId, @RequestBody CreateTaskNoteDTO dto) {
        if (isNull(teamId)) {
            throw new RuntimeException("Missing teamId query parameter");
        }

        dto.setTeamId(teamId);
        dto.setTaskId(taskId);

        taskNotesService.createTaskNote(dto);
    }
}
