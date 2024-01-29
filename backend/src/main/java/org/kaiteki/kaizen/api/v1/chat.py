import transformers, torch
from flask import Flask, request, jsonify

model_name = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
tokenizer = transformers.AutoTokenizer.from_pretrained(model_name)
model = transformers.AutoModelForCausalLM.from_pretrained(model_name)

app = Flask(__name__)

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

#Chat Endpoint
@app.route("/api/v1/chat", methods=["POST"])
def chat_api():
    user_input = request.json["prompt"]
    print(user_input)
    formatted_prompt = f"<|system|>\nYou are a chatbot who can help with anything!</s>\n<|user|>\n{user_input}</s>\n<|assistant|>\n"
    input_ids = tokenizer.encode(formatted_prompt, return_tensors="pt")             # Tokenize and convert to tensors

    # Optimize performance (optional, explore further for best results)
    with torch.no_grad():                                                           # Disable gradient calculation for inference
        response = model.generate(input_ids.to('cuda' if torch.cuda.is_available() else 'cpu'), max_length=1024)

    response_text = tokenizer.decode(response[0], skip_special_tokens=True).strip() # Decode and strip whitespace
    
    return jsonify({"response": response_text})                                     # Return formatted response                                   

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
