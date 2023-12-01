package org.kaiteki.backend.kaizen.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
public class ChatRequestDTO {
    private int user_id;
    private String conversation_id;
    private String message;
}
