from aiogram.types import ReplyKeyboardMarkup, InlineKeyboardMarkup, KeyboardButton, InlineKeyboardButton

main = ReplyKeyboardMarkup(
    keyboard=[
        [KeyboardButton(text="Events ⏰"), KeyboardButton(text="Tasks 💻")],
        [KeyboardButton(text="Help #️⃣")]
    ], 
    resize_keyboard=True, 
    input_field_placeholder="Choose option")

tasks = InlineKeyboardMarkup(
    inline_keyboard=[
        [InlineKeyboardButton(text="Main 🔙", callback_data="main")]
    ]
)

events = InlineKeyboardMarkup(
    inline_keyboard=[
        [InlineKeyboardButton(text="Main 🔙", callback_data="main")]
    ]
)

options = InlineKeyboardMarkup(
    inline_keyboard=[
        [InlineKeyboardButton(text="Events ⏰", callback_data="events"), 
         InlineKeyboardButton(text="Tasks 💻",  callback_data="tasks")],
    ]
)

refresh = ReplyKeyboardMarkup(
    keyboard=[
        [KeyboardButton(text="/refresh")]
    ],     
    resize_keyboard=True, 
    input_field_placeholder="Press button below to restart 🔁"
)