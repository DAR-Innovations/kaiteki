from dataclasses import dataclass

@dataclass
class ResponseDTO:
    result: str

@dataclass
class RequestDTO:
    prompt: str