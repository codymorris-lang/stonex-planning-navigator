# StoneX Planning Navigator

Financial product campaign planning navigator for StoneX. Helps financial services teams plan and track campaign readiness across service lines and global markets.

## Local Development

```bash
pnpm install
cp .env.example .env
pnpm dev   # db (if enabled) + api + web
```

If `pnpm` or packages are missing, run `corepack enable` and `pnpm install`, then retry the command.

Need to store data? Enable Postgres in the Alli Apps UI, read `DATABASE_URL`
from the environment, and set `LOCAL_POSTGRES=true` in `.env` so `pnpm dev`
starts a real local Postgres for you with no Docker.
See `docs/AGENT_OPTIONAL_SERVICES.md` for required `pg`/Drizzle TLS handling in deployed environments.

Need file storage? Enable S3 in the Alli Apps UI and set `LOCAL_S3=true` in `.env` for local development.
`pnpm dev` starts a local S3-compatible server and writes local storage variables to `.env`.

## Production

```bash
pnpm build
pnpm start
```

Before handing off, run `pnpm check`, `pnpm build`, and `pnpm audit --audit-level low`.

The deployment contract lives in `ALLI_APPS.md` and `docs/AGENT_PLATFORM_CONTRACT.md`.
