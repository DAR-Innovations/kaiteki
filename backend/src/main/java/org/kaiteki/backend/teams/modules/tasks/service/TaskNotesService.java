package org.kaiteki.backend.teams.modules.tasks.service;

import org.kaiteki.backend.auth.service.CurrentSessionService;
import org.kaiteki.backend.shared.utils.JpaSpecificationBuilder;
import org.kaiteki.backend.shared.utils.UserFormattingUtils;
import org.kaiteki.backend.teams.model.entity.TeamMembers;
import org.kaiteki.backend.teams.modules.tasks.models.dto.CreateTaskNoteDTO;
import org.kaiteki.backend.teams.modules.tasks.models.dto.TaskNotesDTO;
import org.kaiteki.backend.teams.modules.tasks.models.entity.TaskNotes;
import org.kaiteki.backend.teams.modules.tasks.models.entity.Tasks;
import org.kaiteki.backend.teams.modules.tasks.repository.TaskNotesRepository;
import org.kaiteki.backend.teams.service.TeamMembersService;
import org.kaiteki.backend.users.models.enitities.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;
import java.util.List;

@Service
public class TaskNotesService {
    private TaskNotesRepository taskNotesRepository;
    private CurrentSessionService currentSessionService;
    private TeamMembersService teamMembersService;
    private TasksService tasksService;

    @Autowired
    public void setTasksService(TasksService tasksService) {
        this.tasksService = tasksService;
    }

    @Autowired
    public void setTaskNotesRepository(TaskNotesRepository taskNotesRepository) {
        this.taskNotesRepository = taskNotesRepository;
    }

    @Autowired
    public void setTeamMembersService(TeamMembersService teamMembersService) {
        this.teamMembersService = teamMembersService;
    }

    @Autowired
    public void setCurrentSessionService(CurrentSessionService currentSessionService) {
        this.currentSessionService = currentSessionService;
    }

    public TaskNotes getTaskNote(Long id) {
        return taskNotesRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND ,"Task note not found"));
    }

    public List<TaskNotesDTO> getTaskNotesByTaskId(Long taskId) {
        JpaSpecificationBuilder<TaskNotes> filterBuilder = new JpaSpecificationBuilder<TaskNotes>()
                .orderBy("createdDate", Sort.Direction.DESC)
                .joinAndEqual("task", "id", taskId);

        return taskNotesRepository.findAll(filterBuilder.build())
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public long countNotesByTaskId(Long taskId) {
        JpaSpecificationBuilder<TaskNotes> filterBuilder = new JpaSpecificationBuilder<TaskNotes>()
                .joinAndEqual("task", "id", taskId);

        return taskNotesRepository.count(filterBuilder.build());
    }

    @Transactional
    public void createTaskNote(CreateTaskNoteDTO dto) {
       Users currentUser = currentSessionService.getCurrentUser();
       Tasks task = tasksService.getTask(dto.getTaskId());
       TeamMembers teamMember = teamMembersService.getTeamMemberByTeamAndUser(dto.getTeamId(), currentUser.getId());

       TaskNotes taskNote = TaskNotes.builder()
               .task(task)
               .content(dto.getContent())
               .createdDate(ZonedDateTime.now())
               .teamMember(teamMember)
               .build();

       taskNotesRepository.save(taskNote);
    }

    private TaskNotesDTO convertToDTO(TaskNotes taskNote) {
        TeamMembers teamMember = taskNote.getTeamMember();
        Users user = teamMember.getUser();
        String fullName = UserFormattingUtils.getFullName(user);

        return TaskNotesDTO.builder()
                .id(taskNote.getId())
                .authorFullName(fullName)
                .content(taskNote.getContent())
                .createdDate(taskNote.getCreatedDate())
                .teamMemberId(teamMember.getId())
                .build();
    }

    @Transactional
    public void deleteTaskNote(Long noteId) {
        Users currentUser = currentSessionService.getCurrentUser();
        TaskNotes taskNote = getTaskNote(noteId);

        TeamMembers noteAuthorTeamMember = taskNote.getTeamMember();
        Users noteAuthorUser = noteAuthorTeamMember.getUser();

        if (!noteAuthorUser.getId().equals(currentUser.getId())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "The note author is not the current user");
        }

        taskNotesRepository.deleteById(taskNote.getId());
    }
}
