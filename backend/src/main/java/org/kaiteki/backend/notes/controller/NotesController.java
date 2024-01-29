package org.kaiteki.backend.notes.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.notes.model.dto.CreateNoteDTO;
import org.kaiteki.backend.notes.model.dto.NotesDTO;
import org.kaiteki.backend.notes.model.dto.NotesFilterDTO;
import org.kaiteki.backend.notes.model.dto.UpdateNoteDTO;
import org.kaiteki.backend.notes.service.NotesService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/notes")
public class NotesController {
    private final NotesService notesService;

    @GetMapping("")
    public ResponseEntity<List<NotesDTO>> getNotes(NotesFilterDTO filter) {
        return ResponseEntity.ok(notesService.getNotes(filter));
    }

    @GetMapping("/{id}")
    public ResponseEntity<NotesDTO> getNoteById(@PathVariable Long id) {
        return ResponseEntity.ok(notesService.getNoteById(id));
    }

    @PostMapping("")
    public void createNote(@RequestBody CreateNoteDTO dto) {
        notesService.createNote(dto);
    }

    @PutMapping("/{id}")
    public void updateNote(@PathVariable Long id, @RequestBody UpdateNoteDTO dto) {
        notesService.updateNote(id, dto);
    }

    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable Long id) {
        notesService.deleteNote(id);
    }
}
