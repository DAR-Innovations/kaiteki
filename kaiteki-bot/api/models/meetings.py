from typing import Optional, Set
from datetime import datetime

class TeamMembersDTO:
    def __init__(self,
                 id: Optional[int] = None,
                 full_name: str = "",
                 shorten_full_name: str = "",
                 firstname: str = "",
                 lastname: str = "",
                 email: str = "",
                 position: str = "",
                 joined_date: Optional[datetime] = None,
                 performance: Optional[float] = None):  # BigDecimal -> float
        self.id = id
        self.full_name = full_name
        self.shorten_full_name = shorten_full_name
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.position = position
        self.joined_date = joined_date
        self.performance = performance
        
class MeetingsDTO:
    def __init__(self,
                 id: Optional[int] = None,
                 title: str = "",
                 description: str = "",
                 status: Optional[str] = None,
                 invited_members: Optional[Set[TeamMembersDTO]] = None,
                 created_member: Optional[TeamMembersDTO] = None,
                 created_date: Optional[datetime] = None,
                 start: datetime = None,
                 end: datetime = None):
        self.id = id
        self.title = title
        self.description = description
        self.status = status
        self.invited_members = invited_members
        self.created_member = created_member
        self.created_date = created_date
        self.start = start
        self.end = end

class TasksDTO:
    def __init__(self, id, title, description, endDate, startDate, priority, completed, status, executorMember, createdMember, tag, notesAmount):
        self.id = id
        self.title = title
        self.description = description
        self.endDate = endDate
        self.startDate = startDate
        self.priority = priority
        self.completed = completed
        self.status = status
        self.executorMember = executorMember
        self.createdMember = createdMember
        self.tag = tag
        self.notesAmount = notesAmount