from flask import Blueprint, request, jsonify
from .utils.modelutils import ModelIO

model = ModelIO()
api_bp = Blueprint('api', __name__)

# @api_bp.route('/hello', methods=['GET'])
# def hello():
#     return jsonify(message="Hello from Flask!")

@api_bp.route('/receive', methods=['POST'])
def receive():
    data = request.get_json()
    message = data.get('message', '')  # fallback to empty string if not sent
    response = model.response(message)
    
    response_text = response.text
    print(response)
    print(response_text)
    return jsonify(status="success", received=response_text)


