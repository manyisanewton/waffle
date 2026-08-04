from email.utils import format_datetime
from xml.etree.ElementTree import Element, SubElement, tostring

from flask import Blueprint, current_app, jsonify, request, send_from_directory, url_for, Response
from sqlalchemy import or_

from ..extensions import db
from ..models import Category, Post, Redirect


public_api = Blueprint("public_api", __name__)


def serialize_media(asset):
    if asset is None:
        return None
    data = asset.to_dict()
    data["urls"] = {
        name: url_for("public_api.media_file", filename=details["path"], _external=True)
        for name, details in (asset.variants or {}).items()
    }
    return data


def serialize_post(post, include_content=False):
    data = post.to_dict(include_content=include_content)
    data["author"] = {"id": post.author.id, "name": post.author.name} if post.author else None
    data["featured_image"] = serialize_media(post.featured_image)
    data["og_image"] = serialize_media(post.og_image)
    if include_content:
        media_ids = {
            block.get("media_id")
            for block in (post.content or [])
            if block.get("type") == "image" and block.get("media_id")
        }
        from ..models import MediaAsset

        assets = MediaAsset.query.filter(MediaAsset.id.in_(media_ids)).all() if media_ids else []
        data["media"] = {str(asset.id): serialize_media(asset) for asset in assets}
    return data


def public_article_url(post):
    return f"{current_app.config['BLOG_PUBLIC_BASE_URL']}/{post.slug}"


@public_api.get("/")
@public_api.get("/api/health")
def health():
    database_status = "ok"
    try:
        db.session.execute(db.text("SELECT 1"))
    except Exception:
        database_status = "unavailable"

    status_code = 200 if database_status == "ok" else 503
    return (
        jsonify(
            {
                "status": "ok" if status_code == 200 else "degraded",
                "service": "Vortexus blog",
                "database": database_status,
            }
        ),
        status_code,
    )


@public_api.get("/media/<path:filename>")
def media_file(filename):
    response = send_from_directory(current_app.config["BLOG_MEDIA_ROOT"], filename)
    response.headers["Cache-Control"] = "public, max-age=31536000, immutable"
    return response


@public_api.get("/api/categories")
def categories():
    items = Category.query.order_by(Category.name.asc()).all()
    return jsonify({"categories": [item.to_dict() for item in items]})


@public_api.get("/api/redirects/resolve")
def resolve_redirect():
    source = "/" + str(request.args.get("path", "")).strip().lstrip("/")
    item = Redirect.query.filter_by(source_path=source, is_active=True).first()
    if item is None:
        return jsonify({"redirect": None}), 404
    return jsonify({"redirect": {"destination": item.destination_path, "status_code": item.status_code}})


@public_api.get("/sitemap.xml")
def sitemap():
    root = Element("urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")
    blog_url = current_app.config["BLOG_PUBLIC_BASE_URL"]
    for location, modified in [(blog_url, None)] + [
        (public_article_url(post), post.updated_at)
        for post in Post.query.filter_by(status="published", robots_index=True).order_by(Post.updated_at.desc()).all()
    ]:
        item = SubElement(root, "url")
        SubElement(item, "loc").text = location
        if modified:
            SubElement(item, "lastmod").text = modified.date().isoformat()
    return Response(tostring(root, encoding="utf-8", xml_declaration=True), mimetype="application/xml")


@public_api.get("/rss.xml")
def rss():
    root = Element("rss", version="2.0")
    channel = SubElement(root, "channel")
    SubElement(channel, "title").text = "Vortexus Blog"
    SubElement(channel, "link").text = current_app.config["BLOG_PUBLIC_BASE_URL"]
    SubElement(channel, "description").text = "Water treatment, swimming pool, pumping and solar equipment guidance."
    for post in Post.query.filter_by(status="published").order_by(Post.published_at.desc()).limit(50):
        item = SubElement(channel, "item")
        SubElement(item, "title").text = post.title
        SubElement(item, "link").text = public_article_url(post)
        SubElement(item, "guid", isPermaLink="true").text = public_article_url(post)
        SubElement(item, "description").text = post.excerpt
        if post.published_at:
            SubElement(item, "pubDate").text = format_datetime(post.published_at)
    return Response(tostring(root, encoding="utf-8", xml_declaration=True), mimetype="application/rss+xml")


@public_api.get("/api/posts")
def published_posts():
    page = max(request.args.get("page", 1, type=int), 1)
    per_page = min(max(request.args.get("per_page", 12, type=int), 1), 50)
    query = Post.query.filter_by(status="published")

    category_slug = str(request.args.get("category", "")).strip()
    if category_slug:
        query = query.join(Category).filter(Category.slug == category_slug)

    search = str(request.args.get("q", "")).strip()
    if search:
        pattern = f"%{search}%"
        query = query.filter(or_(Post.title.ilike(pattern), Post.excerpt.ilike(pattern)))

    pagination = query.order_by(Post.published_at.desc(), Post.id.desc()).paginate(
        page=page, per_page=per_page, error_out=False
    )
    return jsonify(
        {
            "posts": [serialize_post(post) for post in pagination.items],
            "pagination": {
                "page": pagination.page,
                "per_page": pagination.per_page,
                "total": pagination.total,
                "pages": pagination.pages,
            },
        }
    )


@public_api.get("/api/posts/<string:slug>")
def published_post(slug):
    post = Post.query.filter_by(slug=slug, status="published").first_or_404()
    return jsonify({"post": serialize_post(post, include_content=True)})
