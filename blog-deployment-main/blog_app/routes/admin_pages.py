from flask import Blueprint, redirect, render_template, request, url_for
from flask_login import current_user, login_required
from flask_wtf.csrf import generate_csrf
from sqlalchemy import func

from ..extensions import db
from ..models import Category, MediaAsset, Post


admin_pages = Blueprint("admin_pages", __name__)


def media_map_for_post(post):
    media_ids = {
        block.get("media_id")
        for block in (post.content or [])
        if block.get("type") == "image" and block.get("media_id")
    }
    assets = MediaAsset.query.filter(MediaAsset.id.in_(media_ids)).all() if media_ids else []
    return {asset.id: asset for asset in assets}


@admin_pages.get("/admin/login")
def login_page():
    if current_user.is_authenticated:
        return redirect(url_for("admin_pages.dashboard"))
    return render_template("admin/login.html", csrf_token=generate_csrf())


@admin_pages.get("/admin")
@login_required
def dashboard():
    status_counts = dict(
        db.session.query(Post.status, func.count(Post.id)).group_by(Post.status).all()
    )
    posts = Post.query.order_by(Post.updated_at.desc()).limit(100).all()
    return render_template(
        "admin/dashboard.html",
        posts=posts,
        status_counts=status_counts,
        csrf_token=generate_csrf(),
    )


@admin_pages.get("/admin/posts/new")
@login_required
def new_post():
    return render_template(
        "admin/editor.html",
        post=None,
        categories=Category.query.order_by(Category.name.asc()).all(),
        csrf_token=generate_csrf(),
    )


@admin_pages.get("/admin/posts/<int:post_id>/edit")
@login_required
def edit_post(post_id):
    post = db.get_or_404(Post, post_id)
    return render_template(
        "admin/editor.html",
        post=post,
        categories=Category.query.order_by(Category.name.asc()).all(),
        csrf_token=generate_csrf(),
    )


@admin_pages.get("/admin/preview/<int:post_id>")
@login_required
def preview_post(post_id):
    post = db.get_or_404(Post, post_id)
    return render_template(
        "admin/preview.html",
        post=post,
        media_map=media_map_for_post(post),
    )
