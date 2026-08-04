import re
import unicodedata

from flask import current_app, request

from .extensions import db
from .models import AuditLog, Post


SLUG_PATTERN = re.compile(r"[^a-z0-9]+")


def slugify(value):
    normalized = unicodedata.normalize("NFKD", str(value or ""))
    ascii_value = normalized.encode("ascii", "ignore").decode("ascii").lower()
    return SLUG_PATTERN.sub("-", ascii_value).strip("-")


def unique_post_slug(value, post_id=None):
    base = slugify(value) or "article"
    candidate = base
    suffix = 2

    while True:
        query = Post.query.filter_by(slug=candidate)
        if post_id is not None:
            query = query.filter(Post.id != post_id)
        if query.first() is None:
            return candidate
        candidate = f"{base}-{suffix}"
        suffix += 1


def client_ip():
    forwarded = request.headers.get("X-Forwarded-For", "") if current_app.config.get("BLOG_TRUST_PROXY_HEADERS") else ""
    return (forwarded.split(",", 1)[0].strip() if forwarded else request.remote_addr) or ""


def record_audit(action, entity_type, entity_id=None, actor_id=None, details=None):
    db.session.add(
        AuditLog(
            actor_id=actor_id,
            action=action,
            entity_type=entity_type,
            entity_id=entity_id,
            details=details or {},
            ip_address=client_ip(),
        )
    )
