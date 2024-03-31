package org.kaiteki.backend.teams.modules.chats.models.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UpdateChatRoomDTO {
    private String name;
    private List<Long> teamMembersIds;
}
