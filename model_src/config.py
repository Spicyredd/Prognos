# src/your_project_name/config.py
import os
from dotenv import load_dotenv

def load_environment_variables():
    """Loads environment variables from a.env file if present."""
    # Search for.env file starting from the current directory and moving up
    # This helps find the.env file even when running scripts from subdirectories
    project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    dotenv_path = os.path.join(project_root, '.env')

    if os.path.exists(dotenv_path):
        load_dotenv(dotenv_path=dotenv_path)
        # print(f"Loaded environment variables from: {dotenv_path}") # Optional: for debugging
    # else:
        # print(".env file not found, relying on system environment variables.") # Optional: for debugging

# Load variables when the module is imported
load_environment_variables()

def get_google_api_key():
    """Retrieves the Google API Key from environment variables."""
    # os.environ.get() is safer than os.environ as it returns None if key not found
    api_key = os.environ.get("GOOGLE_API_KEY")
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