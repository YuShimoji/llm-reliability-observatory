import assert from "node:assert/strict";
import test from "node:test";
import { isAdAllowedPath } from "../src/lib/ad-allowlist";

const allowedPaths = [
  "/",
  "/?utm_source=test",
  "/cases/example-case",
  "/cases/example-case/",
  "/articles/example-article",
  "/taxonomy",
  "/taxonomy/fabricated-citation",
  "/methodology",
  "/methodology/verification"
];

const disallowedPaths = [
  "/cases",
  "/articles",
  "/about",
  "/privacy",
  "/terms",
  "/removal-request",
  "/disclosures",
  "/submit",
  "/admin",
  "/admin/review",
  "/admin/review/queue",
  "/api",
  "/api/example",
  "/api/example?x=1"
];

test("allows ads only on approved static and detail paths", () => {
  for (const pathname of allowedPaths) {
    assert.equal(isAdAllowedPath(pathname), true, pathname);
  }
});

test("blocks ads on index, policy, admin, submit, and api paths", () => {
  for (const pathname of disallowedPaths) {
    assert.equal(isAdAllowedPath(pathname), false, pathname);
  }
});
