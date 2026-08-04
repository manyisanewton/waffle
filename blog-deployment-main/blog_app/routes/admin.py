from datetime import datetime, timezone
from urllib.parse import urlparse

from pathlib import Path

from flask import Blueprint, current_app, jsonify, request, url_for
from flask_login import current_user, login_required
from sqlalchemy import func

from ..extensions import db
from ..content import sanitize_blocks
from ..media import InvalidImage, process_upload
from ..models import Category, MediaAsset, Post, PostRevision, Redirect, Tag
from ..security import record_audit, slugify, unique_post_slug


admin_api = Blueprint("admin_api", __name__, url_prefix="/api/admin")
VALID_STATUSES = {"draft", "scheduled", "published", "archived"}


def validate_post_for_search(post):
    errors = []
    seo_title = post.seo_title or post.title
    if not 30 <= len(seo_title) <= 60:
        errors.append("SEO title must contain between 30 and 60 characters.")
    if not 120 <= len(post.meta_description or "") <= 160:
        errors.append("Meta description must contain between 120 and 160 characters.")
    if not (post.excerpt or "").strip():
        errors.append("An article excerpt is required.")
    headings = [block for block in (post.content or []) if block.get("type") == "heading"]
    previous_level = 1
    for heading in headings:
        level = int(heading.get("level") or 2)
        if level > previous_level + 1:
            errors.append("Heading levels must follow a logical order without skipping a level.")
            break
        previous_level = level
    for block in (post.content or []):
        if block.get("type") == "image" and not str(block.get("alt") or "").strip():
            errors.append("Every article image must have alternative text.")
            break
    return errors


def parse_datetime(value):
    if not value:
        return None
    parsed = datetime.fromisoformat(str(value).replace("Z", "+00:00"))
    if parsed.tzinfo is None:
        parsed = parsed.replace(tzinfo=timezone.utc)
    return parsed


def apply_post_payload(post, payload, creating=False):
    if "title" in payload or creating:
        title = str(payload.get("title", "")).strip()
        if not title:
            raise ValueError("A title is required.")
        post.title = title

    if "slug" in payload or creating:
        requested_slug = payload.get("slug") or post.title
        post.slug = unique_post_slug(requested_slug, post.id)

    text_fields = {
        "excerpt": 1000,
        "seo_title": 180,
        "meta_description": 320,
        "focus_keyword": 180,
        "canonical_url": 500,
    }
    for field, maximum in text_fields.items():
        if field in payload:
            value = str(payload.get(field, "")).strip()
            if len(value) > maximum:
                raise ValueError(f"{field.replace('_', ' ').title()} is too long.")
            setattr(post, field, value)

    if post.canonical_url:
        canonical = urlparse(post.canonical_url)
        if canonical.scheme not in {"http", "https"} or not canonical.netloc:
            raise ValueError("Canonical URL must be a complete HTTP or HTTPS address.")

    if "content" in payload:
        post.content = sanitize_blocks(payload.get("content"))

    if "status" in payload:
        status = str(payload.get("status", "")).strip().lower()
        if status not in VALID_STATUSES:
            raise ValueError("Invalid post status.")
        post.status = status
        if status == "published" and post.published_at is None:
            post.published_at = datetime.now(timezone.utc)

    if "scheduled_at" in payload:
        post.scheduled_at = parse_datetime(payload.get("scheduled_at"))
    if "published_at" in payload:
        post.published_at = parse_datetime(payload.get("published_at"))
    if "is_featured" in payload:
        post.is_featured = bool(payload.get("is_featured"))
    if "robots_index" in payload:
        post.robots_index = bool(payload.get("robots_index"))

    if "category_id" in payload:
        category_id = payload.get("category_id")
        if category_id is not None and db.session.get(Category, int(category_id)) is None:
            raise ValueError("The selected category does not exist.")
        post.category_id = int(category_id) if category_id is not None else None

    for field in ("featured_image_id", "og_image_id"):
        if field in payload:
            media_id = payload.get(field)
            if media_id is not None and db.session.get(MediaAsset, int(media_id)) is None:
                raise ValueError("The selected image does not exist.")
            setattr(post, field, int(media_id) if media_id is not None else None)

    if "tags" in payload:
        raw_tags = payload.get("tags")
        if not isinstance(raw_tags, list):
            raise ValueError("Tags must be supplied as a list.")
        tags = []
        for raw_name in raw_tags[:20]:
            name = str(raw_name).strip()[:120]
            tag_slug = slugify(name)
            if not name or not tag_slug:
                continue
            tag = Tag.query.filter_by(slug=tag_slug).first()
            if tag is None:
                tag = Tag(name=name, slug=tag_slug)
                db.session.add(tag)
            tags.append(tag)
        post.tags = tags

    if post.status == "scheduled" and post.scheduled_at is None:
        raise ValueError("Choose a date and time before scheduling the article.")



def create_revision(post):
    latest_version = (
        db.session.query(func.max(PostRevision.version)).filter_by(post_id=post.id).scalar() or 0
    )
    revision = PostRevision(
        post_id=post.id,
        editor_id=current_user.id,
        version=latest_version + 1,
        title=post.title,
        excerpt=post.excerpt,
        content=list(post.content or []),
        snapshot={
            "status": post.status,
            "seo_title": post.seo_title,
            "meta_description": post.meta_description,
            "focus_keyword": post.focus_keyword,
            "canonical_url": post.canonical_url,
        },
    )
    db.session.add(revision)


def serialize_media(asset):
    data = asset.to_dict()
    data["urls"] = {
        name: url_for("public_api.media_file", filename=details["path"])
        for name, details in (asset.variants or {}).items()
    }
    return data


@admin_api.get("/posts")
@login_required
def posts():
    status = str(request.args.get("status", "")).strip().lower()
    query = Post.query
    if status:
        if status not in VALID_STATUSES:
            return jsonify({"error": "Invalid post status."}), 400
        query = query.filter_by(status=status)
    items = query.order_by(Post.updated_at.desc()).all()
    return jsonify({"posts": [post.to_dict() for post in items]})


@admin_api.post("/posts")
@login_required
def create_post():
    payload = request.get_json(silent=True) or {}
    post = Post(author_id=current_user.id)
    try:
        apply_post_payload(post, payload, creating=True)
    except (TypeError, ValueError) as error:
        return jsonify({"error": str(error)}), 400

    db.session.add(post)
    db.session.flush()
    record_audit("post.create", "post", post.id, current_user.id, {"slug": post.slug})
    db.session.commit()
    return jsonify({"post": post.to_dict(include_content=True)}), 201


@admin_api.get("/posts/<int:post_id>")
@login_required
def get_post(post_id):
    post = db.get_or_404(Post, post_id)
    return jsonify({"post": post.to_dict(include_content=True)})


@admin_api.get("/posts/<int:post_id>/seo-validation")
@login_required
def post_seo_validation(post_id):
    post = db.get_or_404(Post, post_id)
    errors = validate_post_for_search(post)
    return jsonify({"valid": not errors, "issues": errors})


@admin_api.patch("/posts/<int:post_id>")
@login_required
def update_post(post_id):
    post = db.get_or_404(Post, post_id)
    payload = request.get_json(silent=True) or {}
    is_autosave = bool(payload.pop("_autosave", False))
    if not is_autosave:
        create_revision(post)
    try:
        apply_post_payload(post, payload)
    except (TypeError, ValueError) as error:
        db.session.rollback()
        return jsonify({"error": str(error)}), 400

    if not is_autosave:
        record_audit("post.update", "post", post.id, current_user.id, {"fields": sorted(payload)})
    db.session.commit()
    return jsonify({"post": post.to_dict(include_content=True)})


@admin_api.delete("/posts/<int:post_id>")
@login_required
def archive_post(post_id):
    post = db.get_or_404(Post, post_id)
    create_revision(post)
    post.status = "archived"
    record_audit("post.archive", "post", post.id, current_user.id)
    db.session.commit()
    return jsonify({"post": post.to_dict()})


@admin_api.get("/categories")
@login_required
def categories():
    items = Category.query.order_by(Category.name.asc()).all()
    return jsonify({"categories": [item.to_dict() for item in items]})


@admin_api.post("/categories")
@login_required
def create_category():
    payload = request.get_json(silent=True) or {}
    name = str(payload.get("name", "")).strip()
    if not name:
        return jsonify({"error": "A category name is required."}), 400

    category_slug = slugify(payload.get("slug") or name)
    if Category.query.filter((Category.name == name) | (Category.slug == category_slug)).first():
        return jsonify({"error": "That category already exists."}), 409

    category = Category(
        name=name,
        slug=category_slug,
        description=str(payload.get("description", "")).strip(),
        seo_title=str(payload.get("seo_title", "")).strip(),
        meta_description=str(payload.get("meta_description", "")).strip(),
    )
    db.session.add(category)
    db.session.flush()
    record_audit("category.create", "category", category.id, current_user.id)
    db.session.commit()
    return jsonify({"category": category.to_dict()}), 201


@admin_api.get("/redirects")
@login_required
def redirects():
    items = Redirect.query.order_by(Redirect.updated_at.desc()).all()
    return jsonify({"redirects": [{
        "id": item.id, "source_path": item.source_path,
        "destination_path": item.destination_path, "status_code": item.status_code,
        "is_active": item.is_active,
    } for item in items]})


@admin_api.post("/redirects")
@login_required
def create_redirect():
    payload = request.get_json(silent=True) or {}
    source = "/" + str(payload.get("source_path", "")).strip().lstrip("/")
    destination = str(payload.get("destination_path", "")).strip()
    status_code = int(payload.get("status_code", 301))
    if source == "/" or not destination:
        return jsonify({"error": "Source and destination paths are required."}), 400
    if not destination.startswith("/") or destination.startswith("//"):
        return jsonify({"error": "Redirect destinations must be safe paths on this website."}), 400
    if status_code not in {301, 302, 307, 308}:
        return jsonify({"error": "Invalid redirect status code."}), 400
    if Redirect.query.filter_by(source_path=source).first():
        return jsonify({"error": "That redirect source already exists."}), 409
    item = Redirect(source_path=source, destination_path=destination, status_code=status_code, is_active=True)
    db.session.add(item)
    db.session.flush()
    record_audit("redirect.create", "redirect", item.id, current_user.id)
    db.session.commit()
    return jsonify({"redirect": {"id": item.id, "source_path": source, "destination_path": destination, "status_code": status_code}}), 201


@admin_api.get("/media")
@login_required
def media_library():
    items = MediaAsset.query.order_by(MediaAsset.created_at.desc()).all()
    return jsonify({"media": [serialize_media(item) for item in items]})


@admin_api.post("/media")
@login_required
def upload_media():
    file_storage = request.files.get("file")
    alt_text = str(request.form.get("alt_text", "")).strip()
    caption = str(request.form.get("caption", "")).strip()
    if not file_storage:
        return jsonify({"error": "Choose an image to upload."}), 400
    if not alt_text:
        return jsonify({"error": "Alternative text is required for accessibility and SEO."}), 400
    if len(alt_text) > 255 or len(caption) > 2000:
        return jsonify({"error": "The image description or caption is too long."}), 400

    try:
        processed = process_upload(file_storage, current_app.config["BLOG_MEDIA_ROOT"])
    except InvalidImage as error:
        return jsonify({"error": str(error)}), 400

    asset = MediaAsset(
        **processed,
        alt_text=alt_text,
        caption=caption,
        uploaded_by_id=current_user.id,
    )
    db.session.add(asset)
    db.session.flush()
    record_audit("media.upload", "media_asset", asset.id, current_user.id)
    db.session.commit()
    return jsonify({"media": serialize_media(asset)}), 201


@admin_api.patch("/media/<int:media_id>")
@login_required
def update_media(media_id):
    asset = db.get_or_404(MediaAsset, media_id)
    payload = request.get_json(silent=True) or {}
    alt_text = str(payload.get("alt_text", asset.alt_text)).strip()
    caption = str(payload.get("caption", asset.caption)).strip()
    if not alt_text:
        return jsonify({"error": "Alternative text is required."}), 400
    asset.alt_text = alt_text[:255]
    asset.caption = caption[:2000]
    record_audit("media.update", "media_asset", asset.id, current_user.id)
    db.session.commit()
    return jsonify({"media": serialize_media(asset)})


@admin_api.delete("/media/<int:media_id>")
@login_required
def delete_media(media_id):
    asset = db.get_or_404(MediaAsset, media_id)
    in_use = Post.query.filter(
        (Post.featured_image_id == media_id) | (Post.og_image_id == media_id)
    ).first()
    if in_use is None:
        in_use = next(
            (
                post
                for post in Post.query.all()
                if any(
                    block.get("type") == "image" and block.get("media_id") == media_id
                    for block in (post.content or [])
                )
            ),
            None,
        )
    if in_use:
        return jsonify({"error": "This image is attached to an article and cannot be deleted."}), 409

    media_root = Path(current_app.config["BLOG_MEDIA_ROOT"]).resolve()
    for details in (asset.variants or {}).values():
        file_path = (media_root / details["path"]).resolve()
        if media_root in file_path.parents:
            file_path.unlink(missing_ok=True)
    record_audit("media.delete", "media_asset", asset.id, current_user.id)
    db.session.delete(asset)
    db.session.commit()
    return jsonify({"status": "ok"})


@admin_api.get("/posts/<int:post_id>/revisions")
@login_required
def revisions(post_id):
    db.get_or_404(Post, post_id)
    items = PostRevision.query.filter_by(post_id=post_id).order_by(PostRevision.version.desc()).all()
    return jsonify({"revisions": [revision.to_dict() for revision in items]})


@admin_api.post("/posts/<int:post_id>/revisions/<int:revision_id>/restore")
@login_required
def restore_revision(post_id, revision_id):
    post = db.get_or_404(Post, post_id)
    revision = PostRevision.query.filter_by(id=revision_id, post_id=post_id).first_or_404()
    create_revision(post)
    post.title = revision.title
    post.excerpt = revision.excerpt
    post.content = list(revision.content or [])
    for field in ("status", "seo_title", "meta_description", "focus_keyword", "canonical_url"):
        if field in revision.snapshot:
            setattr(post, field, revision.snapshot[field])
    record_audit(
        "post.revision.restore",
        "post",
        post.id,
        current_user.id,
        {"revision_id": revision.id, "version": revision.version},
    )
    db.session.commit()
    return jsonify({"post": post.to_dict(include_content=True)})


@admin_api.get("/tags")
@login_required
def tags():
    items = Tag.query.order_by(Tag.name.asc()).all()
    return jsonify({"tags": [item.to_dict() for item in items]})
