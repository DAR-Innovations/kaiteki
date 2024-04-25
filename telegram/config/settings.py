import os

class Config:
    # TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
    TELEGRAM_BOT_TOKEN = "6649168246:AAHbEnhf6jr5io_P5Hq0j2xavHXY7wvMXrY"
    VALIDATION_URL = os.getenv("VALIDATION_URL")
    TASKS_API_URL = os.getenv("TASKS_API_URL")
    EVENTS_API_URL = os.getenv("EVENTS_API_URL")