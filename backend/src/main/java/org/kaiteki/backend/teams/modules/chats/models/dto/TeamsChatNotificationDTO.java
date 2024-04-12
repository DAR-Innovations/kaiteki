package org.kaiteki.backend.teams.modules.chats.models.dto;

import lombok.Builder;
import lombok.Data;
import org.kaiteki.backend.teams.modules.chats.models.enums.TeamsChatNotificationType;

import java.time.ZonedDateTime;

@Data
@Builder
public class TeamsChatNotificationDTO {
    private Long teamId;
    private Long chatRoomId;
    private TeamsChatNotificationType type;
    private ZonedDateTime timestamp;
}
