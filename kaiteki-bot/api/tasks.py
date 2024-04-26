from typing import List

import requests

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

    # Temporary solution
    # tasks.append(TasksDTO(1, "Write blog post", "Complete draft for marketing campaign", datetime(2024, 4, 10, 18, 0), datetime(2024, 4, 10, 15, 0), "High", False, "To Do", None, "Rama", "Marketing", 2))
    # tasks.append(TasksDTO(2, "Grocery shopping", "Buy milk, bread, and vegetables", datetime(2024, 4, 11, 19, 0), datetime(2024, 4, 11, 19, 0), "Medium", False, "To Do", None, "Rama", None, 0))
    # tasks.append(TasksDTO(3, "Review code changes", "Ensure quality and functionality", datetime(2024, 4, 12, 12, 0), datetime(2024, 4, 12, 10, 0), "High", True, "Completed", "John", "Rama", "Development", 1))
    # return tasks
