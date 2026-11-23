import express from "express";
import { fileURLToPath } from "node:url";
import { latestArticles } from "./articles.js";
import { apiPort } from "../config/api-port.js";

const app = express();
const host = "127.0.0.1";

app.disable("x-powered-by");

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.get("/api/articles", latestArticles);
app.use("/api", (_request, response) => response.sendStatus(404));

if (process.argv.includes("--dev")) {
  const { createServer } = await import("vite");
  const vite = await createServer({
    configLoader: "runner",
    server: { middlewareMode: true },
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(fileURLToPath(new URL("../dist", import.meta.url))));
}

app.listen(apiPort, host, (error) => {
  if (error) {
    console.error(
      `Could not start the API on ${host}:${apiPort}. ${error.message}`,
    );
    process.exitCode = 1;
    return;
  }

  console.log(`Ckredence Wealth API listening at http://${host}:${apiPort}`);
});
