# Dev-Meet Web (Next.js)

This folder is the Next.js frontend shell for the Dev-Meet BFF migration.

## Environment

Create `web/.env.local` from `web/.env.example`.

Required keys:

- `BACKEND_API_URL`: backend base URL used by Next route handlers.
- `NEXT_PUBLIC_WEB_API_BASE_URL`: browser-facing API base (default `/api`).
- `ACCESS_COOKIE_NAME`: httpOnly access-token cookie name.
- `REFRESH_COOKIE_NAME`: httpOnly refresh-token cookie name.
- `COOKIE_SAME_SITE`: `lax`, `strict`, or `none`.
- `COOKIE_DOMAIN`: optional cookie domain.
- `ACCESS_COOKIE_MAX_AGE_MS`: access cookie lifetime in milliseconds.
- `REFRESH_COOKIE_MAX_AGE_MS`: refresh cookie lifetime in milliseconds.
