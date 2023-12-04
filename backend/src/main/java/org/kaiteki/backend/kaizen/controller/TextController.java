package org.kaiteki.backend.kaizen.controller;

import lombok.RequiredArgsConstructor;
import org.kaiteki.backend.kaizen.models.TextRequestDTO;
import org.kaiteki.backend.kaizen.service.TextService;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<String> summarize(@RequestBody TextRequestDTO text) {
        return ResponseEntity.ok(textService.summarize(text));
    }

    @PostMapping("/extract")
    public ResponseEntity<String> extractKeywords(@RequestBody TextRequestDTO text) {
        return ResponseEntity.ok(textService.extractKeywords(text));
    }

    @PostMapping("/paraphrase")
    public ResponseEntity<String> paraphrase(@RequestBody TextRequestDTO text) {
        return ResponseEntity.ok(textService.paraphrase(text));
    }

    @PostMapping("/grammar")
    public ResponseEntity<String> checkGrammar(@RequestBody TextRequestDTO text) {
        return ResponseEntity.ok(textService.checkGrammar(text));
    }

    @PostMapping("/enhance")
    public ResponseEntity<String> enhanceText(@RequestBody TextRequestDTO text) {
        return ResponseEntity.ok(textService.enhanceText(text));
    }
}
