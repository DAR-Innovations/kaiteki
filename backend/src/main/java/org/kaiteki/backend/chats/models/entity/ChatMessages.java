package org.kaiteki.backend.chats.models.entity;

import jakarta.persistence.Id;
import lombok.*;
import org.kaiteki.backend.chats.models.enums.ChatMessagesType;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.Set;

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

    @Field(value = "sender_id")
    private Long senderId;

    @Field(value = "chat_id")
    private Long chatId;

    @Field(value = "sent_date")
    private LocalDateTime sentDate;

    @Field(value = "type")
    private ChatMessagesType type;

    @DBRef
    private Set<ChatMessageAttachments> attachments;
}
