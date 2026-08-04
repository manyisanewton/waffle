import click
from flask.cli import with_appcontext

from .extensions import db
from .models import AdminUser, Category, Post, utcnow
from .security import slugify


DEFAULT_CATEGORIES = [
    "Water Treatment",
    "Swimming Pools",
    "Solar Solutions",
    "Pumps & Pressure",
    "Buying Guides",
    "Project Insights",
]


def register_cli(app):
    app.cli.add_command(init_db)
    app.cli.add_command(create_admin)
    app.cli.add_command(seed_categories)
    app.cli.add_command(publish_scheduled)


@click.command("init-db")
@with_appcontext
def init_db():
    """Create database tables for a new installation."""
    db.create_all()
    click.echo("Blog database tables are ready.")


@click.command("create-admin")
@click.option("--email", prompt=True)
@click.option("--name", prompt=True)
@click.password_option(confirmation_prompt=True)
@with_appcontext
def create_admin(email, name, password):
    """Create the first administrator without exposing a password in shell history."""
    normalized_email = email.strip().lower()
    if AdminUser.query.filter_by(email=normalized_email).first():
        raise click.ClickException("An administrator with that email already exists.")
    if len(password) < 12:
        raise click.ClickException("Use a password containing at least 12 characters.")

    user = AdminUser(email=normalized_email, name=name.strip(), role="administrator")
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    click.echo(f"Administrator created for {normalized_email}.")


@click.command("seed-categories")
@with_appcontext
def seed_categories():
    """Add the initial Vortexus editorial categories."""
    created = 0
    for name in DEFAULT_CATEGORIES:
        category_slug = slugify(name)
        if Category.query.filter_by(slug=category_slug).first():
            continue
        db.session.add(Category(name=name, slug=category_slug))
        created += 1
    db.session.commit()
    click.echo(f"Created {created} categories.")


@click.command("publish-scheduled")
@with_appcontext
def publish_scheduled():
    """Publish articles whose scheduled date has arrived. Run from a cPanel cron job."""
    posts = Post.query.filter(
        Post.status == "scheduled",
        Post.scheduled_at.is_not(None),
        Post.scheduled_at <= utcnow(),
    ).all()
    for post in posts:
        post.status = "published"
        post.published_at = post.scheduled_at
    db.session.commit()
    click.echo(f"Published {len(posts)} scheduled articles.")
