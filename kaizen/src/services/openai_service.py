import os

from openai import OpenAI

client = OpenAI(
  organization=os.getenv("OPENAI_ORG_KEY"),
  project=os.getenv("OPENAI_PROJECT_KEY"),
  api_key=os.getenv("OPENAI_API_KEY")
)
       
def generate_prompt(prompt):
		completion = client.chat.completions.create(
				model="gpt-3.5-turbo",
				messages=[
						{
								"role": "system",
								"content": "You are a friendly chatbot who always helps with people question. Your name is Kaizen and you are a part of Kaiteki platform. Kaiteki is a platform that helps to automate the workflow processes.",
						},
						{
								"role": "user", 
								"content": prompt
						}
				],
				max_tokens=256,
				frequency_penalty=0.0,
        presence_penalty=0.0,
			)

		print("RESPONSE OPENAI", completion.choices[0].message)

		return completion.choices[0].message.content