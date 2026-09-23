import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { config } from "./config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function buildApp() {
  const app = express();

  app.use(express.json());

  app.get("/health", (_request, response) => response.json({ ok: true }));
  app.get("/api/hello", (_request, response) =>
    response.json({ message: `Hello from ${config.appName}` }),
  );
  app.get("/api/me", (request, response) => {
    const userId = request.headers["x-alli-user-id"] ?? null;
    return response.json({
      authenticated: Boolean(userId),
      userId,
      email: request.headers["x-alli-user-email"] ?? null,
      name: request.headers["x-alli-user-name"] ?? null,
      isExternal: request.headers["x-alli-is-external"] === "true",
      selectedClient: request.headers["x-alli-selected-client"] ?? null,
    });
  });

  const clientDist = path.resolve(__dirname, "../client");
  if (existsSync(clientDist)) {
    app.use(express.static(clientDist));
    app.use((request, response) => {
      if (request.path.startsWith("/api/")) {
        return response.status(404).json({ error: "not_found" });
      }
      return response.sendFile(path.join(clientDist, "index.html"));
    });
  }

  return app;
}
