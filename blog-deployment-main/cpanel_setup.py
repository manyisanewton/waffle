"""One-time cPanel database and administrator setup.

Configure the BLOG_SETUP_* environment variables in cPanel, run this file from
the Python application's "Execute Python Script" control, then remove the
variables and this file from the server.
"""

import os
from pathlib import Path

from flask_migrate import upgrade

from blog_app import create_app
from blog_app.cli import DEFAULT_CATEGORIES
from blog_app.extensions import db
from blog_app.models import AdminUser, Category
from blog_app.security import slugify


APP_ROOT = Path(__file__).resolve().parent


def required_environment_value(name):
    value = os.environ.get(name, "").strip()
    if not value:
        raise RuntimeError(f"Add the {name} environment variable before running this script.")
    return value


def main():
    if os.environ.get("BLOG_SETUP_CONFIRM", "").strip() != "YES":
        raise RuntimeError("Set BLOG_SETUP_CONFIRM to YES before running this script.")

    email = required_environment_value("BLOG_SETUP_ADMIN_EMAIL").lower()
    name = required_environment_value("BLOG_SETUP_ADMIN_NAME")
    password = required_environment_value("BLOG_SETUP_ADMIN_PASSWORD")
    if len(password) < 12:
        raise RuntimeError("BLOG_SETUP_ADMIN_PASSWORD must contain at least 12 characters.")

    app = create_app()
    with app.app_context():
        upgrade(directory=str(APP_ROOT / "migrations"))

        categories_created = 0
        for category_name in DEFAULT_CATEGORIES:
            category_slug = slugify(category_name)
            if Category.query.filter_by(slug=category_slug).first():
                continue
            db.session.add(Category(name=category_name, slug=category_slug))
            categories_created += 1

        administrator = AdminUser.query.filter_by(email=email).first()
        if administrator is None:
            administrator = AdminUser(email=email, name=name, role="administrator")
            db.session.add(administrator)
            action = "created"
        else:
            administrator.name = name
            administrator.role = "administrator"
            administrator.is_active = True
            action = "password reset"

        administrator.set_password(password)
        db.session.commit()

        print("Database migrations completed.")
        print(f"Created {categories_created} missing categories.")
        print(f"Administrator {action} for {email}.")
        print("SETUP COMPLETE. Remove the BLOG_SETUP_* variables and delete cpanel_setup.py.")


if __name__ == "__main__":
    main()
