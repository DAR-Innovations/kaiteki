package org.kaiteki.backend.teams.modules.chats.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.teams.modules.chats.models.dto.*;
import org.kaiteki.backend.teams.modules.chats.services.ChatRoomsService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
