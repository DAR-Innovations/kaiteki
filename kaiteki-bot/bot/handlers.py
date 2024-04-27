from aiogram import Router, F
from aiogram.enums import ParseMode
from aiogram.filters import Command, CommandStart
from aiogram.types import Message, CallbackQuery

from aiogram.fsm.state import State, StatesGroup
from aiogram.fsm.context import FSMContext
from aiogram.fsm.storage.memory import MemoryStorage
from aiogram.types import CallbackQuery, Message

from bot.utils import format_meeting, format_task
import bot.keyboards as kb
from api.meetings import get_meetings
from api.tasks import get_tasks

router = Router()
storage = MemoryStorage()

class Token(StatesGroup):
    api_key = State()

@router.message(CommandStart())
async def start(message: Message, state: FSMContext):
    await state.set_state(Token.api_key)
    response = await message.answer("Greetings! Please send your Kaiteki API KEY")
    await state.update_data(start_message_id=message.message_id)
    await state.update_data(prompt_message_id=response.message_id)

@router.message(Command("refresh"))
async def refresh(message: Message, state: FSMContext):
    await state.set_state(Token.api_key)
    response = await message.answer("Please send your Kaiteki API KEY")
    await state.update_data(refresh_message_id=message.message_id)
    await state.update_data(prompt_message_id=response.message_id)

@router.message(Token.api_key)
async def validation(message: Message, state: FSMContext):
    data = await state.get_data()
    prompt_message_id = data.get('prompt_message_id')
    start_message_id = data.get('start_message_id')
    refresh_message_id = data.get('refresh_message_id')

    await state.update_data(api_key=message.text)
    await storage.set_data("keys", {"api_key": message.text})
    await message.answer("Welcome, I'm Kaiteki Helper Bot. Here is main functionality:", reply_markup=kb.options)
    await state.clear()
    await message.delete()
    
    if prompt_message_id:
        await message.bot.delete_message(chat_id=message.chat.id, message_id=prompt_message_id)
    if start_message_id:
        await message.bot.delete_message(chat_id=message.chat.id, message_id=start_message_id)
    if refresh_message_id:
        await message.bot.delete_message(chat_id=message.chat.id, message_id=refresh_message_id)

@router.callback_query(F.data == 'close')
async def close(callback: CallbackQuery):
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
        for index, task in enumerate(tasks, start=1):
            formatted_task = format_task(task, index)
            formatted_tasks.append(formatted_task)

        await message.reply("\n".join(formatted_tasks), parse_mode=ParseMode.MARKDOWN, reply_markup=kb.close)
    else:
        await message.reply("No tasks available.", reply_markup=kb.close)

@router.callback_query(F.data == 'tasks')
async def tasks(callback: CallbackQuery):
    await callback.answer('')
    
    keys_dict = await storage.get_data("keys")

    if keys_dict:
        tasks = get_tasks(keys_dict["api_key"])
    else:
        await callback.message.answer("It seems Kaiteki API_Key is missing, send '/refresh' to refresh it", reply_markup=kb.refresh)
        return
   
    if tasks:
        formatted_tasks = []
        for index, task in enumerate(tasks, start=1):
            formatted_task = format_task(task, index)
            formatted_tasks.append(formatted_task)

        await callback.message.answer("\n".join(formatted_tasks), parse_mode=ParseMode.MARKDOWN, reply_markup=kb.close)
    else:
        await callback.message.answer("No tasks available.", reply_markup=kb.close)

@router.message(Command('meetings'))
async def events(message: Message):    
    keys_dict = await storage.get_data("keys")

    if keys_dict:
        meetings = get_meetings(keys_dict["api_key"])
    else:
        await message.answer("It seems Kaiteki API_Key is missing, send '/refresh' to refresh it", reply_markup=kb.refresh)
        return
   
    if meetings:
        formatted_meetings = []
        for index, meeting in enumerate(meetings, start=1):
            formatted_meeting = format_meeting(meeting, index)
            formatted_meetings.append(formatted_meeting)

        await message.reply("\n".join(formatted_meetings), parse_mode=ParseMode.MARKDOWN, reply_markup=kb.close)
    else:
        await message.reply("No meetings so far.", reply_markup=kb.close)


@router.callback_query(F.data == 'meetings')
async def events(callback: CallbackQuery):
    await callback.answer('')
    
    keys_dict = await storage.get_data("keys")

    if keys_dict:
        meetings = get_meetings(keys_dict["api_key"])
    else:
        await callback.message.answer("It seems Kaiteki API_Key is missing, send '/refresh' to refresh it", reply_markup=kb.refresh)
        return
    
    if meetings:
        formatted_meetings = []
        for index, meeting in enumerate(meetings, start=1):
            formatted_meeting = format_meeting(meeting, index)
            formatted_meetings.append(formatted_meeting)

        await callback.message.answer("\n".join(formatted_meetings), parse_mode=ParseMode.MARKDOWN, reply_markup=kb.close)
    else:
        await callback.message.answer("No meetings so far.", reply_markup=kb.close)
