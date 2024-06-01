from pydantic import BaseModel


class Response(BaseModel):
    result: str | None

class Request(BaseModel):
    prompt: str