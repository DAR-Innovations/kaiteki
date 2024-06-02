import nltk
from nltk import FreqDist, sent_tokenize, word_tokenize
from nltk.corpus import stopwords

nltk.download("punkt")
nltk.download("stopwords")

stop_words = set(stopwords.words("english"))


def summarize_text(text):
    sentences = sent_tokenize(text)
    words = word_tokenize(text)

    words = [word.lower() for word in words if word.isalnum()
             and word.lower() not in stop_words]

    freq_dist = FreqDist(words)

    sorted_sentences = sorted(sentences, key=lambda sentence: sum(
        freq_dist[word] for word in word_tokenize(sentence)))

    summary = " ".join(sorted_sentences[-3:])

    return summary


def extract_keywords(text):
    words = word_tokenize(text)
    keywords = [word.lower() for word in words if word.isalnum()
                and word.lower() not in stop_words]
    return ', '.join(keywords)
