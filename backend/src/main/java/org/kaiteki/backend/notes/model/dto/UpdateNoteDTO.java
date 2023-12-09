package org.kaiteki.backend.notes.model.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class UpdateNoteDTO {
    private String title;
    private String content;
}
