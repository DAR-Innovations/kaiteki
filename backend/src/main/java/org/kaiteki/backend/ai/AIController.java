package org.kaiteki.backend.ai;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/ai")
public class AIController {
    private final AIService aiService;


    @PostMapping("/chat")
    public String processText(@RequestBody AIChatRequest dto) {
        return aiService.processText(dto.getText());
    }
}
