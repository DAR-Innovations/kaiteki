package org.kaiteki.backend.teams.modules.chats.models.dto;

import lombok.Builder;
import lombok.Data;
import org.kaiteki.backend.teams.modules.chats.models.enums.ChatMessagesType;

@Data
@Builder
public class CreateMessageDTO {
    private String content;
    private ChatMessagesType type;
    private Long senderId;
}
