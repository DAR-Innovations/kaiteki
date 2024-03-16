import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline

# Load tokenizer and model once
model_id = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id, torch_dtype=torch.bfloat16)
device = "cuda" if torch.cuda.is_available() else "cpu"

pipe = pipeline("text-generation", model=model, tokenizer=tokenizer, device=device)

# Preprocess system intro message (run it once outside the function)
system_message = {
    "role": "system",
    "content": "You are a friendly chatbot assistant named Kaizen, you help employees to solve their tasks and questions",
}

def generate_response(message_str):
    user_message = {"role": "user", "content": message_str}
    messages = [system_message, user_message]

    prompt = tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
    outputs = pipe(prompt, max_new_tokens=128, do_sample=True, temperature=0.9, top_k=20, max_length=1024)

    return outputs[0]["generated_text"]


# import torch
# from transformers import AutoModelForCausalLM, AutoTokenizer

# # Load the pre-trained model and tokenizer
# model_name = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
# tokenizer = AutoTokenizer.from_pretrained(model_name)

# model = AutoModelForCausalLM.from_pretrained(model_name)

# # Set the device to use for inference
# device = "cuda" if torch.cuda.is_available() else "cpu"
# model = model.to(device)

# def generate_response(prompt):
#     input_ids = tokenizer.encode(prompt, return_tensors="pt").to(device)

#     with torch.no_grad():
#         output = model.generate(input_ids, max_length=1024, pad_token_id=tokenizer.eos_token_id)

#     response = tokenizer.decode(output[0], skip_special_tokens=True)

#     return response
