import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import {
  parseHostingConfig,
  readHostingConfig,
} from "../build/sites-vite-plugin.ts";

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

const allowedHostingFields = new Set(["project_id", "d1", "r2"]);
const sensitiveHostingField =
  /authorization|bearer|credential|password|private|secret|token/i;

function assertSafeBoundHosting(hosting) {
  assert.deepEqual(
    Object.keys(hosting).filter((key) => !allowedHostingFields.has(key)),
    [],
  );
  assert.deepEqual(
    Object.keys(hosting).filter((key) => sensitiveHostingField.test(key)),
    [],
  );
  assert.equal(typeof hosting.project_id, "string");
  assert.ok(hosting.project_id.trim().length > 0);
  for (const key of ["d1", "r2"]) {
    if (key in hosting) {
      assert.ok(
        hosting[key] === null ||
          (typeof hosting[key] === "string" && hosting[key].trim().length > 0),
      );
    }
  }
}

test("exports a callable Worker fetch handler and packages the exact safe binding", async () => {
  assert.equal(typeof worker?.fetch, "function");
  const sourceHosting = JSON.parse(
    await readFile(new URL("../.openai/hosting.json", import.meta.url), "utf8"),
  );
  const artifactHosting = JSON.parse(
    await readFile(new URL("../dist/.openai/hosting.json", import.meta.url), "utf8"),
  );
  assertSafeBoundHosting(sourceHosting);
  assertSafeBoundHosting(artifactHosting);
  assert.deepEqual(artifactHosting, sourceHosting);
});

test("fails closed for missing, unbound, unexpected, or sensitive hosting state", async () => {
  assert.throws(() => parseHostingConfig({ project_id: null }));
  assert.throws(() => parseHostingConfig({ project_id: "test-id", extra: true }));
  assert.throws(() => parseHostingConfig({ project_id: "test-id", token: "redacted" }));

  const temporaryRoot = await mkdtemp(join(tmpdir(), "lro-hosting-test-"));
  try {
    await assert.rejects(() => readHostingConfig(temporaryRoot));
  } finally {
    await rm(temporaryRoot, { recursive: true, force: true });
  }
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

test("exposes no runtime image optimizer or native image dependency", async () => {
  for (const path of [
    "/_vinext/image?url=%2Funtrusted.gif&w=640&q=75",
    "/_next/image?url=%2Funtrusted.gif&w=640&q=75",
  ]) {
    const response = await fetchRoute(path);
    assert.equal(response.status, 404, path);
  }

  const workerArtifact = await readFile(
    new URL("../dist/server/index.js", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(
    workerArtifact,
    /handleImageOptimization|vinext\/server\/image-optimization|libvips|@img\/sharp|sharp\.node/i,
  );
});
