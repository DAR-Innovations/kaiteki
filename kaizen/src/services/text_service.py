from string import punctuation

import nltk
from nltk import FreqDist, sent_tokenize, word_tokenize
from nltk.corpus import stopwords

nltk.download("punkt")
nltk.download("stopwords")

stop_words = set(stopwords.words('english') + list(punctuation))


def summarize_text(text):
    sentences = sent_tokenize(text)
    words = word_tokenize(text)

    words = [word.lower() for word in words if word.isalnum()
             and word.lower() not in stop_words]

    sorted_sentences = sorted(sentences, key=lambda sentence: sum(
        FreqDist(words)[word] for word in word_tokenize(sentence)))

    return " ".join(sorted_sentences[-3:])


def extract_keywords(text):
    words = word_tokenize(text.lower())

    filtered_words = [word for word in words if word not in stop_words]

    keywords = FreqDist(filtered_words).most_common(5)

    return ", ".join(keyword[0] for keyword in keywords)
