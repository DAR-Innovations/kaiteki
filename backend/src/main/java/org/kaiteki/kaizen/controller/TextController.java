package org.kaiteki.kaizen.controller;

import org.kaiteki.kaizen.service.TextService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/text")
public class TextController {

    @Autowired
    private TextService textService;

    @PostMapping("/summarize")
    public String summarize(@RequestBody String text) {
        return textService.summarize(text);
    }

    @PostMapping("/extract")
    public String extractKeywords(@RequestBody String text) {
        return textService.extractKeywords(text);
    }

    @PostMapping("/paraphrase")
    public String paraphrase(@RequestBody String text) {
        return textService.paraphrase(text);
    }

    @PostMapping("/grammar")
    public String checkGrammar(@RequestBody String text) {
        return textService.checkGrammar(text);
    }

    @PostMapping("/enhance")
    public String enhanceText(@RequestBody String text) {
        return textService.enhanceText(text);
    }
}
