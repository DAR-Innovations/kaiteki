from pydantic import BaseModel

class Response(BaseModel):
    result: str

class Request(BaseModel):
    prompt: str