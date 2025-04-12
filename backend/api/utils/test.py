from modelutils import ModelIO

model = ModelIO()
prompt = "What is the capital of France?"

response = model.response(prompt)

print("Response:", response.text)    