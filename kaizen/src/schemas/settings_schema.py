from pydantic import BaseModel, Field
from enum import Enum

class LogLevels(str, Enum):
    debug = "debug"
    info = "info"
    warning = "warning"
    error = "error"
    critical = "critical"


class UvicornSettings(BaseModel):
    host: str
    port: int = Field(ge=0, le=65535)
    log_level: LogLevels
    reload: bool


class ApiConfigSettings(BaseModel):
    title: str = ""
    description: str = ""
    version: str
    docs_url: str


class Settings(BaseModel):
    uvicorn: UvicornSettings
    api_config: ApiConfigSettings