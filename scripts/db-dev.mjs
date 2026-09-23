#!/usr/bin/env node
// Local-only Postgres for development. NOT shipped in the production container.
//
// This starts an embedded PostgreSQL (PGlite, Postgres compiled to WASM) and
// exposes it over a real TCP socket on 127.0.0.1:5432, so any normal Postgres
// client (`pg`, Drizzle, psql, psycopg, SQLAlchemy, ...) connects unchanged.
//
// It is a no-op unless LOCAL_POSTGRES=true is set in the environment or .env.
// In production the platform provisions Postgres and injects DATABASE_URL
// itself; this script never runs there.
//
// Requires no Docker and nothing to install beyond `pnpm install`.

import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..");

// Default local connection string. PGlite's socket server presents the standard
// `postgres` superuser and `postgres` database; SSL is not supported locally.
const LOCAL_DATABASE_URL =
  "postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable";

function readEnvFlag(name) {
  if (process.env[name]) {
    return process.env[name] === "true";
  }
  const path = resolve(repoRoot, ".env");
  try {
    const match = readFileSync(path, "utf8").match(
      new RegExp(`^\\s*${name}=(true|false)\\s*$`, "m"),
    );
    return match?.[1] === "true";
  } catch {
    return false;
  }
}

function ensureEnvHasDatabaseUrl() {
  const envPath = resolve(repoRoot, ".env");
  let current = "";
  if (existsSync(envPath)) {
    current = readFileSync(envPath, "utf8");
  }
  if (/^\s*DATABASE_URL=/m.test(current)) {
    return; // respect a value the developer already set
  }
  const prefix = current.length && !current.endsWith("\n") ? "\n" : "";
  appendFileSync(
    envPath,
    `${prefix}# Auto-added by 'pnpm db:dev' for local development only.\nDATABASE_URL=${LOCAL_DATABASE_URL}\n`,
  );
  console.log(`[db:dev] wrote DATABASE_URL to ${envPath}`);
}

async function main() {
  if (!readEnvFlag("LOCAL_POSTGRES")) {
    console.log("[db:dev] LOCAL_POSTGRES is not true - nothing to start.");
    return;
  }

  // Imported lazily so apps without a database never need these dev deps loaded.
  const { PGlite } = await import("@electric-sql/pglite");
  const { PGLiteSocketServer } = await import("@electric-sql/pglite-socket");

  const dataDir = resolve(repoRoot, ".pglite");
  mkdirSync(dataDir, { recursive: true });

  const db = await PGlite.create({ dataDir });
  const server = new PGLiteSocketServer({
    db,
    host: "127.0.0.1",
    port: 5432,
    // Allow a small connection pool from the app; PGlite multiplexes over its
    // single underlying connection.
    maxConnections: 10,
  });

  await server.start();
  ensureEnvHasDatabaseUrl();
  console.log(
    `[db:dev] local Postgres ready on 127.0.0.1:5432 (data dir: ${dataDir})`,
  );
  console.log(`[db:dev] DATABASE_URL=${LOCAL_DATABASE_URL}`);

  const shutdown = async () => {
    try {
      await server.stop();
      await db.close();
    } finally {
      process.exit(0);
    }
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

main().catch((err) => {
  console.error("[db:dev] failed to start local Postgres:", err);
  process.exit(1);
});
