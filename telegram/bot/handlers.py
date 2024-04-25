from aiogram import Router, F
from aiogram.filters import Command, CommandStart
from aiogram.types import Message, CallbackQuery

from aiogram.fsm.state import State, StatesGroup
from aiogram.fsm.context import FSMContext
from aiogram.fsm.storage.memory import MemoryStorage

from aiogram.utils import markdown
from aiogram.enums import ParseMode

from config.settings import Config
from api.tasks import get_tasks
from api.events import get_events

import bot.keyboards as kb

router = Router()
storage = MemoryStorage()

class Token(StatesGroup):
    api_key = State()

@router.message(CommandStart())
async def start(message: Message, state: FSMContext):
    await state.set_state(Token.api_key)
    await message.answer("Greetings! Please send your Kaiteki API KEY")

@router.message(Command("refresh"))
async def refresh(message: Message, state: FSMContext):
    await state.set_state(Token.api_key)
    await message.answer("Please send your Kaiteki API KEY")

@router.message(Token.api_key)
async def validation(message: Message, state: FSMContext):
    await state.update_data(api_key=message.text)
    await storage.set_data("keys", {"api_key": message.text})
    await message.reply("Welcome, I'm Kaiteki Helper Bot. Here is main functionality:", reply_markup=kb.options)
    await state.clear()
    await message.delete()

@router.callback_query(F.data == 'main')
async def main_menu(callback: CallbackQuery):
    await callback.answer('')
    await callback.message.delete()

@router.message(Command('tasks'))
async def tasks(message: Message):
    keys_dict = await storage.get_data("keys")
    
    if keys_dict:
        tasks = get_tasks(keys_dict["api_key"])
    else:
        await message.reply("It seems Kaiteki API_Key is missing, send '/refresh' to refresh it", reply_markup=kb.refresh)
        return

    if tasks:
        formatted_tasks = []
        for task in tasks:
            formatted_task = markdown.text(
            f"Task: \t\t\t\t\t\t\t\t{markdown.bold(task.title)}\n",
            f"Opened: \t\t\t{markdown.italic(task.startDate.strftime('%Y/%m/%d, %H:%M'))}\n",  
            f"Status: \t\t\t\t\t\t{task.status}\n"
            , sep='')
            formatted_tasks.append(formatted_task)

        await message.reply("\n".join(formatted_tasks), parse_mode=ParseMode.MARKDOWN, reply_markup=kb.tasks)
    else:
        await message.reply("No tasks available.", reply_markup=kb.tasks)

@router.callback_query(F.data == 'tasks')
async def posts(callback: CallbackQuery):
    await callback.answer('')
    
    keys_dict = await storage.get_data("keys")

    if keys_dict:
        tasks = get_tasks(keys_dict["api_key"])
    else:
        await callback.message.answer("It seems Kaiteki API_Key is missing, send '/refresh' to refresh it", reply_markup=kb.refresh)
        return
   
    if tasks:
        formatted_tasks = []
        for task in tasks:
            formatted_task = markdown.text(
            f"Task: \t\t\t\t\t\t\t\t{markdown.bold(task.title)}\n",
            f"Opened: \t\t\t{markdown.italic(task.startDate.strftime('%Y/%m/%d, %H:%M'))}\n",  
            f"Status: \t\t\t\t\t\t{task.status}\n"
            , sep='')
            formatted_tasks.append(formatted_task)

        await callback.message.answer("\n".join(formatted_tasks), parse_mode=ParseMode.MARKDOWN, reply_markup=kb.tasks)
    else:
        await callback.message.answer("No tasks available.", reply_markup=kb.tasks)

@router.message(Command('events'))
async def events(message: Message):
    events = get_events()
    
    if events:
        events_str = "\n".join(event.title for event in events)
        await message.reply(f"Events:\n{events_str}", reply_markup=kb.events)
    else:
        await message.reply("No events available.", reply_markup=kb.events)

@router.callback_query(F.data == 'events')
async def events(callback: CallbackQuery):
    await callback.answer('')

    events = get_events()
    
    if events:
        events_str = "\n".join(event.title for event in events)
        await callback.message.answer(f"Events:\n{events_str}", reply_markup=kb.events)
    else:
        await callback.message.answer("No events available.", reply_markup=kb.events)
