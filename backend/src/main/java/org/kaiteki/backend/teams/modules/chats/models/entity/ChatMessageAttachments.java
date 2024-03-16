package org.kaiteki.backend.teams.modules.chats.models.entity;

import jakarta.persistence.Id;
import lombok.*;
import org.kaiteki.backend.teams.modules.chats.models.enums.ChatMessageAttachmentType;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "chat_messages_attachments")
public class ChatMessageAttachments {
    @Id
    private String id;

    @Field(value = "type")
    private ChatMessageAttachmentType type;

    @Field(value = "file_id")
    private Long fileId;

    @DBRef
    private ChatMessages message;
}
