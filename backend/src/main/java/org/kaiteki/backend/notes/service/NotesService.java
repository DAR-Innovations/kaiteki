package org.kaiteki.backend.notes.service;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.kaiteki.backend.auth.service.CurrentSessionService;
import org.kaiteki.backend.notes.model.Notes;
import org.kaiteki.backend.notes.model.dto.CreateNoteDTO;
import org.kaiteki.backend.notes.model.dto.NotesDTO;
import org.kaiteki.backend.notes.model.dto.NotesFilterDTO;
import org.kaiteki.backend.notes.model.dto.UpdateNoteDTO;
import org.kaiteki.backend.notes.repository.NotesRepository;
import org.kaiteki.backend.shared.utils.JpaSpecificationBuilder;
import org.kaiteki.backend.users.models.Users;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static java.util.Objects.nonNull;

@Service
@RequiredArgsConstructor
public class NotesService {
    private final CurrentSessionService currentSessionService;
    private final NotesRepository notesRepository;

    public List<NotesDTO> getNotes(NotesFilterDTO filterDTO) {
        Users user = currentSessionService.getCurrentUser()
                .orElseThrow(() -> new RuntimeException("No current user"));

        JpaSpecificationBuilder<Notes> filterBuilder = new JpaSpecificationBuilder<Notes>()
                .joinAndEqual("user", "id", user.getId());

        if (!StringUtils.isEmpty(filterDTO.getSearchValue())) {
            String searchValue = filterDTO.getSearchValue();

            Map<String, String> searchValueMap = new HashMap<>();
            searchValueMap.put("title", searchValue);
            searchValueMap.put("content", searchValue);

            filterBuilder.orLike(searchValueMap);
        }

        return notesRepository
                .findAll(filterBuilder.build())
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public NotesDTO getNoteById(Long id) {
        checkIfNoteBelongsToUser(id);

        return notesRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Note not found"));
    }
    public void updateNote(Long id, UpdateNoteDTO dto) {
        checkIfNoteBelongsToUser(id);

        Notes note = notesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found with id: " + id));

        if (nonNull(dto.getTitle())) {
            note.setTitle(dto.getTitle());
        }

        if (nonNull(dto.getContent())) {
            note.setContent(dto.getContent());
        }

        notesRepository.save(note);
    }

    public void createNote(CreateNoteDTO dto) {
        Users user = currentSessionService.getCurrentUser()
                .orElseThrow(() -> new RuntimeException("No current user"));

        Notes note = Notes.builder()
                .title(dto.getTitle())
                .createdAt(new Date())
                .user(user)
                .build();

        notesRepository.save(note);
    }

    public void deleteNote(Long id) {
        checkIfNoteBelongsToUser(id);
        this.notesRepository.deleteById(id);
    }

    private void checkIfNoteBelongsToUser(Long noteId) {
        Users user = currentSessionService.getCurrentUser()
                .orElseThrow(() -> new RuntimeException("No current user"));

        Notes note = notesRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found with id: " + noteId));

        if (!Objects.equals(user.getId(), note.getUser().getId())) {
            throw new RuntimeException("The note does not belong to current user");
        }
    }

    public NotesDTO convertToDTO(Notes note) {
        return NotesDTO
                .builder()
                .title(note.getTitle())
                .content(note.getContent())
                .createdAt(note.getCreatedAt())
                .id(note.getId())
                .build();
    }
}
