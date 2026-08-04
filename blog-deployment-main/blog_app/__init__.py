from pathlib import Path

from flask import Flask, jsonify, request

from .cli import register_cli
from .config import Config, load_local_env
from .extensions import csrf, db, login_manager, migrate
from .routes.admin import admin_api
from .routes.admin_pages import admin_pages
from .routes.auth import auth_api
from .routes.public import public_api


def create_app(test_config=None):
    load_local_env()

    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(Config())

    if test_config:
        app.config.update(test_config)

    Path(app.instance_path).mkdir(parents=True, exist_ok=True)
    Path(app.config["BLOG_MEDIA_ROOT"]).mkdir(parents=True, exist_ok=True)

    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)
    csrf.init_app(app)

    app.register_blueprint(public_api)
    app.register_blueprint(auth_api)
    app.register_blueprint(admin_api)
    app.register_blueprint(admin_pages)
    register_cli(app)

    @app.after_request
    def add_security_headers(response):
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        response.headers.setdefault("X-Frame-Options", "SAMEORIGIN")
        response.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
        response.headers.setdefault(
            "Permissions-Policy", "camera=(), microphone=(), geolocation=()"
        )
        if request.path.startswith(("/api/auth", "/api/admin")):
            response.headers["Cache-Control"] = "no-store"
        elif request.path.startswith(("/api/posts", "/api/categories", "/media/")):
            origin = request.headers.get("Origin", "").rstrip("/")
            if origin and origin in app.config["BLOG_ALLOWED_ORIGINS"]:
                response.headers["Access-Control-Allow-Origin"] = origin
                response.headers["Vary"] = "Origin"
            response.headers.setdefault("Cache-Control", "public, max-age=300")
        if app.config["ENV"] == "production" and request.is_secure:
            response.headers.setdefault(
                "Strict-Transport-Security", "max-age=31536000; includeSubDomains"
            )
        return response

    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({"error": getattr(error, "description", "Bad request.")}), 400

    @app.errorhandler(404)
    def not_found(_error):
        return jsonify({"error": "Resource not found."}), 404

    @app.errorhandler(413)
    def upload_too_large(_error):
        return jsonify({"error": "The uploaded file is too large."}), 413

    @app.errorhandler(500)
    def server_error(_error):
        return jsonify({"error": "The server could not complete the request."}), 500

    return app
