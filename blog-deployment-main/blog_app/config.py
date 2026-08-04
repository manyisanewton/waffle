import os
from datetime import timedelta
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent


def load_local_env():
    env_path = BASE_DIR / ".env"
    if not env_path.exists():
        return

    for line in env_path.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#") or "=" not in stripped:
            continue

        key, value = stripped.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


def normalize_database_url(value):
    if not value:
        return f"sqlite:///{BASE_DIR / 'instance' / 'blog.db'}"
    if value.startswith("mysql://"):
        return value.replace("mysql://", "mysql+pymysql://", 1)
    return value


class Config:
    def __init__(self):
        environment = os.environ.get("BLOG_ENV", "development").lower()
        production = environment == "production"
        secret_key = os.environ.get("BLOG_SECRET_KEY")

        if production and not secret_key:
            raise RuntimeError("BLOG_SECRET_KEY must be configured in production.")

        self.ENV = environment
        self.DEBUG = environment == "development"
        self.SECRET_KEY = secret_key or "development-only-change-me"
        self.SQLALCHEMY_DATABASE_URI = normalize_database_url(
            os.environ.get("BLOG_DATABASE_URL")
        )
        self.SQLALCHEMY_TRACK_MODIFICATIONS = False
        self.SQLALCHEMY_ENGINE_OPTIONS = {
            "pool_pre_ping": True,
            "pool_recycle": 280,
        }
        self.SESSION_COOKIE_NAME = "vortexus_blog_session"
        self.SESSION_COOKIE_HTTPONLY = True
        self.SESSION_COOKIE_SECURE = os.environ.get(
            "BLOG_SESSION_COOKIE_SECURE", "1" if production else "0"
        ) == "1"
        self.SESSION_COOKIE_SAMESITE = "Lax"
        self.PERMANENT_SESSION_LIFETIME = timedelta(
            hours=int(os.environ.get("BLOG_SESSION_HOURS", "8"))
        )
        self.MAX_CONTENT_LENGTH = int(os.environ.get("BLOG_MAX_UPLOAD_MB", "15")) * 1024 * 1024
        self.BLOG_MEDIA_ROOT = os.environ.get(
            "BLOG_MEDIA_ROOT", str(BASE_DIR / "instance" / "media")
        )
        self.BLOG_PUBLIC_BASE_URL = os.environ.get(
            "BLOG_PUBLIC_BASE_URL", "http://localhost:5050/blog"
        ).rstrip("/")
        self.BLOG_ALLOWED_ORIGINS = [
            origin.strip().rstrip("/")
            for origin in os.environ.get(
                "BLOG_ALLOWED_ORIGINS",
                "http://localhost:5173,http://127.0.0.1:5173",
            ).split(",")
            if origin.strip()
        ]
        self.BLOG_TRUST_PROXY_HEADERS = os.environ.get("BLOG_TRUST_PROXY_HEADERS", "0") == "1"
        self.WTF_CSRF_HEADERS = ["X-CSRFToken", "X-CSRF-Token"]
        self.WTF_CSRF_SSL_STRICT = production
