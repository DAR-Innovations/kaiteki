from aiogram.types import ReplyKeyboardMarkup, InlineKeyboardMarkup, KeyboardButton, InlineKeyboardButton

main = ReplyKeyboardMarkup(
    keyboard=[
        [KeyboardButton(text="Meetings ⏰"), KeyboardButton(text="Tasks 💻")],
        [KeyboardButton(text="Help #️⃣")]
    ], 
    resize_keyboard=True, 
    input_field_placeholder="Choose option")

close = InlineKeyboardMarkup(
    inline_keyboard=[
        [InlineKeyboardButton(text="Close ❌", callback_data="close")]
    ]
)

options = InlineKeyboardMarkup(
    inline_keyboard=[
        [InlineKeyboardButton(text="Meetings ⏰", callback_data="meetings"), 
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