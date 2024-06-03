import os

from dotenv import load_dotenv
from fastapi import HTTPException
from openai import OpenAI


load_dotenv()


client = OpenAI(
    organization=os.getenv("OPENAI_ORG_KEY"),
    project=os.getenv("OPENAI_PROJECT_KEY"),
    api_key=os.getenv("OPENAI_API_KEY")
)


BASE_MESSAGE = {
    "role": "user",
    "content": "You are a friendly chatbot who always helps with people question. Your name is Kaizen and you are a part of Kaiteki platform. Kaiteki is a platform that helps to automate the workflow processes."
}


def create_completion(prompt: str):
    try:
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                BASE_MESSAGE,
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            max_tokens=256,
            frequency_penalty=0.0,
            presence_penalty=0.0,
        )

        return completion.choices[0].message.content
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
