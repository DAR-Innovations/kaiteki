from pydantic import BaseSettings, Field
from enum import Enum

class LogLevels(str, Enum):
    debug = "debug"
    info = "info"
    warning = "warning"
    error = "error"
    critical = "critical"


class UvicornSettings(BaseSettings):
    host: str
    port: int = Field(ge=0, le=65535)
    log_level: LogLevels
    reload: bool


class ApiConfigSettings(BaseSettings):
    title: str = ""
    description: str = ""
    version: str
    docs_url: str


class Settings(BaseSettings):
    uvicorn: UvicornSettings
    api_config: ApiConfigSettings