package org.kaiteki.backend.chats.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.chats.models.dto.CreateMessageDTO;
import org.kaiteki.backend.chats.services.ChatRoomsService;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class ChatsSocketController {
    private final ChatRoomsService chatRoomsService;

    @MessageMapping("/chat/{chatRoomId}/message/send")
    public void sendMessage(@DestinationVariable Long chatRoomId, CreateMessageDTO createDto) {
        chatRoomsService.sendMessage(chatRoomId, createDto);
    }

    @SubscribeMapping("/queue/chat/{chatRoomId}/messages")
    public void getRealtimeMessages() {}
}
