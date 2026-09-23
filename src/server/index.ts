import { buildApp } from "./app.js";
import { config } from "./config.js";

const app = buildApp();

const server = app.listen(config.port, config.host, () => {
  console.log(`Listening on http://${config.host}:${config.port}`);
});

server.on("error", (error) => {
  console.error(error);
  process.exit(1);
});
