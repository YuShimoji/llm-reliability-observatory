import assert from "node:assert/strict";
import test from "node:test";
import { isAdEligiblePage } from "../src/lib/ad-allowlist";

test("allows ads only on substantive published detail pages", () => {
  for (const pathname of ["/cases/approved-case", "/articles/approved-article/"]) {
    assert.equal(
      isAdEligiblePage(pathname, { published: true, hasSubstantiveContent: true }),
      true,
      pathname
    );
  }
});

test("blocks ads on drafts, empty content, home, indexes, policies, and errors", () => {
  const blockedPaths = [
    "/",
    "/cases",
    "/articles",
    "/taxonomy",
    "/methodology",
    "/about",
    "/privacy",
    "/terms",
    "/404",
    "/api/example"
  ];
  for (const pathname of blockedPaths) {
    assert.equal(
      isAdEligiblePage(pathname, { published: true, hasSubstantiveContent: true }),
      false,
      pathname
    );
  }
  assert.equal(
    isAdEligiblePage("/cases/draft-case", { published: false, hasSubstantiveContent: true }),
    false
  );
  assert.equal(
    isAdEligiblePage("/cases/empty-case", { published: true, hasSubstantiveContent: false }),
    false
  );
});
