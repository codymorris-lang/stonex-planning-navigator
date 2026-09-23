#!/usr/bin/env node
// Local-only S3-compatible object storage for development. NOT shipped in the
// production container.
//
// This starts a tiny local S3-compatible HTTP server on 127.0.0.1:9000 so the
// app uses the real `@aws-sdk/client-s3` locally for normal PutObject/GetObject
// development. No Docker, no LocalStack, nothing to install beyond `pnpm
// install`.
//
// It is a no-op unless LOCAL_S3=true is set in the environment or .env. In
// production the platform provisions an S3 bucket and injects STORAGE_BUCKET +
// AWS_REGION; the app authenticates via its ECS task role and S3_ENDPOINT is
// unset. This script never runs there.

import {
  appendFileSync,
  createReadStream,
  createWriteStream,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  unlinkSync,
} from "node:fs";
import { createServer } from "node:http";
import { dirname, resolve } from "node:path";
import { pipeline } from "node:stream/promises";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..");

const S3_ENDPOINT = "http://localhost:9000";
const STORAGE_BUCKET = "local-dev-bucket";
const AWS_REGION = "us-east-1";
const AWS_ACCESS_KEY_ID = "local";
const AWS_SECRET_ACCESS_KEY = "local";

const LOCAL_ENV = {
  S3_ENDPOINT,
  STORAGE_BUCKET,
  AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
};

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

function ensureEnvHasStorageVars() {
  const envPath = resolve(repoRoot, ".env");
  let current = "";
  if (existsSync(envPath)) {
    current = readFileSync(envPath, "utf8");
  }
  const missing = Object.entries(LOCAL_ENV).filter(
    ([key]) => !new RegExp(`^\\s*${key}=`, "m").test(current),
  );
  if (missing.length === 0) {
    return;
  }
  const lines = missing.map(([key, value]) => `${key}=${value}`).join("\n");
  const prefix = current.length && !current.endsWith("\n") ? "\n" : "";
  appendFileSync(
    envPath,
    `${prefix}# Auto-added by 'pnpm storage:dev' for local development only.\n${lines}\n`,
  );
  console.log(
    `[storage:dev] wrote ${missing.map(([key]) => key).join(", ")} to ${envPath}`,
  );
}

function xmlEscape(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function sendXml(response, statusCode, body) {
  response.writeHead(statusCode, { "content-type": "application/xml" });
  response.end(body);
}

function sendS3Error(response, statusCode, code, message) {
  sendXml(
    response,
    statusCode,
    `<Error><Code>${code}</Code><Message>${xmlEscape(message)}</Message></Error>`,
  );
}

function objectPath(dataDir, keyParts) {
  const bucketDir = resolve(dataDir, STORAGE_BUCKET);
  const target = resolve(bucketDir, ...keyParts);
  if (target !== bucketDir && !target.startsWith(`${bucketDir}/`)) {
    throw new Error("invalid object key");
  }
  return { bucketDir, target };
}

function listObjects(bucketDir, relativeDir = "") {
  const dir = resolve(bucketDir, relativeDir);
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const key = relativeDir ? `${relativeDir}/${entry.name}` : entry.name;
    if (entry.isDirectory()) return listObjects(bucketDir, key);
    return [key];
  });
}

function createLocalS3Server(dataDir) {
  mkdirSync(resolve(dataDir, STORAGE_BUCKET), { recursive: true });

  return createServer(async (request, response) => {
    try {
      const url = new URL(request.url ?? "/", S3_ENDPOINT);
      const pathParts = url.pathname
        .split("/")
        .filter(Boolean)
        .map((part) => decodeURIComponent(part));
      const [bucket, ...keyParts] = pathParts;

      if (!bucket) {
        if (request.method !== "GET") {
          sendS3Error(response, 405, "MethodNotAllowed", "Method not allowed");
          return;
        }
        sendXml(
          response,
          200,
          `<ListAllMyBucketsResult><Buckets><Bucket><Name>${STORAGE_BUCKET}</Name></Bucket></Buckets></ListAllMyBucketsResult>`,
        );
        return;
      }

      if (bucket !== STORAGE_BUCKET) {
        sendS3Error(response, 404, "NoSuchBucket", "Bucket does not exist");
        return;
      }

      const { bucketDir, target } = objectPath(dataDir, keyParts);
      if (keyParts.length === 0) {
        if (request.method === "GET") {
          const contents = listObjects(bucketDir)
            .map((key) => `<Contents><Key>${xmlEscape(key)}</Key></Contents>`)
            .join("");
          sendXml(
            response,
            200,
            `<ListBucketResult><Name>${STORAGE_BUCKET}</Name>${contents}</ListBucketResult>`,
          );
          return;
        }
        if (request.method === "PUT") {
          mkdirSync(bucketDir, { recursive: true });
          response.writeHead(200);
          response.end();
          return;
        }
      }

      if (request.method === "PUT") {
        mkdirSync(dirname(target), { recursive: true });
        await pipeline(request, createWriteStream(target));
        response.writeHead(200, { etag: '"local-dev-etag"' });
        response.end();
        return;
      }

      if (request.method === "GET" || request.method === "HEAD") {
        if (!existsSync(target) || statSync(target).isDirectory()) {
          sendS3Error(response, 404, "NoSuchKey", "Object does not exist");
          return;
        }
        const stat = statSync(target);
        response.writeHead(200, {
          "content-length": stat.size,
          etag: '"local-dev-etag"',
        });
        if (request.method === "HEAD") {
          response.end();
          return;
        }
        createReadStream(target).pipe(response);
        return;
      }

      if (request.method === "DELETE") {
        if (existsSync(target) && !statSync(target).isDirectory())
          unlinkSync(target);
        response.writeHead(204);
        response.end();
        return;
      }

      sendS3Error(response, 405, "MethodNotAllowed", "Method not allowed");
    } catch (error) {
      sendS3Error(response, 400, "BadRequest", error.message);
    }
  });
}

async function main() {
  if (!readEnvFlag("LOCAL_S3")) {
    console.log("[storage:dev] LOCAL_S3 is not true - nothing to start.");
    return;
  }

  const dataDir = resolve(repoRoot, ".storage");
  mkdirSync(dataDir, { recursive: true });

  const server = createLocalS3Server(dataDir);
  await new Promise((resolveListen, rejectListen) => {
    server.once("error", rejectListen);
    server.listen(9000, "127.0.0.1", resolveListen);
  });
  ensureEnvHasStorageVars();
  console.log(
    `[storage:dev] local S3 ready on ${S3_ENDPOINT} (data dir: ${dataDir})`,
  );
  console.log(`[storage:dev] STORAGE_BUCKET=${STORAGE_BUCKET}`);

  const shutdown = () => {
    server.close(() => process.exit(0));
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

main().catch((err) => {
  console.error("[storage:dev] failed to start local S3:", err);
  process.exit(1);
});
