import assert from "node:assert/strict";
import test from "node:test";
import sitemap from "../src/app/sitemap";
import {
  getAllArticles,
  getAllCases,
  getArticleBySlug,
  getCaseBySlug
} from "../src/lib/content";

const draftCaseSlug = "001-template-case";
const evidenceCaseSlug = "002-gpt-4o-sycophancy-rollback";
const turn4PublicSlugs = [
  evidenceCaseSlug,
  "003-new-bing-long-session-context-confusion",
  "004-github-copilot-insecure-code-replication"
];
const draftArticleSlug = "001-template-article";
const fixtureCaseSlug = "fixture-fabricated-citation-example";

test("public case queries include the approved corpus and exclude templates and fixtures", () => {
  const publicCases = getAllCases();
  const allCaseFiles = getAllCases({ includeDraft: true });

  assert.equal(publicCases.length, 3);
  assert.equal(publicCases.every((caseItem) => caseItem.draft === false), true);
  assert.equal(publicCases.some((caseItem) => caseItem.slug === draftCaseSlug), false);
  assert.equal(allCaseFiles.some((caseItem) => caseItem.slug === draftCaseSlug), true);
  assert.equal(getCaseBySlug(draftCaseSlug), null);
  assert.equal(getCaseBySlug(draftCaseSlug, { includeDraft: true })?.draft, true);
  for (const slug of turn4PublicSlugs) {
    const caseItem = getCaseBySlug(slug);
    assert.ok(caseItem, slug);
    assert.equal(caseItem.draft, false, slug);
    assert.equal(caseItem.review_status, "approved", slug);
    assert.equal(caseItem.ai_assistance.human_reviewed, true, slug);
    assert.equal(caseItem.publication.eligible, true, slug);
    assert.equal(caseItem.source_links.length, 2, slug);
  }
  assert.equal(
    getCaseBySlug(evidenceCaseSlug)?.verification_status,
    "single_source"
  );
  assert.equal(
    getCaseBySlug("003-new-bing-long-session-context-confusion", { includeDraft: true })
      ?.verification_status,
    "single_source"
  );
  assert.equal(
    getCaseBySlug("004-github-copilot-insecure-code-replication", { includeDraft: true })
      ?.verification_status,
    "multi_source"
  );
  assert.equal(getCaseBySlug(fixtureCaseSlug, { includeDraft: true }), null);
});

test("public article queries exclude draft templates", () => {
  const publicArticles = getAllArticles();
  const allArticleFiles = getAllArticles({ includeDraft: true });

  assert.equal(publicArticles.every((article) => article.draft === false), true);
  assert.equal(publicArticles.some((article) => article.slug === draftArticleSlug), false);
  assert.equal(allArticleFiles.some((article) => article.slug === draftArticleSlug), true);
  assert.equal(getArticleBySlug(draftArticleSlug), null);
  assert.equal(getArticleBySlug(draftArticleSlug, { includeDraft: true })?.draft, true);
});

test("sitemap includes the approved corpus and excludes templates and fixtures", () => {
  const urls = sitemap().map((entry) => entry.url);
  const serialized = urls.join("\n");

  assert.equal(serialized.includes(draftCaseSlug), false);
  for (const slug of turn4PublicSlugs) assert.equal(serialized.includes(slug), true, slug);
  assert.equal(serialized.includes(draftArticleSlug), false);
  assert.equal(serialized.includes("fixture"), false);
  assert.equal(urls.some((url) => url.endsWith("/cases")), true);
  assert.equal(urls.some((url) => url.endsWith("/articles")), true);
});
