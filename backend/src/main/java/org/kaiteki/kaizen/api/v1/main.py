from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from controllers.chat_ctrl import generate_response
from controllers.text_ctrl import summarize_text, extract_keywords
from models.dto import RequestDTO, ResponseDTO

app = FastAPI()

# Enable CORS
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Healthcheck route
@app.get("/")
def healthcheck():
    return {"message": "API is running"}

# Chat Endpoint
@app.post("/api/v1/chat")
def chat_api(prompt: RequestDTO):
    response_text = generate_response(prompt.prompt)
    return ResponseDTO(response_text)

# Summarize route
@app.post("/api/v1/text/summarize")
def summarize_text_route(prompt: RequestDTO):
    summary = summarize_text(prompt.prompt)
    return ResponseDTO(summary)

# Keywords route
@app.post("/api/v1/text/extract")
def extract_keywords_route(prompt: RequestDTO):
    keywords = extract_keywords(prompt.prompt)
    return ResponseDTO(keywords)


