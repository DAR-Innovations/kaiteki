from datetime import datetime
from aiogram.utils import markdown

def format_task(task, index):
    return markdown.text(
        f"{index}) {markdown.bold(task.title)}\n",
        f"Opened: \t\t\t{markdown.italic(task.startDate.strftime('%Y/%m/%d, %H:%M'))}\n",
        f"Status: \t\t\t\t\t\t{task.status.name}\n",
        sep=''
    )

def format_meeting(meeting, index):
    return markdown.text(
        f"{index}) {markdown.bold(meeting.title)}\n",
        f"Opened: \t\t\t{markdown.italic(meeting.start.strftime('%Y/%m/%d, %H:%M'))}\n",
        f"Status: \t\t\t\t\t\t{meeting.status.value}\n",
        sep=''
    )
