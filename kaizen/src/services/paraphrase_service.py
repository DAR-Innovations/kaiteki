import nltk
from nltk.corpus import wordnet
from nltk.tokenize import word_tokenize, sent_tokenize
import random

nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')

def get_synonyms(word):
    synonyms = set()
    for syn in wordnet.synsets(word):
        for lemma in syn.lemmas():
            synonym = lemma.name().replace('_', ' ')
            synonyms.add(synonym)
    return list(synonyms)

def paraphrase_sentence(sentence):
    words = word_tokenize(sentence)
    paraphrased_words = []
    for word in words:
        synonyms = get_synonyms(word)
        if synonyms:
            # Choose synonym that maintains the same part of speech
            pos_tag = nltk.pos_tag([word])[0][1][0].lower()
            synonyms_same_pos = [syn for syn in synonyms if nltk.pos_tag([syn])[0][1][0].lower() == pos_tag]
            if synonyms_same_pos:
                paraphrased_word = random.choice(synonyms_same_pos)
                paraphrased_words.append(paraphrased_word)
            else:
                paraphrased_words.append(word)
        else:
            paraphrased_words.append(word)
    return ' '.join(paraphrased_words)

def paraphrase_text(text):
    sentences = sent_tokenize(text)
    paraphrased_sentences = [paraphrase_sentence(sentence) for sentence in sentences]
    return ' '.join(paraphrased_sentences)
