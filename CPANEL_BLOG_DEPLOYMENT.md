# Vortexus Blog — cPanel Deployment

## Deployment addresses

- Private test API/editor: `https://blog-test.vortexusindustrial.com`
- Public website: `https://vortexusindustrial.com/blog`
- Production API/editor after approval: `https://blog.vortexusindustrial.com`

The React website owns `/blog`. The Flask application must use a subdomain; mounting Passenger directly at `/blog` would replace the React blog route.

## 1. Create the private test application

1. In cPanel, create the subdomain `blog-test.vortexusindustrial.com` and point its DNS A record to the cPanel server.
2. Run AutoSSL after DNS resolves.
3. Open **Setup Python App** and create an application with:
   - Python: 3.12
   - Application root: `vortexus-blog-test`
   - Application URL: `blog-test.vortexusindustrial.com`
   - Startup file: `passenger_wsgi.py`
   - Entry point: `application`
4. Upload and extract `vortexus-blog-backend-cpanel.zip` into the application root.

## 2. Create MySQL

In **MySQL Databases**:

1. Create a database such as `vortexus_blog_test`.
2. Create a dedicated user such as `vortexus_blog_user` with a new strong password.
3. Add that user to the database with **ALL PRIVILEGES**.
4. Keep the fully prefixed cPanel database and user names.

## 3. Configure environment variables

Add these in **Setup Python App**. Do not upload `.env`.

```text
BLOG_ENV=production
BLOG_SECRET_KEY=<generate-a-random-value-of-at-least-48-characters>
BLOG_DATABASE_URL=mysql+pymysql://CPANEL_DB_USER:URL_ENCODED_PASSWORD@localhost/CPANEL_DB_NAME
BLOG_SESSION_COOKIE_SECURE=1
BLOG_SESSION_HOURS=8
BLOG_MAX_UPLOAD_MB=15
BLOG_MEDIA_ROOT=/home/CPANEL_USER/vortexus-blog-test-media
BLOG_PUBLIC_BASE_URL=https://vortexusindustrial.com/blog
BLOG_ALLOWED_ORIGINS=https://vortexusindustrial.com,https://www.vortexusindustrial.com
```

## 4. Install and initialize

Select `requirements.txt` under **Configuration files**, run **Pip Install**, then use cPanel Terminal:

```bash
source /home/CPANEL_USER/virtualenv/vortexus-blog-test/3.12/bin/activate
cd /home/CPANEL_USER/vortexus-blog-test
flask --app app db upgrade
flask --app app seed-categories
flask --app app create-admin
```

Restart the application. Verify:

```text
https://blog-test.vortexusindustrial.com/api/health
https://blog-test.vortexusindustrial.com/admin/login
https://blog-test.vortexusindustrial.com/sitemap.xml
https://blog-test.vortexusindustrial.com/rss.xml
```

## 5. Acceptance tests

1. Sign in as an administrator.
2. Create a draft with H2 and H3 headings, a link, list, table and CTA.
3. Upload JPEG, PNG and WebP images with useful alternative text.
4. Preview, publish and confirm the article appears on `/blog`.
5. Confirm the page source contains a canonical URL and JSON-LD Article/Breadcrumb data after the production frontend build.
6. Rename a test slug, create a 301 redirect and verify the former URL resolves to the new URL.
7. Check mobile layout, sticky table of contents and image lightbox.

## 6. Publish the frontend

Build with:

```text
VITE_BLOG_API_URL=https://blog-test.vortexusindustrial.com
```

Upload the contents of `vortexus-frontend-cpanel.zip` to the website document root for private testing. After approval, change the value to `https://blog.vortexusindustrial.com`, rebuild and upload the final frontend.

## 7. Go live

1. Recreate or rename the tested Python app at `blog.vortexusindustrial.com`.
2. Use a production database and production secret.
3. Run migrations and create the real administrator.
4. Publish the final frontend build.
5. Submit both sitemaps in Google Search Console:
   - `https://vortexusindustrial.com/sitemap.xml`
   - `https://blog.vortexusindustrial.com/sitemap.xml`
6. Do not delete the old blog source until redirects for every indexed legacy URL have been verified.

