from pydantic import BaseModel


class Response(BaseModel):
    result: str | None

class Request(BaseModel):
    prompt: str

class TaskPrompt(BaseModel):
    title: str
    description: str