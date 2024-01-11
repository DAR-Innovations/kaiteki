package org.kaiteki.backend.chats.models.dto;

import lombok.Builder;
import lombok.Data;
import org.kaiteki.backend.chats.models.enums.ChatMessagesType;

@Data
@Builder
public class CreateMessageDTO {
    private String content;
    private ChatMessagesType type;
    private Long senderId;
}
