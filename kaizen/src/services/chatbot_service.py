import transformers
import torch

model_name = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
tokenizer = transformers.AutoTokenizer.from_pretrained(model_name)
model = transformers.AutoModelForCausalLM.from_pretrained(model_name)

def generate_response(prompt):
    formatted_prompt = f"<|system|>\nYou are a chatbot who can help with anything!</s>\n<|user|>\n{prompt}</s>\n<|assistant|>\n"
    input_ids = tokenizer.encode(formatted_prompt, return_tensors="pt")             # Tokenize and convert to tensors

    # Optimize performance (optional, explore further for best results)
    with torch.no_grad():                                                           # Disable gradient calculation for inference
        response = model.generate(input_ids.to('cuda' if torch.cuda.is_available() else 'cpu'), max_length=1024)

    response_text = tokenizer.decode(response[0], skip_special_tokens=True).strip() # Decode and strip whitespace
    
    return response_text