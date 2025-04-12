# src/your_project_name/config.py
import os
from dotenv import load_dotenv

load_dotenv()

def get_google_api_key():
    """Retrieves the Google API Key from environment variables."""
    # os.environ.get() is safer than os.environ as it returns None if key not found
    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise ValueError("GOOGLE_API_KEY not found in environment variables. "
                         "Ensure it's set in your.env file (and loaded) or system environment.")
    return api_key

# Example usage (optional, for demonstration within this file)
# if __name__ == "__main__":
#     try:
#         key = get_google_api_key()
#         print(f"Successfully retrieved GOOGLE_API_KEY (length: {len(key)})")
#     except ValueError as e:
#         print(f"Error: {e}")