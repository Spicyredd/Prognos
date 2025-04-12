from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

QUESTIONS = [
    "What is the patient's primary complaint and its duration?",
    "What are the key clinical observations or vital signs?",
    "Please provide relevant patient history (conditions, allergies, medications)."
]

@app.route('/')
def index():
    try:
        return render_template('index.html')
    except Exception as e:
        app.logger.error(f"Error rendering template 'index.html': {e}")
        return "Error: Could not load the application interface.", 500

@app.route('/get_question', methods=['POST'])
def get_question():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 415

    data = request.get_json()
    try:
        step = int(data.get("step", 0))
        if step < 0:
            raise ValueError()
    except (TypeError, ValueError):
        return jsonify({"error": "Invalid 'step'. Must be a non-negative integer."}), 400

    if step < len(QUESTIONS):
        return jsonify({"question": QUESTIONS[step], "done": False})
    return jsonify({"question": "", "done": True})

@app.route('/generate_report', methods=['POST'])
def generate_report():
    try:
        from chains.case_report_chain import create_case_report_chain
    except Exception as e:
        app.logger.error(f"Error importing report chain: {e}", exc_info=True)
        return jsonify({"success": False, "error": "Internal server error."}), 500

    if not request.is_json:
        return jsonify({"success": False, "error": "Request must be JSON."}), 415

    data = request.get_json()
    answers = data.get("answers")

    if not isinstance(answers, dict):
        return jsonify({"success": False, "error": "'answers' must be a dictionary."}), 400

    complaint = answers.get("0")
    findings = answers.get("1")
    history = answers.get("2")

    missing = []
    if not complaint: missing.append("Complaint/Duration")
    if not findings: missing.append("Key Findings/Vitals")
    if not history: missing.append("Relevant History")

    if missing:
        return jsonify({
            "success": False,
            "error": f"Missing required fields: {', '.join(missing)}."
        }), 400

    try:
        chain = create_case_report_chain()
        report = chain.invoke({
            "complaint_duration": complaint,
            "key_findings_vitals": findings,
            "relevant_history": history
        })

        if not report:
            return jsonify({"success": False, "error": "Empty report result."}), 500

        return jsonify({"success": True, "report": report})

    except Exception as e:
        app.logger.error(f"Error generating report: {e}", exc_info=True)
        return jsonify({"success": False, "error": "Internal error during report generation."}), 500

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=5500, debug=False, use_reloader=False)
