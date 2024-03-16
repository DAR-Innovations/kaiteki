package org.kaiteki.backend.chats.models.dto;

import lombok.Builder;
import lombok.Data;
import org.kaiteki.backend.chats.models.enums.ChatRoomsType;

import java.util.List;

@Data
@Builder
public class CreateChatRoomDTO {
    private String name;
    private ChatRoomsType type;
    private List<Long> teamMembersIds;
}
