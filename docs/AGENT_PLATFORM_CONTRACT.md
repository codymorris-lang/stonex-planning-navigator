# Agent Guide: Platform Contract

This template is meant to be copied into an Alli Apps managed repository with minimal changes.
Do not break the deployment contract below.

## Runtime Shape

- Runtime is one Node 24 container from `node:24-slim`.
- The deployed app is one process, one exposed port, and one ECS service.
- The server must bind `0.0.0.0` and listen on `process.env.PORT`, defaulting to `3000` for local use.
- `GET /health` must return HTTP 200 quickly and without authentication.
- Product API routes must live under `/api/*` and return JSON.
- Unknown `/api/*` routes should return a JSON 404 response.
- The built SPA must be served from `dist/client` with `index.html` fallback for non-`/api` routes.

Do not add Docker Compose, extra containers, sidecars, workers, cron jobs, schedulers, queues, or custom infrastructure.
Postgres and S3 are platform-managed services, not containers added to this repo.

## Auth And Config

- Alli auth and app access checks are handled before traffic reaches the app.
- Read signed-in user context from gateway-injected request headers: `X-Alli-User-Id`, `X-Alli-User-Email`, `X-Alli-User-Name`, and `X-Alli-Is-External`.
- `X-Alli-Selected-Client` is an optional entry hint set only after a validated Alli Apps launch with a selected client; use it for initial client preselection, not as durable authorization state.
- `X-Alli-Token` is available server-side for Central/API calls when needed; never return it to browser code or logs.
- Do not parse raw ALB `x-amzn-oidc-*` headers in app code; the managed gateway normalizes identity into trusted `X-Alli-*` headers and strips inbound spoofed `X-Alli-*` values.
- Do not build another login flow unless the platform contract is explicitly changed.
- Read server config and secrets from environment variables at runtime.
- Never commit `.env`, tokens, credentials, customer data, or PMG client-specific assumptions.
- Only `VITE_*` values reach browser code, and those values must be treated as public.

## Build And Image

- `pnpm build` must compile the server to `dist/server` and the SPA to `dist/client`.
- `pnpm start` must run `node dist/server/index.js`.
- The runtime Docker stage must copy `dist`, production `node_modules`, `package.json`, and any runtime migration files the app needs.
- If you add a runtime file outside `dist` or production dependencies, update the Dockerfile in the same change.
- Keep `.dockerignore` from excluding files that the runtime stage must copy.

## GitHub Workflows

- `.github/workflows/ci.yml` and `.github/workflows/build.yml` are thin callers to `pmg-vibecoding/github-workflows`.
- The template build workflow is only a placeholder caller.
- Connected app repos receive app-specific `role-to-assume`, `aws-region`, and `image-uri` values from Alli Apps.
- Do not replace the reusable workflows with hand-authored Docker build or deploy logic.
- Do not add native push triggers to `build.yml`; deployment dispatch is controlled by Alli Apps.

## Local And Production Parity

- Run `pnpm check` and `pnpm build` before handoff.
- If a GitHub Actions check fails, reproduce the closest local equivalent and update the documented command if the repo lacks one.
- If a production boot path needs migrations or seeded files, test that those files are present in the Docker runtime image path.
