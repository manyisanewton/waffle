import pytest

from blog_app import create_app
from blog_app.extensions import db
from blog_app.models import AdminUser


@pytest.fixture()
def app(tmp_path):
    application = create_app(
        {
            "TESTING": True,
            "SECRET_KEY": "test-secret",
            "SQLALCHEMY_DATABASE_URI": f"sqlite:///{tmp_path / 'test.db'}",
            "SQLALCHEMY_ENGINE_OPTIONS": {},
            "WTF_CSRF_ENABLED": False,
            "BLOG_MEDIA_ROOT": str(tmp_path / "media"),
            "SESSION_COOKIE_SECURE": False,
        }
    )

    with application.app_context():
        db.create_all()
        user = AdminUser(
            email="editor@example.com",
            name="Test Editor",
            role="administrator",
        )
        user.set_password("correct-horse-battery-staple")
        db.session.add(user)
        db.session.commit()

    yield application

    with application.app_context():
        db.session.remove()
        db.drop_all()


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def authenticated_client(client):
    response = client.post(
        "/api/auth/login",
        json={"email": "editor@example.com", "password": "correct-horse-battery-staple"},
    )
    assert response.status_code == 200
    return client

