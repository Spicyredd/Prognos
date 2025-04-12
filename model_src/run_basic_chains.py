import os
import sys



# Now, attempt to import from your package
try:
    # Assumes your package name is 'your_project_name' as per the structure
    from chains import create_simple_chain
    from config import get_google_api_key # To check API key early
    print("Successfully imported project modules.")
except ImportError as e:
    print(f"Import Error: {e}")
    print("Please ensure:")
    print("1. The package directory structure is correct (src/your_project_name).")
    print("2. You have run `pip install -e.` from the project root to install in editable mode, OR")
    print("3. The script is correctly adding the 'src' directory to sys.path.")
    sys.exit(1)
except Exception as import_e:
     print(f"An unexpected error occurred during import: {import_e}")
     sys.exit(1)


def main():
    """Runs a basic example chain to get a definition."""
    print("\n--- Running Basic LangChain Example ---")

    # 1. Check for API key presence before proceeding
    try:
        get_google_api_key()
        print("Google API Key found in environment.")
    except ValueError as e:
        print(f"\nConfiguration Error: {e}")
        print("Please ensure your GOOGLE_API_KEY is set in a.env file in the project root directory.")
        print("Create a '.env' file from '.env.example' and add your key.")
        sys.exit(1)

    # 2. Define the prompt templates for the task
    system_template = "You are a helpful dictionary assistant. Provide a concise definition for the given term."
    human_template = "What is the definition of '{term}'?"
    print(f"Using System Template: '{system_template}'")
    print(f"Using Human Template: '{human_template}'")

    try:
        # 3. Create the chain using the function from chains.py
        print("\nCreating the definition chain...")
        definition_chain = create_simple_chain(
            system_template=system_template,
            human_template=human_template,
            model_name="gemini-2.0-flash", # Using a faster model for example
            temperature=0 # Slightly less creative for definitions
        )
        print("Chain created successfully.")

        # 4. Define the input and invoke the chain
        term_to_define = "LangChain"
        print(f"\nInvoking chain to define: '{term_to_define}'...")
        response = definition_chain.invoke({"term": term_to_define})

        # 5. Print the response
        print("\nResponse from Gemini via LangChain:")
        print("-" * 30)
        print(response)
        print("-" * 30)

    except Exception as e:
        print(f"\nAn error occurred while running the chain: {e}")
        # Consider adding more specific error handling for API errors (e.g., network issues, invalid key)

    print("\n--- Example Run Finished ---")

if __name__ == "__main__":
    main()