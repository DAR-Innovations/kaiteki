package org.kaiteki.backend.teams.modules.chats.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.teams.modules.chats.models.dto.*;
import org.kaiteki.backend.teams.modules.chats.services.ChatMessagesService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/v1/chats")
@RequiredArgsConstructor
public class ChatMessagesController {
    private final ChatMessagesService chatMessagesService;

    @GetMapping("/{chatRoomId}/messages")
    public List<ChatMessageDTO> getMessagesByChatRoomId(@PathVariable Long chatRoomId) {
        return chatMessagesService.getMessagesByChatRoomId(chatRoomId);
    }

    @DeleteMapping("/{teamId}/{chatRoomId}/messages/{messageId}")
    public void deleteMessage(@PathVariable Long teamId, @PathVariable Long chatRoomId, @PathVariable String messageId) {
        chatMessagesService.deleteMessage(teamId, chatRoomId, messageId);
    }

    @PutMapping("/{chatRoomId}/messages/{messageId}")
    public void updateMessage(@PathVariable Long chatRoomId,
                              @PathVariable String messageId,
                              @RequestBody UpdateMessageDTO dto) {
        chatMessagesService.updateMessage(chatRoomId, messageId, dto);
    }

    @PostMapping("/{chatRoomId}/messages/send")
    public void updateMessage(@PathVariable Long chatRoomId,
                              @RequestBody CreateMessageDTO dto) {
        chatMessagesService.sendMessage(chatRoomId, dto);
    }

    @PostMapping("/{teamId}/{chatRoomId}/messages/read")
    public void readAllMessages(@PathVariable Long teamId, @PathVariable Long chatRoomId) {
        chatMessagesService.readAllMessages(teamId, chatRoomId);
    }
}
