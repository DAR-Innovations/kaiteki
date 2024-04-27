import requests
from typing import List
from api.models.meetings import MeetingsDTO
from config.settings import Config

URL = Config.BASE_URL + "/api/v1/integrations/telegram/meetings"

def get_meetings(api_key: str) -> List[MeetingsDTO]:
    headers = {"Kaiteki-Integration-Key": api_key}
    
    response = requests.get(URL, headers=headers)
    
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

