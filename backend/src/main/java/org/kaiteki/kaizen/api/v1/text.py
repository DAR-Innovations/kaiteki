from flask import Flask, request, jsonify
from nltk import sent_tokenize, word_tokenize, FreqDist
from nltk.corpus import stopwords
from nltk.tokenize.treebank import TreebankWordDetokenizer
import nltk

app = Flask(__name__)

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

#CORS Handler
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')  # Allow Content-Type header
    return response

#Healthcheck route
@app.route("/", methods=["GET"])
def healthcheck():
     return "API is running"

#Summarize route
@app.route('/api/v1/text/summarize', methods=['POST'])
def summarize_text_route():
    data = request.get_json()
    text = data['text']
    
    summary = summarize_text(text)
    
    return jsonify({'summary': summary})

#Keywords route
@app.route('/api/v1/text/extract', methods=['POST'])
def extract_keywords_route():
    data = request.get_json()
    text = data['text']
    
    keywords = extract_keywords(text)
    
    return jsonify({'keywords': keywords})

if __name__ == '__main__':
    app.run(debug=True)
