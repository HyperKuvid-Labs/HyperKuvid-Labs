import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

# List all available models
models = genai.list_models()

for model in models:
    print(f"Name: {model.name}")
    print(f"  Description: {model.description}")
    print(f"  Supported Methods: {model.supported_generation_methods}")
    print("-" * 50)
