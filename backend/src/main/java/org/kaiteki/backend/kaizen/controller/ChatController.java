package org.kaiteki.backend.kaizen.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.kaizen.models.ChatRequestDTO;
import org.kaiteki.backend.kaizen.service.ChatService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/chat")
@RequiredArgsConstructor
public class ChatController {

    private ChatService chatService;

    @PostMapping
    public String chat(@RequestBody ChatRequestDTO input) {
        return chatService.processInput(input);
    }
}
