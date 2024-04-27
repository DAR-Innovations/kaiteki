import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    TELEGRAM_BOT_TOKEN = os.getenv("TOKEN")
    BASE_URL = os.getenv("BASE_URL")
