# AGENTS.md

This is an Alli Apps TypeScript template: a React 18 + Vite 8 SPA served by one Express 5 TypeScript server in one Node 24 container.

Use `pnpm` only.
This is a single package with `pnpm@11.7.0`; `pnpm-workspace.yaml` is package-manager config, not a monorepo declaration.

Useful commands:
- `pnpm install`: install dependencies after cloning or when a package is missing.
- `cp .env.example .env`: create local runtime config before `pnpm dev`.
- `pnpm dev`: run local Postgres and S3 emulators if enabled, plus API and Vite dev server.
- `pnpm dev:api`: run the Express server on `PORT` or `3000` with watch mode.
- `pnpm dev:web`: run Vite and proxy `/api` plus `/health` to the API.
- `pnpm check`: run Biome and TypeScript checks.
- `pnpm build`: build `dist/server` and `dist/client` exactly as production expects.
- `pnpm start`: run the production server from `dist/server/index.js` after `pnpm build`.
- `pnpm audit --audit-level low`: check dependency advisories before handoff when dependencies change.

Required CI gates before handoff:
- Run `pnpm check` for the Biome and TypeScript gate.
- Run `pnpm build` for the production server and frontend build gate.
- Run `pnpm audit --audit-level low` when dependencies change.

Do not claim a change is ready for CI until the relevant gates above pass locally. If a gate cannot be run, state the exact command, the blocker, and the risk before handoff.

If a command fails because dependencies or tools are missing, install the repo dependencies and retry before handing the problem back to the user.
Use Corepack-managed pnpm rather than npm or yarn.

Repo-wide rules:
- Preserve the Alli Apps contract in `ALLI_APPS.md` and `docs/AGENT_PLATFORM_CONTRACT.md`.
- Keep one container, one process, one exposed `PORT`, and one ECS service.
- Keep health checks at unauthenticated `GET /health` and product API routes under `/api/*`.
- Serve the built SPA from `dist/client` and keep SPA fallback for non-`/api` routes.
- Read signed-in user context from gateway-injected `X-Alli-*` headers; do not parse ALB `x-amzn-oidc-*` headers or build a login flow.
- Read runtime config from environment variables and never commit `.env`, secrets, tokens, or customer data.
- Treat browser-bundled `VITE_*` values as public.
- Do not add Docker Compose, sidecars, background workers, cron jobs, queues, custom infrastructure, or product-specific PMG client assumptions.
- Do not hand-edit deployment workflow logic; connected apps receive app-specific build workflow inputs from Alli Apps.

Environment variable rules (Alli Apps scans this repo to build the app's settings list):
- Every env var a deployed app needs a human to provide (API keys, external service URLs, and similar) must be listed in `.env.example` with a comment saying what it is and where to get it.
- Local-development-only toggles must use the `LOCAL_` or `ENABLE_LOCAL_` prefix and must not be read in production code paths.
- Internal tuning knobs must have code defaults (for example `process.env.NAME ?? 'default'` or a config-module default) and must not appear in `.env.example`.
- Never read `PORT`, `DATABASE_URL`, `STORAGE_BUCKET`, or `AWS_REGION` as if user-supplied and never add them to `.env.example`; the platform provides them.

Project layout:
- `src/client/`: Vite SPA source.
- `src/server/`: Express entrypoint, app, routes, and config.
- `scripts/`: local-only Postgres and S3 emulator helpers used by `pnpm dev`.
- `.github/workflows/`: thin reusable-workflow callers only.
- `docs/AGENT_PLATFORM_CONTRACT.md`: deploy, routing, auth, workflow, and image requirements.
- `docs/AGENT_OPTIONAL_SERVICES.md`: Postgres, migrations, and S3 guidance.

Before changing storage, migrations, auth, Docker, workflows, routes, ports, or environment variables, read the focused docs above.
Keep `README.md`, `.env.example`, `ALLI_APPS.md`, and those docs in sync with behavior changes.

Record significant architectural decisions in `.agents/MEMORY.md`, especially when tradeoffs or reasoning are not apparent from the code.
