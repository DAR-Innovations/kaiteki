package org.kaiteki.backend.kaizen.service;


import org.kaiteki.backend.kaizen.models.TextRequestDTO;
import org.languagetool.JLanguageTool;
import org.languagetool.language.AmericanEnglish;
import org.languagetool.rules.RuleMatch;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.List;

@Service
public class TextService {

    public String summarize(TextRequestDTO text) {
        //TODO: Implement Summa summarization logic
        return "Summarized text";
    }

    public String extractKeywords(TextRequestDTO text) {
        //TODO: Implement RAKE keyword extraction logic
        return "Keywords: keyword1, keyword2, ...";
    }

    public String paraphrase(TextRequestDTO text) {
        //TODO: Implement Simple-Transformers paraphrasing logic
        return "Paraphrased text";
    }

    public String checkGrammar(TextRequestDTO text) {
        JLanguageTool languageTool = new JLanguageTool(new AmericanEnglish());
        try {
            List<RuleMatch> matches = languageTool.check(text.getContent());
            if (matches.isEmpty()) {
                return "Grammar is correct";
            } else {
                // Return details about grammar issues
                return "Grammar issues found: " + matches;
            }
        } catch (IOException e) {
            e.printStackTrace();
            return "Error checking grammar";
        }
    }

    public String enhanceText(TextRequestDTO text) {
        //TODO: Implement text enhancement logic
        return "Enhanced Text!";
    }
}
