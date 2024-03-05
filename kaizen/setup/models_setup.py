# non-streaming.py
from transformers import AutoTokenizer, AutoModelForCausalLM

model_path = 'TinyLlama/TinyLlama-1.1B-Chat-v1.0'

model = AutoModelForCausalLM.from_pretrained(model_path)
tokenizer = AutoTokenizer.from_pretrained(model_path)