import os
from dotenv import load_dotenv
import google.generativeai as genai

class ModelIO():
    def __init__(self, model_name="gemini-2.0-flash"):
        load_dotenv()
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("API key not found. Please set the GEMINI_API_KEY environment variable.")
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel(model_name)

    def response(self, prompt):
        try:
            response = self.model.generate_content(prompt)
            return response
        except Exception as e:
            print(f"Error generating response: {e}")
            return None
        
# model_io = ModelIO()
# while True:
#     user_input = input("Enter your prompt: ")
#     if user_input.lower() == "exit":
#         break
#     response = model_io.response(user_input)
#     if response:
#         print(f"Response: {response}")
#     else:
#         print("Failed to generate a response.")