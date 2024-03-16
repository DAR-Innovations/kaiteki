package org.kaiteki.backend.teams.modules.chats.models.dto;

import lombok.Builder;
import lombok.Data;
import org.kaiteki.backend.teams.modules.chats.models.enums.ChatRoomsType;

import java.time.ZonedDateTime;
import java.util.List;

@Data
@Builder
public class ChatRoomsDTO {
    private Long id;
    private String name;
    private ChatRoomsType type;
    private Long iconId;
    private int size;
    private String lastMessageContent;
    private ZonedDateTime lastMessageDate;
    private List<Long> membersIds;
}
