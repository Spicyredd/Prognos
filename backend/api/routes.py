from flask import Blueprint, request, jsonify
from api.model_src.utils.logging_utils import logger
from api.model_src.state_management.conversation_state import ConversationState
from api.model_src.utils.input_validators import validate_non_empty_string
# from api.model_src.chains.case_report_chain import create_case_report_chain  # Import the function

api_bp = Blueprint('api', __name__)
conversation_state = ConversationState()

TRIGGER_KEYWORDS = ["new case", "start new patient file", "log new patient"]

QUESTIONS = [
    "What is the patient's primary complaint and its duration?",
    "What are the key clinical observations or vital signs you've noted so far?",
    "Please provide relevant patient history (e.g., major conditions, allergies, current medications)."
]

STATE_KEYS = ["complaint_duration", "key_findings_vitals", "relevant_history"]

# @api_bp.route('/hello', methods=['GET'])
# def hello():
#     return jsonify(message="Hello from Flask!")

@api_bp.route('/receive', methods=['POST'])
def receive():
    data = request.get_json()
    message = data.get('message', '')  # fallback to empty string if not sent
    question = data.get('question', '')
    if message in TRIGGER_KEYWORDS:
        conversation_state.clear()
        logger.info("New case initiated by trigger keyword.")
        response_text = "Chatbot: Okay, starting a new case. Let's gather some initial details.\n"
        response_text += QUESTIONS[0]
        return jsonify(status="success", received=response_text, question="0")
    
    if question and int(question)<3:
        if validate_non_empty_string(message):
            conversation_state.set(STATE_KEYS[int(question)], message)
            logger.info(f'Stored response for {STATE_KEYS[int(question)]}:{message}')
        else:
            logger.error(f"Invalid input for {STATE_KEYS[int(question)]}: {message}")
            return jsonify(status="error", received=QUESTIONS[0], question=str(int(question)+1))
        response_text = QUESTIONS[int(question) + 1]
        return jsonify(status="success", received=response_text, question=str(int(question) + 1))

    try:
        from api.model_src.chains.case_report_chain import create_case_report_chain 
        case_report_chain = create_case_report_chain()
        report_input={
            "complaint_duration": conversation_state.get("complaint_duration"),
            "key_findings_vitals": conversation_state.get("key_findings_vitals"),
            "relevant_history": conversation_state.get("relevant_history"),
     }
    except Exception as e:
        logger.error(f"Error creating case report chain: {e}")
        return jsonify(status="error", received="Error initializing case report chain.", question='')

    report = case_report_chain(report_input)
    return jsonify(status="success", received=report, question='')


