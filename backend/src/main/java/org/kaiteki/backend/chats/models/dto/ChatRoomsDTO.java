package org.kaiteki.backend.chats.models.dto;

import lombok.Builder;
import lombok.Data;
import org.kaiteki.backend.chats.models.enums.ChatRoomsType;

@Data
@Builder
public class ChatRoomsDTO {
    private Long id;
    private String name;
    private ChatRoomsType type;
}
