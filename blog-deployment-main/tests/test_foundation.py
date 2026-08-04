import io
import re

from PIL import Image


def png_upload():
    buffer = io.BytesIO()
    Image.new("RGB", (1600, 900), "#0d7ce8").save(buffer, "PNG")
    buffer.seek(0)
    return buffer


def test_health_reports_database(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.get_json()["database"] == "ok"
    assert response.headers["X-Content-Type-Options"] == "nosniff"


def test_public_api_allows_configured_frontend_origin(client, app):
    app.config["BLOG_ALLOWED_ORIGINS"] = ["https://vortexusindustrial.com"]
    response = client.get(
        "/api/posts", headers={"Origin": "https://vortexusindustrial.com"}
    )
    assert response.headers["Access-Control-Allow-Origin"] == "https://vortexusindustrial.com"
    assert "Origin" in response.headers["Vary"]


def test_public_api_rejects_unknown_origin(client, app):
    app.config["BLOG_ALLOWED_ORIGINS"] = ["https://vortexusindustrial.com"]
    response = client.get("/api/posts", headers={"Origin": "https://example.com"})
    assert "Access-Control-Allow-Origin" not in response.headers


def test_admin_endpoint_requires_login(client):
    response = client.get("/api/admin/posts")
    assert response.status_code == 401
    page_response = client.get("/admin")
    assert page_response.status_code == 302
    assert "/admin/login" in page_response.headers["Location"]


def test_login_rejects_wrong_password(client):
    response = client.post(
        "/api/auth/login",
        json={"email": "editor@example.com", "password": "wrong-password"},
    )
    assert response.status_code == 401
    assert response.get_json()["error"] == "Invalid email or password."


def test_draft_is_private_until_published(authenticated_client):
    create_response = authenticated_client.post(
        "/api/admin/posts",
        json={
            "title": "Choosing a Water Treatment System",
            "excerpt": "A practical selection guide.",
            "content": [{"type": "paragraph", "content": "Start with a water test."}],
            "meta_description": "Learn how to choose a suitable water treatment system.",
        },
    )
    assert create_response.status_code == 201
    post = create_response.get_json()["post"]
    assert post["status"] == "draft"
    assert post["slug"] == "choosing-a-water-treatment-system"

    private_response = authenticated_client.get(f"/api/posts/{post['slug']}")
    assert private_response.status_code == 404

    publish_response = authenticated_client.patch(
        f"/api/admin/posts/{post['id']}", json={"status": "published"}
    )
    assert publish_response.status_code == 200
    assert publish_response.get_json()["post"]["published_at"]

    public_response = authenticated_client.get(f"/api/posts/{post['slug']}")
    assert public_response.status_code == 200
    assert public_response.get_json()["post"]["content"][0]["type"] == "paragraph"


def test_duplicate_titles_receive_unique_slugs(authenticated_client):
    first = authenticated_client.post("/api/admin/posts", json={"title": "Solar Pumps"})
    second = authenticated_client.post("/api/admin/posts", json={"title": "Solar Pumps"})
    assert first.get_json()["post"]["slug"] == "solar-pumps"
    assert second.get_json()["post"]["slug"] == "solar-pumps-2"


def test_published_noindex_post_remains_public(authenticated_client):
    response = authenticated_client.post(
        "/api/admin/posts",
        json={"title": "Private Search Preview", "status": "published", "robots_index": False},
    )
    post = response.get_json()["post"]
    public_response = authenticated_client.get(f"/api/posts/{post['slug']}")
    assert public_response.status_code == 200
    assert public_response.get_json()["post"]["robots_index"] is False


def test_rich_content_is_sanitized_and_autosave_does_not_create_revision(authenticated_client):
    created = authenticated_client.post(
        "/api/admin/posts",
        json={
            "title": "Safe Water Guide",
            "content": [
                {
                    "type": "paragraph",
                    "html": '<strong>Useful</strong><script>alert(1)</script><a href="javascript:alert(2)">bad</a>',
                },
                {"type": "unsupported", "content": "discard me"},
            ],
        },
    ).get_json()["post"]
    assert "<script" not in created["content"][0]["html"]
    assert "javascript:" not in created["content"][0]["html"]
    assert len(created["content"]) == 1

    autosave = authenticated_client.patch(
        f"/api/admin/posts/{created['id']}",
        json={"excerpt": "Autosaved text", "_autosave": True},
    )
    assert autosave.status_code == 200
    revisions = authenticated_client.get(
        f"/api/admin/posts/{created['id']}/revisions"
    ).get_json()["revisions"]
    assert revisions == []

    authenticated_client.patch(
        f"/api/admin/posts/{created['id']}", json={"excerpt": "Manually saved text"}
    )
    revisions = authenticated_client.get(
        f"/api/admin/posts/{created['id']}/revisions"
    ).get_json()["revisions"]
    assert len(revisions) == 1


def test_media_upload_creates_webp_variants(authenticated_client, app):
    missing_alt = authenticated_client.post(
        "/api/admin/media",
        data={"file": (png_upload(), "water-system.png")},
        content_type="multipart/form-data",
    )
    assert missing_alt.status_code == 400

    response = authenticated_client.post(
        "/api/admin/media",
        data={
            "file": (png_upload(), "water-system.png"),
            "alt_text": "Blue water treatment system",
            "caption": "Test installation",
        },
        content_type="multipart/form-data",
    )
    assert response.status_code == 201
    asset = response.get_json()["media"]
    assert set(asset["variants"]) == {"thumbnail", "card", "hero", "social"}
    assert asset["urls"]["thumbnail"].endswith("thumbnail.webp")

    media_response = authenticated_client.get(asset["urls"]["thumbnail"])
    assert media_response.status_code == 200
    assert media_response.content_type == "image/webp"

    post = authenticated_client.post(
        "/api/admin/posts",
        json={
            "title": "Article with image",
            "content": [{"type": "image", "media_id": asset["id"], "alt": asset["alt_text"]}],
        },
    ).get_json()["post"]
    assert post["content"][0]["media_id"] == asset["id"]
    delete_response = authenticated_client.delete(f"/api/admin/media/{asset['id']}")
    assert delete_response.status_code == 409


def test_editor_page_renders_for_authenticated_user(authenticated_client):
    response = authenticated_client.get("/admin/posts/new")
    assert response.status_code == 200
    assert b"vortexus-logo.png" in response.data
    assert b"Article content" in response.data
    assert b"Search appearance" in response.data


def test_real_csrf_login_and_logout_flow(tmp_path):
    from blog_app import create_app
    from blog_app.extensions import db
    from blog_app.models import AdminUser

    app = create_app(
        {
            "TESTING": True,
            "SECRET_KEY": "csrf-test-secret",
            "SQLALCHEMY_DATABASE_URI": f"sqlite:///{tmp_path / 'csrf.db'}",
            "SQLALCHEMY_ENGINE_OPTIONS": {},
            "WTF_CSRF_ENABLED": True,
            "WTF_CSRF_SSL_STRICT": False,
            "BLOG_MEDIA_ROOT": str(tmp_path / "csrf-media"),
            "SESSION_COOKIE_SECURE": False,
        }
    )
    with app.app_context():
        db.create_all()
        user = AdminUser(email="csrf@example.com", name="CSRF Editor", role="administrator")
        user.set_password("correct-horse-battery-staple")
        db.session.add(user)
        db.session.commit()

    client = app.test_client()
    login_page = client.get("/admin/login")
    assert b"vortexus-logo.png" in login_page.data
    login_token = re.search(rb'name="csrf-token" content="([^"]+)"', login_page.data).group(1).decode()
    login = client.post(
        "/api/auth/login",
        json={"email": "csrf@example.com", "password": "correct-horse-battery-staple"},
        headers={"X-CSRFToken": login_token},
    )
    assert login.status_code == 200

    dashboard = client.get("/admin")
    assert dashboard.status_code == 200
    logout_token = re.search(rb'name="csrf-token" content="([^"]+)"', dashboard.data).group(1).decode()
    logout = client.post("/api/auth/logout", headers={"X-CSRFToken": logout_token})
    assert logout.status_code == 200


def test_scheduled_publish_command(authenticated_client, app):
    created = authenticated_client.post(
        "/api/admin/posts",
        json={
            "title": "Scheduled Water Guide",
            "status": "scheduled",
            "scheduled_at": "2026-01-01T08:00:00Z",
        },
    ).get_json()["post"]
    assert authenticated_client.get(f"/api/posts/{created['slug']}").status_code == 404

    result = app.test_cli_runner().invoke(args=["publish-scheduled"])
    assert result.exit_code == 0
    assert "Published 1 scheduled articles." in result.output
    assert authenticated_client.get(f"/api/posts/{created['slug']}").status_code == 200


def test_preview_renders_supported_editor_blocks(authenticated_client):
    created = authenticated_client.post(
        "/api/admin/posts",
        json={
            "title": "Complete Editor Preview",
            "excerpt": "Preview every supported editorial block.",
            "content": [
                {"type": "paragraph", "html": "A <strong>clear</strong> introduction."},
                {"type": "heading", "level": 2, "text": "Selection guidance"},
                {"type": "list", "style": "numbered", "items": ["Test water", "Select equipment"]},
                {"type": "quote", "text": "Design around the water analysis.", "attribution": "Vortexus"},
                {"type": "table", "has_header": True, "rows": [["Option", "Use"], ["RO", "Salinity"]]},
                {"type": "video", "url": "https://www.youtube.com/watch?v=test", "caption": "System guide"},
                {"type": "cta", "title": "Need help?", "text": "Talk to our team.", "button_label": "Request quote", "button_url": "/request-quote"},
                {"type": "divider"},
            ],
        },
    ).get_json()["post"]
    preview = authenticated_client.get(f"/admin/preview/{created['id']}")
    assert preview.status_code == 200
    assert b"Complete Editor Preview" in preview.data
    assert b"Selection guidance" in preview.data
    assert b"Request quote" in preview.data


def test_dynamic_sitemap_rss_redirects_and_seo_validation(authenticated_client):
    created = authenticated_client.post(
        "/api/admin/posts",
        json={
            "title": "Complete Water Treatment Selection Guide",
            "excerpt": "A practical guide to selecting treatment equipment.",
            "seo_title": "Water Treatment Equipment Selection Guide Kenya",
            "meta_description": "Learn how to select suitable water treatment equipment in Kenya using water analysis, capacity, operating cost and maintenance requirements.",
            "content": [{"type": "heading", "level": 2, "text": "Start with water analysis"}],
            "status": "published",
        },
    ).get_json()["post"]

    validation = authenticated_client.get(
        f"/api/admin/posts/{created['id']}/seo-validation"
    ).get_json()
    assert validation == {"valid": True, "issues": []}
    assert created["slug"].encode() in authenticated_client.get("/sitemap.xml").data
    assert created["title"].encode() in authenticated_client.get("/rss.xml").data

    redirect = authenticated_client.post(
        "/api/admin/redirects",
        json={"source_path": "/blog/old-guide", "destination_path": f"/blog/{created['slug']}"},
    )
    assert redirect.status_code == 201
    resolved = authenticated_client.get(
        "/api/redirects/resolve?path=/blog/old-guide"
    ).get_json()["redirect"]
    assert resolved["status_code"] == 301
    unsafe_redirect = authenticated_client.post(
        "/api/admin/redirects",
        json={"source_path": "/blog/unsafe", "destination_path": "https://example.com/phishing"},
    )
    assert unsafe_redirect.status_code == 400


def test_public_post_hides_admin_email_and_rejects_invalid_canonical(authenticated_client):
    invalid = authenticated_client.post(
        "/api/admin/posts",
        json={"title": "Canonical URL Safety Test Article", "canonical_url": "javascript:alert(1)"},
    )
    assert invalid.status_code == 400

    created = authenticated_client.post(
        "/api/admin/posts",
        json={
            "title": "Public Author Privacy Test Article",
            "excerpt": "A public author privacy test.",
            "status": "published",
        },
    ).get_json()["post"]
    public = authenticated_client.get(f"/api/posts/{created['slug']}").get_json()["post"]
    assert public["author"]["name"] == "Test Editor"
    assert "email" not in public["author"]


def test_seo_validation_requires_image_alt_and_proxy_headers_are_opt_in(authenticated_client, app):
    created = authenticated_client.post(
        "/api/admin/posts",
        json={
            "title": "Image Alternative Text Validation Guide",
            "excerpt": "An article used to validate image alternative text.",
            "seo_title": "Image Alternative Text Validation Guide Kenya",
            "meta_description": "Learn why descriptive alternative text supports accessible water treatment articles and helps search engines understand important editorial images.",
            "content": [{"type": "image", "media_id": None, "alt": ""}],
        },
    ).get_json()["post"]
    result = authenticated_client.get(f"/api/admin/posts/{created['id']}/seo-validation").get_json()
    assert result["valid"] is False
    assert any("alternative text" in issue for issue in result["issues"])

    from blog_app.security import client_ip
    app.config["BLOG_TRUST_PROXY_HEADERS"] = False
    with app.test_request_context(headers={"X-Forwarded-For": "198.51.100.9"}, environ_base={"REMOTE_ADDR": "127.0.0.1"}):
        assert client_ip() == "127.0.0.1"
