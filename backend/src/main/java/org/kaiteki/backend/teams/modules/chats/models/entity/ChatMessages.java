package org.kaiteki.backend.teams.modules.chats.models.entity;

import jakarta.persistence.Id;
import lombok.*;
import org.kaiteki.backend.teams.modules.chats.models.enums.ChatMessageStatus;
import org.kaiteki.backend.teams.modules.chats.models.enums.ChatMessagesType;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.ZonedDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "chat_messages")
public class ChatMessages {
    @Id
    private String id;

    @Field(value = "content")
    private String content;

    // Team Member
    @Field(value = "sender_id")
    private Long senderId;

    @Field(value = "chat_id")
    private Long chatId;

    @Field(value = "sent_date")
    private ZonedDateTime sentDate;

    @Field(value = "type")
    private ChatMessagesType type;

    @Field(value = "status")
    private ChatMessageStatus status;

    @DBRef
    private List<ChatMessageAttachments> attachments;
}
