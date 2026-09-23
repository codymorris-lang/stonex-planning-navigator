# Alli Apps Contract

This file is the deployment contract for agents and developers working on this Alli Apps template.

## Platform Shape

- Template type: React 18 + Vite 8 SPA with a TypeScript Express 5 API.
- Runtime: one Node 24 container, one process, one exposed port, one ECS service.
- Port: `3000`, read from `PORT`. Alli Apps detects/configures this in the UI.
- Health check path: `/health`, unauthenticated, fast, and always returning HTTP 200 when the process is healthy.
- GitHub workflows: keep `.github/workflows/ci.yml` and `.github/workflows/build.yml` calling `pmg-vibecoding/github-workflows` reusable workflows. Alli Apps replaces or completes app-specific build inputs when the repo is connected.
- Production entrypoint: `node dist/server/index.js`, as defined by `package.json` and `Dockerfile`.

## Application Boundaries

- Keep browser code under `src/client/` and server code under `src/server/`.
- Put product API routes under `/api/*` so SPA fallback and platform routing stay predictable.
- Keep Vite output at `dist/client` and compiled server output at `dist/server` unless the server and Dockerfile are updated together.
- Do not add Docker Compose, extra containers, workers, cron jobs, queues, sidecars, or custom infrastructure.
- Storage: if the app needs to persist data, enable Postgres in the Alli Apps UI and read `DATABASE_URL` from the environment. The platform provisions a managed Postgres and injects `DATABASE_URL`; do not run your own database container or write to the ephemeral container filesystem. If using `pg`/Drizzle, normalize `sslmode=require` as described in `docs/AGENT_OPTIONAL_SERVICES.md` before opening a pool. Run migrations at startup in the single deployed process. See `docs/AGENT_OPTIONAL_SERVICES.md` for local-dev and ORM details.
- Do not add product-specific credentials, customer data, analytics keys, or PMG client-specific assumptions to the template.

## Configuration And Secrets

- Keep runtime config in environment variables.
- Do not commit `.env` files or secret values.
- Browser-readable configuration must use `VITE_*` names and must never contain secrets.
- Server-only secrets must stay server-side and be read from `process.env` at runtime.
- If a generated app needs runtime secrets, configure them in the Alli Apps UI so Alli Apps can provision them.
- Keep `.env.example` and `README.md` in sync when changing environment variables.

## Dependency And Build Expectations

- Use pnpm and keep `pnpm-lock.yaml` committed.
- Keep React on 18 unless the generated app has a tested reason to upgrade.
- Keep Express as the server framework for this template unless the deployment contract is intentionally changed.
- Keep frontend build dependencies in `devDependencies`; runtime dependencies should be limited to packages imported by the compiled server.
- Run `pnpm check`, `pnpm build`, and `pnpm audit --audit-level low` before handing off dependency or deploy-shape changes.
- Keep `AGENTS.md`, `README.md`, `docs/AGENT_PLATFORM_CONTRACT.md`, and `docs/AGENT_OPTIONAL_SERVICES.md` in sync when commands, env vars, routes, or deployment shape change.
