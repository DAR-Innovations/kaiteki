package org.kaiteki.backend.chats.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.chats.models.dto.*;
import org.kaiteki.backend.chats.services.ChatRoomsService;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.awt.print.Pageable;
import java.util.List;

import static java.util.Objects.isNull;

@RestController
@RequestMapping("api/v1/chats")
@RequiredArgsConstructor
public class ChatsController {
    private final ChatRoomsService chatRoomsService;

    @GetMapping()
    public List<ChatRoomsDTO> getChatRooms(@RequestParam Long teamId, ChatRoomsFilter filter) {
        if (isNull(teamId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing teamId query parameter");
        }

        return chatRoomsService.getChatRooms(teamId, filter);
    }

    @GetMapping("/{chatRoomId}")
    public ChatRoomsDTO getChatRooms(@RequestParam Long teamId, @PathVariable Long chatRoomId) {
        if (isNull(teamId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing teamId query parameter");
        }

        return chatRoomsService.getChatRoomDTO(teamId, chatRoomId);
    }

    @GetMapping("/{chatRoomId}/messages")
    public List<ChatMessageDTO> getMessagesByChatRoomId(@PathVariable Long chatRoomId) {
        return chatRoomsService.getMessagesByChatRoomId(chatRoomId);
    }

    @DeleteMapping("/{chatRoomId}/messages/{messageId}")
    public void deleteMessage(@PathVariable Long chatRoomId, @PathVariable String messageId) {
        chatRoomsService.deleteMessage(chatRoomId, messageId);
    }

    @PutMapping("/{chatRoomId}/messages/{messageId}")
    public void updateMessage(@PathVariable Long chatRoomId,
                              @PathVariable String messageId,
                              @RequestBody UpdateMessageDTO dto) {
        chatRoomsService.updateMessage(chatRoomId, messageId, dto);
    }

    @PostMapping("/{chatRoomId}/messages/read")
    public void updateMessage(@PathVariable Long chatRoomId) {
        chatRoomsService.readAllMessages(chatRoomId);
    }

    @PutMapping("/{chatRoomId}")
    public void updateChatRooms(@RequestParam Long teamId,
                                @PathVariable Long chatRoomId,
                                @RequestBody UpdateChatRoomDTO dto) {
        if (isNull(teamId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing teamId query parameter");
        }

        chatRoomsService.updateChatRoom(teamId, chatRoomId, dto);
    }

    @DeleteMapping("/{chatRoomId}")
    public void deleteChatRoom(@RequestParam Long teamId, @PathVariable Long chatRoomId) {
        if (isNull(teamId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing teamId query parameter");
        }

        chatRoomsService.deleteChatRoom(teamId, chatRoomId);
    }

    @PostMapping()
    public void createChatRoom(@RequestParam Long teamId, @RequestBody CreateChatRoomDTO dto) {
        if (isNull(teamId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing teamId query parameter");
        }

        chatRoomsService.createChatRoom(teamId, dto);
    }
}
