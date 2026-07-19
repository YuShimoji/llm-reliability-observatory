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
const evidenceDraftSlug = "002-gpt-4o-sycophancy-rollback";
const turn4DraftSlugs = [
  evidenceDraftSlug,
  "003-new-bing-long-session-context-confusion",
  "004-github-copilot-insecure-code-replication"
];
const draftArticleSlug = "001-template-article";
const fixtureCaseSlug = "fixture-fabricated-citation-example";

test("public case queries exclude draft templates and fixtures", () => {
  const publicCases = getAllCases();
  const allCaseFiles = getAllCases({ includeDraft: true });

  assert.equal(publicCases.every((caseItem) => caseItem.draft === false), true);
  assert.equal(publicCases.some((caseItem) => caseItem.slug === draftCaseSlug), false);
  assert.equal(publicCases.some((caseItem) => caseItem.slug === evidenceDraftSlug), false);
  assert.equal(allCaseFiles.some((caseItem) => caseItem.slug === draftCaseSlug), true);
  assert.equal(allCaseFiles.some((caseItem) => caseItem.slug === evidenceDraftSlug), true);
  assert.equal(getCaseBySlug(draftCaseSlug), null);
  assert.equal(getCaseBySlug(evidenceDraftSlug), null);
  assert.equal(getCaseBySlug(draftCaseSlug, { includeDraft: true })?.draft, true);
  assert.equal(
    getCaseBySlug(evidenceDraftSlug, { includeDraft: true })?.review_status,
    "pending"
  );
  assert.equal(
    getCaseBySlug(evidenceDraftSlug, { includeDraft: true })?.verification_status,
    "single_source"
  );
  assert.equal(getCaseBySlug(evidenceDraftSlug, { includeDraft: true })?.source_links.length, 2);
  for (const slug of turn4DraftSlugs) {
    const caseItem = getCaseBySlug(slug, { includeDraft: true });
    assert.equal(getCaseBySlug(slug), null, slug);
    assert.equal(caseItem?.draft, true, slug);
    assert.equal(caseItem?.review_status, "pending", slug);
    assert.equal(caseItem?.ai_assistance.human_reviewed, false, slug);
    assert.equal(caseItem?.publication.eligible, false, slug);
  }
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

test("sitemap excludes draft templates and fixtures", () => {
  const urls = sitemap().map((entry) => entry.url);
  const serialized = urls.join("\n");

  assert.equal(serialized.includes(draftCaseSlug), false);
  assert.equal(serialized.includes(evidenceDraftSlug), false);
  for (const slug of turn4DraftSlugs) assert.equal(serialized.includes(slug), false, slug);
  assert.equal(serialized.includes(draftArticleSlug), false);
  assert.equal(serialized.includes("fixture"), false);
  assert.equal(urls.some((url) => url.endsWith("/cases")), true);
  assert.equal(urls.some((url) => url.endsWith("/articles")), true);
});
