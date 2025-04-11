# src/your_project_name/chains.py
from langchain_core.output_parsers import StrOutputParser
from.llm_provider import get_gemini_llm # Assumes llm_provider.py in the same package
from.prompts import create_basic_prompt_template # Assumes prompts.py with the function

def create_simple_chain(system_template, human_template, model_name="gemini-1.5-pro", temperature=0.7):
    """
    Creates a simple LangChain chain using LCEL: Prompt -> LLM -> String Output.

    Args:
        system_template (str): The template string for the system message.
        human_template (str): The template string for the human message.
        model_name (str): The name of the Gemini model to use.
        temperature (float): The sampling temperature for generation.

    Returns:
        Runnable: A LangChain Runnable sequence representing the chain.
    """
    try:
        # 1. Initialize the LLM
        llm = get_gemini_llm(model_name=model_name, temperature=temperature)

        # 2. Create the Prompt Template
        prompt = create_basic_prompt_template(system_template, human_template)

        # 3. Define the chain using LCEL pipe operator '|'
        # The flow is: input dict -> prompt -> LLM -> output parser -> string output
        # Ref: [7, 14, 24, 29] for LCEL '|' syntax and StrOutputParser
        chain = prompt | llm | StrOutputParser()

        return chain

    except Exception as e:
        print(f"Error creating simple chain: {e}")
        # Re-raise or handle as appropriate for your application
        raise

# Example usage (optional, for demonstration within this file)
# if __name__ == "__main__":
#     try:
#         print("Creating a simple summarization chain...")
#         system_tmpl = "You are an expert summarizer. Summarize the following text concisely."
#         human_tmpl = "Text to summarize: {input_text}"
#
#         summarization_chain = create_simple_chain(system_tmpl, human_tmpl)
#         print("Chain created successfully.")
#
#         # Example text
#         long_text = (
#             "LangChain is a framework for developing applications powered by language models. "
#             "It enables applications that are context-aware and can reason. "
#             "Key components include LLMs, Prompt Templates, Chains, Agents, Memory, and Indexes. "
#             "Google's Gemini is a family of powerful multimodal models integrated with LangChain."
#         )
#
#         print("\nInvoking chain for summarization...")
#         summary = summarization_chain.invoke({"input_text": long_text})
#
#         print("\nGenerated Summary:")
#         print("---")
#         print(summary)
#         print("---")
#
#     except ValueError as ve:
#          print(f"Configuration Error during chain creation/invocation: {ve}")
#     except Exception as e:
#         print(f"An error occurred during chain execution: {e}")