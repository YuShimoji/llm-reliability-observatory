import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("artifact-test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

const env = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};

const ctx = {
  waitUntil() {},
  passThroughOnException() {},
};

async function fetchRoute(pathname) {
  return worker.fetch(
    new Request(new URL(pathname, "http://artifact.local"), {
      headers: { accept: "text/html" },
    }),
    env,
    ctx,
  );
}

test("exports a callable Worker fetch handler and packages explicit hosting state", async () => {
  assert.equal(typeof worker?.fetch, "function");
  const hosting = JSON.parse(
    await readFile(new URL("../dist/.openai/hosting.json", import.meta.url), "utf8"),
  );
  assert.ok(
    hosting.project_id === null ||
      (typeof hosting.project_id === "string" && hosting.project_id.length > 0),
  );
});

test("serves the public routes and excludes blocked content", async () => {
  const publicRoutes = [
    "/",
    "/cases",
    "/cases/002-gpt-4o-sycophancy-rollback",
    "/cases/003-new-bing-long-session-context-confusion",
    "/cases/004-github-copilot-insecure-code-replication",
    "/robots.txt",
    "/sitemap.xml",
  ];
  for (const route of publicRoutes) {
    const response = await fetchRoute(route);
    assert.equal(response.status, 200, route);
  }

  const blockedRoutes = [
    "/cases/001-template-case",
    "/articles/001-template-article",
    "/cases/fixture-context-loss-example",
    "/cases/fixture-debunked-user-ambiguity-example",
    "/cases/fixture-fabricated-citation-example",
    "/cases/fixture-nonexistent-package-example",
    "/cases/fixture-stale-pricing-example",
    "/cases/candidate-gemini-1-5-long-context-report",
  ];
  for (const route of blockedRoutes) {
    const response = await fetchRoute(route);
    assert.equal(response.status, 404, route);
  }
});

test("keeps the three-case sitemap and source links without real ad code", async () => {
  const sitemap = await (await fetchRoute("/sitemap.xml")).text();
  const metadata = [
    await (await fetchRoute("/")).text(),
    await (await fetchRoute("/robots.txt")).text(),
    sitemap,
  ].join("\n");
  assert.doesNotMatch(metadata, /example\.com/i);
  assert.match(
    metadata,
    /https:\/\/llm-reliability-observatory\.thankyoukass\.chatgpt\.site/,
  );
  for (const slug of [
    "002-gpt-4o-sycophancy-rollback",
    "003-new-bing-long-session-context-confusion",
    "004-github-copilot-insecure-code-replication",
  ]) {
    assert.match(sitemap, new RegExp(slug));
  }
  assert.doesNotMatch(sitemap, /001-template-case|context-loss-example/);

  const details = await Promise.all(
    [
      "/cases/002-gpt-4o-sycophancy-rollback",
      "/cases/003-new-bing-long-session-context-confusion",
      "/cases/004-github-copilot-insecure-code-replication",
    ].map(async (route) => (await fetchRoute(route)).text()),
  );
  const html = details.join("\n");
  assert.equal((html.match(/target="_blank"/g) ?? []).length, 6);
  assert.equal((html.match(/rel="noopener noreferrer"/g) ?? []).length, 6);
  assert.doesNotMatch(html, /adsbygoogle|ca-pub-|googlesyndication/i);
});
