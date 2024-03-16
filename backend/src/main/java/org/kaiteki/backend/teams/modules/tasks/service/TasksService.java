package org.kaiteki.backend.teams.modules.tasks.service;

import org.apache.commons.lang3.StringUtils;
import org.kaiteki.backend.auth.service.CurrentSessionService;
import org.kaiteki.backend.shared.utils.JpaSpecificationBuilder;
import org.kaiteki.backend.teams.modules.tasks.models.dto.*;
import org.kaiteki.backend.teams.modules.tasks.models.entity.TaskStatus;
import org.kaiteki.backend.teams.modules.tasks.models.entity.TaskStatusType;
import org.kaiteki.backend.teams.modules.tasks.models.entity.Tasks;
import org.kaiteki.backend.teams.modules.tasks.repository.TasksRepository;
import org.kaiteki.backend.teams.model.entity.TeamMembers;
import org.kaiteki.backend.teams.model.entity.Teams;
import org.kaiteki.backend.teams.model.dto.TeamMembersDTO;
import org.kaiteki.backend.teams.service.TeamMembersService;
import org.kaiteki.backend.teams.service.TeamsService;
import org.kaiteki.backend.users.models.enitities.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.Objects.isNull;

@Service
public class TasksService {
    private TasksRepository tasksRepository;
    private TeamsService teamsService;
    private TeamMembersService teamMembersService;
    private CurrentSessionService currentSessionService;
    private TaskStatusService taskStatusService;
    private TaskNotesService taskNotesService;

    @Autowired
    public void setTeamMembersService(TeamMembersService teamMembersService) {
        this.teamMembersService = teamMembersService;
    }

    @Autowired
    public void setCurrentSessionService(CurrentSessionService currentSessionService) {
        this.currentSessionService = currentSessionService;
    }

    @Autowired
    public void setTeamsService(TeamsService teamsService) {
        this.teamsService = teamsService;
    }

    @Autowired
    public void setTasksRepository(TasksRepository tasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    @Autowired
    public void setTaskStatusService(TaskStatusService taskStatusService) {
        this.taskStatusService = taskStatusService;
    }

    @Autowired
    public void setTaskNotesService(TaskNotesService taskNotesService) {
        this.taskNotesService = taskNotesService;
    }

    public List<TasksDTO> searchTasks(TasksFilterDTO filter) {
        JpaSpecificationBuilder<Tasks> filterBuilder = new JpaSpecificationBuilder<Tasks>()
                .joinAndEqual("status", "id", filter.getStatusId())
                .joinAndEqual("executorMember", "id", filter.getExecutorId());

        if (StringUtils.isNotEmpty(filter.getSearchValue())) {
            String searchTerm = filter.getSearchValue();
            Map<String, String> searchTermMap = new HashMap<>();
            searchTermMap.put("title", searchTerm);
            searchTermMap.put("description", searchTerm);
            searchTermMap.put("tag", searchTerm);

            filterBuilder.orLike(searchTermMap);
        }

        return tasksRepository.findAll(filterBuilder.build())
                .stream()
                .map(this::convertToDTO)
                .toList();
    }


    public TasksDTO getTaskDTO(Long id) {
        return tasksRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
    }

    public Tasks getTask(Long id) {
        return tasksRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found"));
    }

    @Transactional
    public void createTask(Long teamId, CreateTaskDTO dto) {
        Teams team = teamsService.getTeamById(teamId);

        TeamMembers executorMember = null;
        if (!isNull(dto.getExecutorId())) {
            executorMember = teamMembersService.getTeamMemberById(dto.getExecutorId());
        }

        Users currentUser = currentSessionService.getCurrentUser();
        TeamMembers currentTeamMember = teamMembersService.getTeamMemberByTeamAndUser(team, currentUser);

        TaskStatus status = taskStatusService.getTaskStatus(dto.getStatusId());

        Tasks task = Tasks.builder()
                .executorMember(executorMember)
                .team(team)
                .title(dto.getTitle())
                .endDate(dto.getEndDate())
                .priority(dto.getPriority())
                .status(status)
                .tag(dto.getTag())
                .completed(status.getType().equals(TaskStatusType.DONE))
                .startDate(dto.getStartDate())
                .content(dto.getContent())
                .description(dto.getDescription())
                .createdMember(currentTeamMember)
                .build();

        tasksRepository.save(task);
    }

    public TasksDTO convertToDTO(Tasks task) {
        TaskStatus taskStatus = task.getStatus();
        TaskStatusDTO taskStatusDTO = TaskStatusDTO.builder()
                .tasks(null)
                .name(taskStatus.getName())
                .order(taskStatus.getOrder())
                .color(taskStatus.getColor())
                .id(taskStatus.getId())
                .type(taskStatus.getType())
                .build();

        TeamMembersDTO executorTeamMembersDTO = null;
        if (!isNull(task.getExecutorMember())) {
            executorTeamMembersDTO = teamMembersService.convertToDTO(task.getExecutorMember());
        }

        TeamMembersDTO createdTeamMemberDTO = teamMembersService.convertToDTO(task.getCreatedMember());

        long notesAmount = taskNotesService.countNotesByTaskId(task.getId());

        return TasksDTO.builder()
                .id(task.getId())
                .title(task.getTitle())
                .status(taskStatusDTO)
                .description(task.getDescription())
                .content(task.getContent())
                .priority(task.getPriority())
                .endDate(task.getEndDate())
                .startDate(task.getStartDate())
                .executorMember(executorTeamMembersDTO)
                .createdMember(createdTeamMemberDTO)
                .tag(task.getTag())
                .notesAmount(notesAmount)
                .completed(task.getCompleted())
                .build();
    }

    public void saveAll(List<Tasks> tasks) {
        tasksRepository.saveAll(tasks);
    }

    public void updateTask(Long taskId, UpdateTaskDTO dto) {
        Tasks task = getTask(taskId);

        if (dto.getTitle() != null) {
            task.setTitle(dto.getTitle());
        }
        if (dto.getContent() != null) {
            task.setContent(dto.getContent());
        }
        if (dto.getDescription() != null) {
            task.setDescription(dto.getDescription());
        }
        if (dto.getTag() != null) {
            task.setTag(dto.getTag());
        }
        if (dto.getEndDate() != null) {
            task.setEndDate(dto.getEndDate());
        }
        if (dto.getStartDate() != null) {
            task.setStartDate(dto.getStartDate());
        }
        if (dto.getPriority() != null) {
            task.setPriority(dto.getPriority());
        }
        if (dto.getStatusId() != null) {
            TaskStatus status = taskStatusService.getTaskStatus(dto.getStatusId());
            task.setStatus(status);
            task.setCompleted(status.getType().equals(TaskStatusType.DONE));
        }
        if (dto.getExecutorId() != null) {
            TeamMembers teamMember = teamMembersService.getTeamMemberById(dto.getExecutorId());
            task.setExecutorMember(teamMember);
        }

        tasksRepository.save(task);
    }

    public void deleteTask(Long taskId) {
        this.tasksRepository.deleteById(taskId);
    }

    public List<Tasks> findAllByTeamIn(List<Teams> teams) {
        return tasksRepository.findAllByTeamIn(teams);
    }
}
