from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from apis.model_src.utils.logging_utils import logger
from apis.model_src.state_management.conversation_state import ConversationState
from apis.model_src.utils.input_validators import validate_non_empty_string
from apis.model_src.chains.case_report_chain import create_case_report_chain

# Create your views here.

conversation_state = ConversationState()

TRIGGER_KEYWORDS = ["new case", "start new patient file", "log new patient"]

QUESTIONS = [
    "What is the patient's primary complaint and its duration?", # Index 0
    "What are the key clinical observations or vital signs you've noted so far?", # Index 1
    "Please provide relevant patient history (e.g., major conditions, allergies, current medications)." # Index 2
]

# Ensure STATE_KEYS aligns with QUESTIONS in length and purpose
STATE_KEYS = ["complaint_duration", "key_findings_vitals", "relevant_history"]

class APIModelIOView(APIView):
    def post(self, request):
        message = request.data.get("message", "")
        if message in TRIGGER_KEYWORDS:
            print(message)
            conversation_state.clear()
            response_text = "Chatbot: Okay, starting a new case. Let's gather some initial details.\n"
            response_text += QUESTIONS[0]
            return Response({"status": "success", "received": response_text, 'question':'0'}, status=status.HTTP_200_OK)     
        
        question_str = request.data.get("question", "")
        if question_str:
            question = int(question_str)
            if question < len(QUESTIONS):
                if validate_non_empty_string(message):
                    conversation_state.set(STATE_KEYS[question], message)
                    logger.info(f"Stored response for {STATE_KEYS[question]}:{message}")
                    response_text = "Chatbot: Thank you for the information. We will proceed with the case report."
                    if question == len(QUESTIONS) - 1:
                        logger.info("Attempting to generate case report.")
                        report_input = {key: conversation_state.get(key) for key in STATE_KEYS}
                        case_report_chain = create_case_report_chain()
                        report = case_report_chain.invoke(report_input)
                        return Response({"status":"success", "received": report, "question":""}, status=status.HTTP_200_OK)
                    logger.info("All questions answered. Generating case report.")
                    response_text = "Chatbot: Thank you for the information. We will proceed with the case report."
                    return Response({"status": "success", "received": QUESTIONS[question + 1] if question + 1 < len(QUESTIONS) else "Thank you for the information. We will proceed with the case report.", 'question': str(question + 1)}, status=status.HTTP_200_OK)
                else:
                    logger.warning(f"Invalid input for {STATE_KEYS[question]}: {message}")
                    return Response({"status": "error", "received": "Invalid input. Please provide a non-empty string."}, status=status.HTTP_400_BAD_REQUEST)
        # logger.info("Attempting to generate case report.")
        # report_input = {key: conversation_state.get(key) for key in STATE_KEYS}
        # case_report_chain = create_case_report_chain()
        # report = case_report_chain.invoke(report_input)
        # return Response({"status":"success", "received": report, "question":""}, status=status.HTTP_200_OK)
