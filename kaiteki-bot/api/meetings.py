import requests
from config.settings import Config
from typing import List
from datetime import datetime

from typing import Optional, Set

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

def get_meetings(api_key: str) -> List[MeetingsDTO]:
    headers = {"Kaiteki-Integration-Key": api_key}
    response = requests.get(Config.MEETINGS_API_URL, headers=headers)
    
    if response.status_code == 200:
        meetings_data = response.json()
        meetings = []
        for meeting_data in meetings_data:
            meeting = MeetingsDTO(**meeting_data)
            meetings.append(meeting)
        return meetings
    else:
        print(f"Error getting meetings: {response.status_code}")
        return []

