from datetime import datetime, timezone

from flask_login import UserMixin
from sqlalchemy import CheckConstraint, Index, UniqueConstraint
from sqlalchemy.ext.mutable import MutableDict, MutableList
from werkzeug.security import check_password_hash, generate_password_hash

from .extensions import db


def utcnow():
    return datetime.now(timezone.utc)


post_tags = db.Table(
    "post_tags",
    db.Column("post_id", db.Integer, db.ForeignKey("posts.id", ondelete="CASCADE"), primary_key=True),
    db.Column("tag_id", db.Integer, db.ForeignKey("tags.id", ondelete="CASCADE"), primary_key=True),
)


class TimestampMixin:
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=utcnow)
    updated_at = db.Column(
        db.DateTime(timezone=True), nullable=False, default=utcnow, onupdate=utcnow
    )


class AdminUser(UserMixin, TimestampMixin, db.Model):
    __tablename__ = "admin_users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True, index=True)
    name = db.Column(db.String(160), nullable=False)
    password_hash = db.Column(db.String(512), nullable=False)
    role = db.Column(db.String(30), nullable=False, default="editor")
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    last_login_at = db.Column(db.DateTime(timezone=True))

    posts = db.relationship("Post", back_populates="author", foreign_keys="Post.author_id")

    __table_args__ = (
        CheckConstraint("role IN ('administrator','editor')", name="valid_role"),
    )

    def set_password(self, password):
        self.password_hash = generate_password_hash(password, method="scrypt")

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "role": self.role,
            "is_active": self.is_active,
            "last_login_at": self.last_login_at.isoformat() if self.last_login_at else None,
        }


class Category(TimestampMixin, db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False, unique=True)
    slug = db.Column(db.String(140), nullable=False, unique=True, index=True)
    description = db.Column(db.Text, nullable=False, default="")
    seo_title = db.Column(db.String(180), nullable=False, default="")
    meta_description = db.Column(db.String(320), nullable=False, default="")

    posts = db.relationship("Post", back_populates="category")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "slug": self.slug,
            "description": self.description,
            "seo_title": self.seo_title,
            "meta_description": self.meta_description,
        }


class Tag(TimestampMixin, db.Model):
    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False, unique=True)
    slug = db.Column(db.String(140), nullable=False, unique=True, index=True)

    def to_dict(self):
        return {"id": self.id, "name": self.name, "slug": self.slug}


class MediaAsset(TimestampMixin, db.Model):
    __tablename__ = "media_assets"

    id = db.Column(db.Integer, primary_key=True)
    original_filename = db.Column(db.String(255), nullable=False)
    stored_filename = db.Column(db.String(255), nullable=False, unique=True)
    mime_type = db.Column(db.String(120), nullable=False)
    byte_size = db.Column(db.Integer, nullable=False)
    width = db.Column(db.Integer)
    height = db.Column(db.Integer)
    sha256 = db.Column(db.String(64), nullable=False, index=True)
    variants = db.Column(MutableDict.as_mutable(db.JSON), nullable=False, default=dict)
    alt_text = db.Column(db.String(255), nullable=False, default="")
    caption = db.Column(db.Text, nullable=False, default="")
    uploaded_by_id = db.Column(db.Integer, db.ForeignKey("admin_users.id", ondelete="SET NULL"))

    uploader = db.relationship("AdminUser", foreign_keys=[uploaded_by_id])

    def to_dict(self):
        return {
            "id": self.id,
            "original_filename": self.original_filename,
            "stored_filename": self.stored_filename,
            "mime_type": self.mime_type,
            "byte_size": self.byte_size,
            "width": self.width,
            "height": self.height,
            "variants": self.variants,
            "alt_text": self.alt_text,
            "caption": self.caption,
        }


class Post(TimestampMixin, db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(220), nullable=False)
    slug = db.Column(db.String(240), nullable=False, unique=True, index=True)
    excerpt = db.Column(db.Text, nullable=False, default="")
    content = db.Column(MutableList.as_mutable(db.JSON), nullable=False, default=list)
    status = db.Column(db.String(30), nullable=False, default="draft", index=True)
    author_id = db.Column(db.Integer, db.ForeignKey("admin_users.id", ondelete="RESTRICT"), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey("categories.id", ondelete="SET NULL"))
    featured_image_id = db.Column(db.Integer, db.ForeignKey("media_assets.id", ondelete="SET NULL"))
    og_image_id = db.Column(db.Integer, db.ForeignKey("media_assets.id", ondelete="SET NULL"))
    is_featured = db.Column(db.Boolean, nullable=False, default=False)
    seo_title = db.Column(db.String(180), nullable=False, default="")
    meta_description = db.Column(db.String(320), nullable=False, default="")
    focus_keyword = db.Column(db.String(180), nullable=False, default="")
    canonical_url = db.Column(db.String(500), nullable=False, default="")
    robots_index = db.Column(db.Boolean, nullable=False, default=True)
    published_at = db.Column(db.DateTime(timezone=True), index=True)
    scheduled_at = db.Column(db.DateTime(timezone=True), index=True)

    author = db.relationship("AdminUser", back_populates="posts", foreign_keys=[author_id])
    category = db.relationship("Category", back_populates="posts")
    featured_image = db.relationship("MediaAsset", foreign_keys=[featured_image_id])
    og_image = db.relationship("MediaAsset", foreign_keys=[og_image_id])
    tags = db.relationship("Tag", secondary=post_tags, lazy="selectin")
    revisions = db.relationship(
        "PostRevision", back_populates="post", cascade="all, delete-orphan", order_by="PostRevision.version.desc()"
    )

    __table_args__ = (
        CheckConstraint(
            "status IN ('draft','scheduled','published','archived')",
            name="valid_status",
        ),
        Index("ix_posts_status_published_at", "status", "published_at"),
    )

    def to_dict(self, include_content=False):
        data = {
            "id": self.id,
            "title": self.title,
            "slug": self.slug,
            "excerpt": self.excerpt,
            "status": self.status,
            "author": self.author.to_dict() if self.author else None,
            "category": self.category.to_dict() if self.category else None,
            "tags": [tag.to_dict() for tag in self.tags],
            "featured_image": self.featured_image.to_dict() if self.featured_image else None,
            "og_image": self.og_image.to_dict() if self.og_image else None,
            "is_featured": self.is_featured,
            "seo_title": self.seo_title,
            "meta_description": self.meta_description,
            "focus_keyword": self.focus_keyword,
            "canonical_url": self.canonical_url,
            "robots_index": self.robots_index,
            "published_at": self.published_at.isoformat() if self.published_at else None,
            "scheduled_at": self.scheduled_at.isoformat() if self.scheduled_at else None,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }
        if include_content:
            data["content"] = self.content
        return data


class PostRevision(db.Model):
    __tablename__ = "post_revisions"

    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey("posts.id", ondelete="CASCADE"), nullable=False)
    editor_id = db.Column(db.Integer, db.ForeignKey("admin_users.id", ondelete="SET NULL"))
    version = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(220), nullable=False)
    excerpt = db.Column(db.Text, nullable=False, default="")
    content = db.Column(MutableList.as_mutable(db.JSON), nullable=False, default=list)
    snapshot = db.Column(MutableDict.as_mutable(db.JSON), nullable=False, default=dict)
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=utcnow)

    post = db.relationship("Post", back_populates="revisions")
    editor = db.relationship("AdminUser", foreign_keys=[editor_id])

    __table_args__ = (
        UniqueConstraint("post_id", "version", name="post_revision_version"),
    )

    def to_dict(self):
        return {
            "id": self.id,
            "post_id": self.post_id,
            "version": self.version,
            "title": self.title,
            "excerpt": self.excerpt,
            "editor": self.editor.to_dict() if self.editor else None,
            "created_at": self.created_at.isoformat(),
        }


class Redirect(TimestampMixin, db.Model):
    __tablename__ = "redirects"

    id = db.Column(db.Integer, primary_key=True)
    source_path = db.Column(db.String(500), nullable=False, unique=True)
    destination_path = db.Column(db.String(500), nullable=False)
    status_code = db.Column(db.Integer, nullable=False, default=301)
    is_active = db.Column(db.Boolean, nullable=False, default=True)

    __table_args__ = (
        CheckConstraint("status_code IN (301,302,307,308)", name="valid_status_code"),
    )


class AuditLog(db.Model):
    __tablename__ = "audit_logs"

    id = db.Column(db.Integer, primary_key=True)
    actor_id = db.Column(db.Integer, db.ForeignKey("admin_users.id", ondelete="SET NULL"))
    action = db.Column(db.String(120), nullable=False, index=True)
    entity_type = db.Column(db.String(80), nullable=False)
    entity_id = db.Column(db.Integer)
    details = db.Column(MutableDict.as_mutable(db.JSON), nullable=False, default=dict)
    ip_address = db.Column(db.String(64), nullable=False, default="")
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=utcnow, index=True)

    actor = db.relationship("AdminUser", foreign_keys=[actor_id])
