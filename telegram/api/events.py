import requests
from config.settings import Config
from typing import List
from datetime import datetime

class EventsDTO:
    def __init__(self, id, title, description, start, end, type):
        self.id = id
        self.title = title
        self.description = description
        self.start = start
        self.end = end
        self.type = type

def get_events(api_key = '') -> List[EventsDTO]:
    # response = requests.get(Config.EVENTS_API_URL)
    # events_data = response.json()
    events = []
    # for event_data in events_data:
    #     event = EventsDTO(**event_data)
    #     events.append(event)

    # Temporary solution
    events.append(EventsDTO(1, "Meeting with client", "Discuss project details", datetime(2024, 4, 12, 10, 0), datetime(2024, 4, 12, 11, 0), "Business"))
    events.append(EventsDTO(2, "Birthday party", "Celebrate John's birthday", datetime(2024, 4, 15, 19, 0), datetime(2024, 4, 16, 1, 0), "Personal"))
    events.append(EventsDTO(3, "Gym session", "Maintain fitness routine", datetime(2024, 4, 16, 18, 0), datetime(2024, 4, 16, 19, 0), "Health"))

    return events
