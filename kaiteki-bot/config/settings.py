import os

class Config:
    # TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
    BASE_URL = "http://localhost:8080/"
    TELEGRAM_BOT_TOKEN = "6649168246:AAHbEnhf6jr5io_P5Hq0j2xavHXY7wvMXrY"
    TASKS_ENDPOINT = "/api/v1/integrations/telegram/tasks"
    # TASKS_ENDPOINT = os.getenv("TASKS_ENDPOINT")
    MEETINGS_ENDPOINT = "/api/v1/integrations/telegram/meetings"
    # MEETINGS_ENDPOINT = os.getenv("MEETINGS_ENDPOINT")