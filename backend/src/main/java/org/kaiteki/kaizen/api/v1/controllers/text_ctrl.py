from nltk import sent_tokenize, word_tokenize, FreqDist
from nltk.corpus import stopwords
from nltk.tokenize.treebank import TreebankWordDetokenizer
import nltk

nltk.download("punkt")
nltk.download("stopwords")

stop_words = set(stopwords.words("english"))

def summarize_text(text):
    sentences = sent_tokenize(text)
    words = word_tokenize(text)

    # Remove stopwords
    words = [word.lower() for word in words if word.isalnum() and word.lower() not in stop_words]

    # Calculate word frequency
    freq_dist = FreqDist(words)

    # Sort sentences based on the sum of word frequencies
    sorted_sentences = sorted(sentences, key=lambda sentence: sum(freq_dist[word] for word in word_tokenize(sentence)))

    # Take the top 3 sentences as the summary
    summary = " ".join(sorted_sentences[-3:])
    
    return summary

def extract_keywords(text):
    words = word_tokenize(text)
    keywords = [word.lower() for word in words if word.isalnum() and word.lower() not in stop_words]
    
    return keywords