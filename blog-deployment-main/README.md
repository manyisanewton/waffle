# Vortexus Self-Hosted Blog

Self-hosted Flask editorial platform for Vortexus. The production application is designed for cPanel Python Selector/Passenger and MySQL. Local development defaults to SQLite.

## Included

- Flask application factory and Passenger entry point
- SQLAlchemy models and Alembic/Flask-Migrate support
- Secure cookie-based administrator authentication
- CSRF protection for state-changing browser requests
- Draft, scheduled, published, and archived post states
- Categories, tags, media metadata, revisions, redirects, and audit records
- Public read API and protected administration API
- CLI commands for database setup and administrator creation
- Server-rendered administrator login and editorial dashboard
- Block editor with paragraphs, links, headings, images, lists, quotes, tables, video, CTAs, and dividers
- Draft autosave, protected previews, publishing controls, and revision restoration
- JPEG/PNG/WebP validation with thumbnail, card, hero, and social WebP variants
- Media library with required image alternative text
- Public API integration for the React website with image URLs and origin-restricted CORS

## Local setup

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements-dev.txt
cp .env.example .env
```

For local development, change `.env` to:

```text
BLOG_ENV=development
BLOG_SECRET_KEY=local-development-secret
BLOG_DATABASE_URL=sqlite:///blog.db
BLOG_SESSION_COOKIE_SECURE=0
BLOG_MEDIA_ROOT=instance/media
BLOG_PUBLIC_BASE_URL=http://localhost:5050/blog
```

Initialize and run:

```bash
flask --app app db upgrade
flask --app app seed-categories
flask --app app create-admin
python app.py
```

Health check:

```bash
curl http://127.0.0.1:5050/api/health
```

Open the editorial studio at:

```text
http://127.0.0.1:5050/admin/login
```

## cPanel application settings

```text
Python version: 3.12
Application root: vortexus-blog
Application startup file: passenger_wsgi.py
Application entry point: application
```

Create a cPanel MySQL database and restricted database user, then configure every value from `.env.example` in Python Selector's Environment Variables section. Never upload a production `.env` or commit credentials.

Install dependencies using `requirements.txt`, then initialize or upgrade the production schema with:

```bash
flask --app app db upgrade
flask --app app seed-categories
flask --app app create-admin
```

Set the frontend's `VITE_BLOG_API_URL` to the public application URL (for example, `https://blog.vortexusindustrial.com`) before building the website.

For scheduled publishing, configure a cPanel cron job to activate the application environment and run this command every five minutes:

```bash
flask --app app publish-scheduled
```

## Security notes

- Production startup fails if `BLOG_SECRET_KEY` is missing.
- Passwords use Werkzeug's scrypt password hashing.
- Authentication uses an HTTP-only, SameSite cookie.
- State-changing routes require a CSRF token in production.
- Draft and archived articles are never returned by public endpoints.
- Uploaded images are validated, stripped of unsafe metadata, and transformed into WebP variants.
