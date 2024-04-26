import asyncio
from aiogram import Bot, Dispatcher
from config.settings import Config
from bot.handlers import router, storage

TOKEN = Config.TELEGRAM_BOT_TOKEN

async def main():
    bot = Bot(token=TOKEN)
        
    dp = Dispatcher(storage=storage)
    dp.include_router(router)    
    
    print("Bot is up and running")
    await dp.start_polling(bot)

if __name__ == '__main__':
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        print("Bot stopped")
