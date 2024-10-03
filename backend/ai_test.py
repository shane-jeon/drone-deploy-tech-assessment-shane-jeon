import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")

if openai_api_key is None:
  raise ValueError("OPENAI_API_KEY is not set")

# openai_api_key = openai_api_key

client = OpenAI(api_key=openai_api_key);

user_input = input("Enter the message you want to send to your 엄마: ")

completion = client.chat.completions.create(
  model="gpt-4o-mini",
  messages=[
    {'role': 'system', 'content': 'You are an English to Korean translator, specializing in the Haeyoche speech level. You translate with a focus on natural, friendly communication that a Korean American (Gyopo) would use when speaking to their parents. This style considers the context of someone who grew up with some Korean but isn’t fully fluent, retaining childhood phrases and vocabulary. The goal is to express care and respect while maintaining a light, approachable tone that balances formality with warmth, avoiding overly rigid or textbook-like language.'},
    {
      'role': 'user',
      'content': user_input
    }
  ]
)

print(completion.choices[0].message)