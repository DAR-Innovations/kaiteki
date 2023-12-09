package org.kaiteki.backend.notes.model.dto;

import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class NotesFilterDTO {
    private String searchValue;
}
