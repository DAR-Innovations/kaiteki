package org.kaiteki.backend.kaizen.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TextRequestDTO {
    private int user_id;
    private String content;
}
