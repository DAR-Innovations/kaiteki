package org.kaiteki.backend.tasks.service;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.auth.service.CurrentSessionService;
import org.kaiteki.backend.tasks.models.TaskStatus;
import org.kaiteki.backend.tasks.models.TaskStatusType;
import org.kaiteki.backend.tasks.models.Tasks;
import org.kaiteki.backend.tasks.models.dto.CreateTaskDTO;
import org.kaiteki.backend.tasks.models.dto.TaskStatusDTO;
import org.kaiteki.backend.tasks.models.dto.TasksDTO;
import org.kaiteki.backend.tasks.repository.TasksRepository;
import org.kaiteki.backend.teams.model.TeamMembers;
import org.kaiteki.backend.teams.model.Teams;
import org.kaiteki.backend.teams.model.dto.TeamMembersDTO;
import org.kaiteki.backend.teams.service.TeamMembersService;
import org.kaiteki.backend.teams.service.TeamsService;
import org.kaiteki.backend.users.models.Users;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static java.util.Objects.isNull;

@RequiredArgsConstructor
@Service
public class TasksService {
    private final TasksRepository tasksRepository;
    private final TeamsService teamsService;
    private final TeamMembersService teamMembersService;
    private final CurrentSessionService currentSessionService;
    private final TaskStatusService taskStatusService;

    public TasksDTO getTaskDTO(Long id) {
        return tasksRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    @Transactional
    public void createTask(Long teamId, CreateTaskDTO dto) {
        Teams team = teamsService.getTeam(teamId);

        TeamMembers executorMember = null;
        if (!isNull(dto.getExecutorId())) {
            executorMember = teamMembersService.getTeamMemberById(dto.getExecutorId());
        }

        Users currentUser = currentSessionService.getCurrentUser();
        TeamMembers currentTeamMember = teamMembersService.getTeamMemberByUserId(team, currentUser);

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
            executorTeamMembersDTO = teamMembersService.convertToTeamMembersDTO(task.getExecutorMember());
        }

        TeamMembersDTO createdTeamMemberDTO = teamMembersService.convertToTeamMembersDTO(task.getCreatedMember());;


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
                .completed(task.getCompleted())
                .build();
    }

    public List<Tasks> saveAll(List<Tasks> tasks) {
        return tasksRepository.saveAll(tasks);
    }
}
