import requests
from typing import List
from api.models.tasks import TasksDTO
from config.settings import Config

URL = Config.BASE_URL + "/api/v1/integrations/telegram/tasks"

def get_tasks(api_key: str) -> List[TasksDTO]:
    headers = {"Kaiteki-Integration-Key": api_key}
    
    response = requests.get(URL, headers=headers)
    
    if response.status_code == 200:
        tasks_data = response.json()
        tasks = []
        for task_data in tasks_data:
            task = TasksDTO(**task_data)
            tasks.append(task)
        return tasks
    else:
        print(f"Error getting tasks: {response.status_code}")
        return []