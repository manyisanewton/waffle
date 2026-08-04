import time
from collections import defaultdict

from flask import Blueprint, jsonify, request, session
from flask_login import current_user, login_required, login_user, logout_user
from flask_wtf.csrf import generate_csrf

from ..extensions import db
from ..models import AdminUser, utcnow
from ..security import client_ip, record_audit


auth_api = Blueprint("auth_api", __name__, url_prefix="/api/auth")
_login_attempts = defaultdict(list)
LOGIN_WINDOW_SECONDS = 300
LOGIN_MAX_ATTEMPTS = 8


def login_is_limited(ip_address):
    now = time.time()
    window_start = now - LOGIN_WINDOW_SECONDS
    attempts = [stamp for stamp in _login_attempts[ip_address] if stamp >= window_start]
    _login_attempts[ip_address] = attempts
    return len(attempts) >= LOGIN_MAX_ATTEMPTS


@auth_api.get("/csrf")
def csrf_token():
    return jsonify({"csrf_token": generate_csrf()})


@auth_api.post("/login")
def login():
    ip_address = client_ip()
    if login_is_limited(ip_address):
        return jsonify({"error": "Too many login attempts. Please wait and try again."}), 429

    payload = request.get_json(silent=True) or {}
    email = str(payload.get("email", "")).strip().lower()
    password = str(payload.get("password", ""))
    user = AdminUser.query.filter_by(email=email).first() if email else None

    if not user or not user.is_active or not user.check_password(password):
        _login_attempts[ip_address].append(time.time())
        return jsonify({"error": "Invalid email or password."}), 401

    _login_attempts.pop(ip_address, None)
    session.clear()
    session.permanent = True
    login_user(user, remember=False, fresh=True)
    user.last_login_at = utcnow()
    record_audit("auth.login", "admin_user", user.id, actor_id=user.id)
    db.session.commit()
    return jsonify({"user": user.to_dict()})


@auth_api.post("/logout")
@login_required
def logout():
    user_id = current_user.id
    record_audit("auth.logout", "admin_user", user_id, actor_id=user_id)
    db.session.commit()
    logout_user()
    session.clear()
    return jsonify({"status": "ok"})


@auth_api.get("/me")
@login_required
def me():
    return jsonify({"user": current_user.to_dict()})

