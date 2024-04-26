from datetime import datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


class TaskPriority(Enum):
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"
    
class TaskStatusType(Enum):
    OPEN = "OPEN"
    REGULAR = "REGULAR"
    DONE = "DONE"
    

class TaskStatusDTO(BaseModel):
    id: Optional[int] = Field(default=None, description="Unique identifier of the task status")
    name: str = Field(description="Name of the task status")
    color: str = Field(description="Color associated with the task status (hex code)")
    order: int = Field(description="Order of the task status (lower is higher priority)")
    type: TaskStatusType = Field(description="Type of the task status")		

class TasksDTO(BaseModel):
    id: Optional[int] = Field(default=None, description="Unique identifier of the task")
    title: str = Field(description="Title of the task")
    description: str = Field(description="Description of the task")
    content: str = Field(description="Task content")
    endDate: Optional[datetime] = Field(default=None, description="Task end date (UTC)")
    startDate: Optional[datetime] = Field(default=None, description="Task start date (UTC)")
    priority: TaskPriority = Field(description="Task priority")
    completed: bool = Field(default=False, description="Whether the task is completed")
    status: TaskStatusDTO = Field(description="Task status")
    tag: Optional[str] = Field(default=None, description="Task tag (optional)")
    notesAmount: int = Field(default=0, description="Number of notes associated with the task")