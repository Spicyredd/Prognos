# src/your_project_name/prompts.py
from langchain_core.prompts import ChatPromptTemplate

def create_basic_prompt_template(system_message_template, human_message_template):
    """
    Creates a basic ChatPromptTemplate from system and human message templates.

    Args:
        system_message_template (str): The template string for the system message.
                                       Can include placeholders like {variable}.
        human_message_template (str): The template string for the human message.
                                      Can include placeholders like {variable}.

    Returns:
        ChatPromptTemplate: An initialized prompt template instance.
    """
    # Reference for ChatPromptTemplate.from_messages: [17, 24, 25]
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_message_template),
        ("human", human_message_template)
        # Can add more messages, e.g., examples with ("ai", "Example response")
    ])
    return prompt

# Example usage (optional, for demonstration within this file)
# if __name__ == "__main__":
#     system_tmpl = "You are a helpful assistant that translates {input_language} to {output_language}."
#     human_tmpl = "{text}"
#     translator_prompt = create_basic_prompt_template(system_tmpl, human_tmpl)
#
#     # Format the prompt with specific values
#     formatted_prompt_value = translator_prompt.invoke({
#         "input_language": "English",
#         "output_language": "Spanish",
#         "text": "Good morning!"
#     })
#
#     print("Formatted Prompt Value:")
#     print(formatted_prompt_value)
#     # Output typically shows the structure, e.g., ChatPromptValue(messages=[...])
#
#     print("\nMessages list:")
#     # To get the actual list of messages:
#     messages_list = formatted_prompt_value.to_messages()
#     for msg in messages_list:
#         print(f"- Role: {msg.type}, Content: '{msg.content}'")