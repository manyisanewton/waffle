import os

from flask import Flask, jsonify, request

from chatbot_engine import get_response


app = Flask(__name__)
application = app

ALLOWED_ORIGINS = {
    origin.strip()
    for origin in os.environ.get("CHATBOT_ALLOWED_ORIGINS", "*").split(",")
    if origin.strip()
}


@app.after_request
def add_cors_headers(response):
    origin = request.headers.get("Origin")
    if "*" in ALLOWED_ORIGINS:
        response.headers["Access-Control-Allow-Origin"] = "*"
    elif origin in ALLOWED_ORIGINS:
        response.headers["Access-Control-Allow-Origin"] = origin

    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    return response


@app.get("/")
def health():
    return jsonify(
        {
            "status": "ok",
            "service": "Vortexus website chatbot",
            "endpoints": ["/predict"],
        }
    )


@app.route("/predict", methods=["OPTIONS"])
def predict_options():
    return ("", 204)


@app.post("/predict")
def predict():
    payload = request.get_json(silent=True) or {}
    message = str(payload.get("message", "")).strip()
    flow_id = payload.get("flow_id")
    flow_state = payload.get("flow_state")

    if not message and not flow_id:
        return jsonify({"answer": "Please enter a message.", "matches": []}), 400

    return jsonify(get_response(message, flow_id=flow_id, flow_state=flow_state))


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
