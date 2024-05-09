import transformers
import torch

model_name = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
tokenizer = transformers.AutoTokenizer.from_pretrained(model_name)
model = transformers.AutoModelForCausalLM.from_pretrained(model_name)

config = model.config

config.hidden_size = 1024
config.num_attention_heads = 8
config.num_hidden_layers = 16

device = 'cuda' if torch.cuda.is_available() else 'cpu'
model.to(device)

def generate_response(prompt):
    formatted_prompt =  f"<|system|>\nYou are a chatbot named Kaizen who can help with anything!</s>\n<|user|>\n{prompt}</s>\n<|assistant|>\n"
    input_ids = tokenizer.encode(formatted_prompt, return_tensors="pt").to(device)

    token_count = len(tokenizer.tokenize(formatted_prompt))

    response_length = 128  # Default response length
    if token_count > 128:
        response_length = 256
    if token_count > 256:
        response_length = 512
    if token_count > 512:
        response_length = 1024

    # Optimize performance (optional, explore further for best results)
    with torch.no_grad():
        response = model.generate(input_ids, max_length=response_length)  # Adjust the max_length based on your requirements

    response_text = tokenizer.decode(response[0], skip_special_tokens=True).strip()
    
    return response_text

def continue_prompt(prompt):
    formatted_prompt = f"<|system|>\nYou are a chatbot named Kaizen who can help with anything!</s>\n<|user|>\nComplete this text: {prompt}</s>\n<|assistant|>\n"
    input_ids = tokenizer.encode(formatted_prompt, return_tensors="pt").to(device)

    with torch.no_grad():
        response = model.generate(input_ids,
                                max_new_tokens=256,
                                do_sample=True,
                                temperature=0.7,
                                top_k=50,
                                top_p=0.95,
                                ) 

    response_text = tokenizer.decode(response[0], skip_special_tokens=True).strip()
    
    return response_text