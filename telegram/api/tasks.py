import requests
from config.settings import Config
from typing import List
from datetime import datetime

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

def get_tasks(api_key: str) -> List[TasksDTO]:
    # response = requests.get(Config.TASKS_API_URL)
    # tasks_data = response.json()
    tasks = []
    # for task_data in tasks_data:
    #     task = TasksDTO(**task_data)
    #     tasks.append(task)

    # Temporary solution
    tasks.append(TasksDTO(1, "Write blog post", "Complete draft for marketing campaign", datetime(2024, 4, 10, 18, 0), datetime(2024, 4, 10, 15, 0), "High", False, "To Do", None, "Rama", "Marketing", 2))
    tasks.append(TasksDTO(2, "Grocery shopping", "Buy milk, bread, and vegetables", datetime(2024, 4, 11, 19, 0), datetime(2024, 4, 11, 19, 0), "Medium", False, "To Do", None, "Rama", None, 0))
    tasks.append(TasksDTO(3, "Review code changes", "Ensure quality and functionality", datetime(2024, 4, 12, 12, 0), datetime(2024, 4, 12, 10, 0), "High", True, "Completed", "John", "Rama", "Development", 1))

    return tasks
