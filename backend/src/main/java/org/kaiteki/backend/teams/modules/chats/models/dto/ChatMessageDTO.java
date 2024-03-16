package org.kaiteki.backend.teams.modules.chats.models.dto;

import lombok.Builder;
import lombok.Data;
import org.kaiteki.backend.teams.modules.chats.models.enums.ChatMessageStatus;
import org.kaiteki.backend.teams.modules.chats.models.enums.ChatMessagesEventType;
import org.kaiteki.backend.teams.modules.chats.models.enums.ChatMessagesType;

import java.time.ZonedDateTime;

@Data
@Builder
public class ChatMessageDTO {
    private String id;
    private String content;
    private ChatMessageStatus status;
    private ChatMessagesType messageType;
    private ChatMessagesEventType eventType;
    private ZonedDateTime sentDate;
    private Long senderId;
    private String senderFullName;
}
