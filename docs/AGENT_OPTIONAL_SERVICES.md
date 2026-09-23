# Agent Guide: Optional Services

Use platform services when the app needs persistence.
Do not write important data to the container filesystem because it is ephemeral.

## Postgres

Enable Postgres for the app in Alli Apps when the app needs relational data.
The platform provisions managed Postgres and injects `DATABASE_URL` in staging and production.

Local development needs no Docker.
Set `LOCAL_POSTGRES=true` in `.env`, then `pnpm dev` or `pnpm db:dev` starts PGlite on `localhost:5432` and writes `DATABASE_URL` to `.env` if it is missing.
Data persists under gitignored `.pglite/`.

Recommended TypeScript stack:
- `drizzle-orm` plus `pg` for application queries.
- `drizzle-kit` for migrations.
- Startup migrations in the single server process before accepting traffic.

If you use `pg` or Drizzle against the platform URL, normalize `sslmode=require` before opening a pool.
`pg` needs `uselibpqcompat=true` for libpq-compatible TLS behavior.

```ts
function getPgConnectionString(connectionString: string) {
  const url = new URL(connectionString);
  if (url.searchParams.get("sslmode") === "require") {
    url.searchParams.set("uselibpqcompat", "true");
  }
  return url.toString();
}
```

Pass `getPgConnectionString(process.env.DATABASE_URL)` to `pg` or Drizzle.

When adding migrations, make sure they ship in the runtime image.
`tsc` does not copy Drizzle SQL files or `meta/_journal.json` into `dist`.
If the migration folder is `drizzle/`, add this to the runtime stage of `Dockerfile`:

```dockerfile
COPY --from=build /app/drizzle ./drizzle
```

Keep the Docker path in sync with `drizzle.config.ts` and the path passed to `migrate()`.

Only use a local Docker Postgres when PGlite lacks a required extension or concurrency behavior.
Do not add a database container to the deployed app.

## S3 Storage

Enable S3 storage for the app in Alli Apps when the app needs files, uploads, exports, or generated artifacts.
The platform provisions a bucket and injects `STORAGE_BUCKET` plus `AWS_REGION` in staging and production.
Production auth uses the ECS task role, so there are no AWS access keys in production.

Local development needs no Docker.
Set `LOCAL_S3=true` in `.env`, then `pnpm dev` or `pnpm storage:dev` starts an S3-compatible server on `http://localhost:9000` and writes local storage variables to `.env` if they are missing.
Files persist under gitignored `.storage/`.

Use the real AWS SDK:

```ts
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.S3_ENDPOINT,
  forcePathStyle: !!process.env.S3_ENDPOINT,
});
```

`S3_ENDPOINT` is local-only.
When it is unset in production, the SDK talks to real S3 with task-role credentials.

Minimal upload and download:

```ts
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

const Bucket = process.env.STORAGE_BUCKET;

await s3.send(new PutObjectCommand({ Bucket, Key: "hello.txt", Body: "hi there" }));

const obj = await s3.send(new GetObjectCommand({ Bucket, Key: "hello.txt" }));
const text = await obj.Body.transformToString();
```

Never store uploaded or generated files only on the container filesystem.
