from langchain_core.output_parsers import StrOutputParser
# from llm_provider import get_gemini_llm
from .prompts.report_prompt_template import REPORT_PROMPT_TEMPLATE
from langchain_core.prompts import PromptTemplate
from api.model_src.utils.logging_utils import logger

from langchain_google_genai import ChatGoogleGenerativeAI
from api.model_src.configs.config import get_google_api_key

def get_gemini_llm(model_name="gemini-2.0-flash", temperature=0):
    api_key = get_google_api_key()
    llm = ChatGoogleGenerativeAI(
        model=model_name,
        api_key=api_key,
        temperature=temperature
    )
    return llm

def create_case_report_chain(model_name="gemini-2.0-flash", temperature=0):
    try:
        llm = get_gemini_llm(model_name=model_name, temperature=temperature)
        prompt = PromptTemplate.from_template(REPORT_PROMPT_TEMPLATE)
        chain = prompt | llm | StrOutputParser()
        return chain
    except Exception as e:
        logger.error(f"Error creating case report chain: {e}")
        raise
