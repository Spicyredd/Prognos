# src/your_project_name/llm_provider.py
from langchain_google_genai import ChatGoogleGenerativeAI
from config import get_google_api_key # Import the function from config.py

def get_gemini_llm(model_name="gemini-2.0-flash", temperature=0):
    """
    Initializes and returns a ChatGoogleGenerativeAI instance configured
    with the API key from environment variables.

    Args:
        model_name (str): The name of the Gemini model to use.
        temperature (float): The sampling temperature for generation.

    Returns:
        ChatGoogleGenerativeAI: An initialized LLM instance.

    Raises:
        ValueError: If the GOOGLE_API_KEY is not found.
    """
    api_key = get_google_api_key() # Fetches key using the function from config.py
    # Initialize the ChatGoogleGenerativeAI class
    # It will use the GOOGLE_API_KEY environment variable by default,
    # but passing it explicitly via google_api_key is also possible.
    # Using the environment variable loaded by config.py is preferred.
    llm = ChatGoogleGenerativeAI(
        model=model_name,
        api_key=api_key, # Explicitly passing, though redundant if env var is set
        temperature=temperature,
        # Example of passing other parameters via kwargs:
        # max_output_tokens=1024,
        # top_p=0.9
    )
    # References for ChatGoogleGenerativeAI usage and parameters:
    # [15, 17, 18, 19, 20, 21, 22, 23]
    return llm

# Example usage (optional, for demonstration within this file)
# if __name__ == "__main__":
#     try:
#         print("Attempting to initialize LLM...")
#         llm_instance = get_gemini_llm()
#         print(f"Successfully initialized LLM: {llm_instance.model}")
#         # Basic invocation test (requires a valid API key and network access)
#         print("\nTesting LLM invocation...")
#         test_response = llm_instance.invoke("What is LangChain?")
#         print(f"Test response content:\n---\n{test_response.content}\n---")
#     except ValueError as ve:
#         print(f"Configuration Error: {ve}")
#     except Exception as e:
#         print(f"An unexpected error occurred: {e}")