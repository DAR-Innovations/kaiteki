package org.kaiteki.backend.kaizen.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.kaizen.models.TextRequestDTO;
import org.kaiteki.backend.kaizen.service.TextService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/text")
@RequiredArgsConstructor
public class TextController {

    private TextService textService;

    @PostMapping("/summarize")
    public String summarize(@RequestBody TextRequestDTO text) {
        return textService.summarize(text);
    }

    @PostMapping("/extract")
    public String extractKeywords(@RequestBody TextRequestDTO text) {
        return textService.extractKeywords(text);
    }

    @PostMapping("/paraphrase")
    public String paraphrase(@RequestBody TextRequestDTO text) {
        return textService.paraphrase(text);
    }

    @PostMapping("/grammar")
    public String checkGrammar(@RequestBody TextRequestDTO text) {
        return textService.checkGrammar(text);
    }

    @PostMapping("/enhance")
    public String enhanceText(@RequestBody TextRequestDTO text) {
        return textService.enhanceText(text);
    }
}
