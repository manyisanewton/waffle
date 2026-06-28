import os
import time
from pathlib import Path
from threading import Lock

from flask import Flask, jsonify, request


def load_local_env():
    env_path = Path(__file__).resolve().parent / ".env"
    if not env_path.exists():
        return

    for line in env_path.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#") or "=" not in stripped:
            continue

        key, value = stripped.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


load_local_env()

from chatbot_engine import get_response


app = Flask(__name__)
application = app

ALLOWED_ORIGINS = {
    origin.strip()
    for origin in os.environ.get("CHATBOT_ALLOWED_ORIGINS", "*").split(",")
    if origin.strip()
}
RATE_LIMIT_ENABLED = os.environ.get("CHATBOT_RATE_LIMIT_ENABLED", "1") != "0"
RATE_LIMIT_WINDOW_SECONDS = int(os.environ.get("CHATBOT_RATE_LIMIT_WINDOW_SECONDS", "60"))
RATE_LIMIT_MAX_REQUESTS = int(os.environ.get("CHATBOT_RATE_LIMIT_MAX_REQUESTS", "20"))
TRUST_PROXY_HEADERS = os.environ.get("CHATBOT_TRUST_PROXY_HEADERS", "1") == "1"
_rate_limit_lock = Lock()
_rate_limit_hits = {}


def get_client_ip():
    if TRUST_PROXY_HEADERS:
        forwarded_for = request.headers.get("X-Forwarded-For", "")
        if forwarded_for:
            return forwarded_for.split(",", 1)[0].strip()

    return request.remote_addr or "unknown"


def is_rate_limited(client_ip):
    if not RATE_LIMIT_ENABLED:
        return False

    now = time.time()
    window_start = now - RATE_LIMIT_WINDOW_SECONDS

    with _rate_limit_lock:
        hits = [hit for hit in _rate_limit_hits.get(client_ip, []) if hit >= window_start]
        if len(hits) >= RATE_LIMIT_MAX_REQUESTS:
            _rate_limit_hits[client_ip] = hits
            return True

        hits.append(now)
        _rate_limit_hits[client_ip] = hits

        if len(_rate_limit_hits) > 1000:
            for ip, ip_hits in list(_rate_limit_hits.items()):
                fresh_hits = [hit for hit in ip_hits if hit >= window_start]
                if fresh_hits:
                    _rate_limit_hits[ip] = fresh_hits
                else:
                    _rate_limit_hits.pop(ip, None)

    return False


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
    if is_rate_limited(get_client_ip()):
        return (
            jsonify(
                {
                    "answer": "Too many chatbot requests were sent in a short time. Please wait a moment and try again.",
                    "matches": [],
                }
            ),
            429,
        )

    payload = request.get_json(silent=True) or {}
    message = str(payload.get("message", "")).strip()
    flow_id = payload.get("flow_id")
    flow_state = payload.get("flow_state")

    if not message and not flow_id:
        return jsonify({"answer": "Please enter a message.", "matches": []}), 400

    return jsonify(get_response(message, flow_id=flow_id, flow_state=flow_state))


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
