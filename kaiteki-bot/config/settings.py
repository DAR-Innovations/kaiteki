import os

class Config:
    TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
    BASE_URL = "http://localhost:8080"
    # TELEGRAM_BOT_TOKEN = "6649168246:AAHbEnhf6jr5io_P5Hq0j2xavHXY7wvMXrY"