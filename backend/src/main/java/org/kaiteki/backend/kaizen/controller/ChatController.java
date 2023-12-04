package org.kaiteki.backend.kaizen.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.kaizen.models.ChatRequestDTO;
import org.kaiteki.backend.kaizen.service.ChatService;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> chat(@RequestBody ChatRequestDTO input) {
        return ResponseEntity.ok(chatService.processInput(input));
    }
}
