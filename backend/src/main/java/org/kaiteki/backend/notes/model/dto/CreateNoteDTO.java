package org.kaiteki.backend.notes.model.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class CreateNoteDTO {
    private String title;
}
