import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const port = Number(process.env.LRO_REVIEW_PORT ?? "3200");
const rootArgument = process.argv.find((argument) => argument.startsWith("--root="))?.slice(7);
const rootDir = path.resolve(
  process.cwd(),
  rootArgument ?? path.join("samples", "_review", "publication-engine-v2")
);
const contentTypes: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png"
};

const server = http.createServer((request, response) => {
  const requestPath = decodeURIComponent(new URL(request.url ?? "/", `http://127.0.0.1:${port}`).pathname);
  const relativePath = requestPath === "/" ? "index.html" : requestPath.replace(/^\/+/, "");
  const candidate = path.resolve(rootDir, relativePath);
  if (!candidate.startsWith(`${rootDir}${path.sep}`) && candidate !== path.join(rootDir, "index.html")) {
    response.writeHead(403).end("Forbidden");
    return;
  }
  if (!fs.existsSync(candidate) || !fs.statSync(candidate).isFile()) {
    response.writeHead(404).end("Not found");
    return;
  }
  response.setHeader("Content-Type", contentTypes[path.extname(candidate)] ?? "application/octet-stream");
  response.setHeader("Cache-Control", "no-store");
  fs.createReadStream(candidate).pipe(response);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`local review server ready: http://127.0.0.1:${port}/`);
});
