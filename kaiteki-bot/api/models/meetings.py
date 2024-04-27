from datetime import datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class MeetingsStatus(Enum):
    SCHEDULED = "SCHEDULED"
    IN_PROGRESS = "IN_PROGRESS"
    CANCELLED = "CANCELLED"
    COMPLETED = "COMPLETED"

class MeetingsDTO(BaseModel):
    id: Optional[int] = Field(default=None, description="Unique identifier of the meeting")
    title: str = Field(description="Meeting title")
    description: str = Field(description="Meeting description")
    status: MeetingsStatus = Field(description="Meeting status")
    createdDate: Optional[datetime] = Field(default=None, description="Meeting creation date (UTC)")
    start: Optional[datetime] = Field(default=None, description="Meeting start date/time (UTC)")
    end: Optional[datetime] = Field(default=None, description="Meeting end date/time (UTC)")