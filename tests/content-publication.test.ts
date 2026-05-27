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
const draftArticleSlug = "001-template-article";
const fixtureCaseSlug = "fixture-fabricated-citation-example";

test("public case queries exclude draft templates and fixtures", () => {
  const publicCases = getAllCases();
  const allCaseFiles = getAllCases({ includeDraft: true });

  assert.equal(publicCases.every((caseItem) => caseItem.draft === false), true);
  assert.equal(publicCases.some((caseItem) => caseItem.slug === draftCaseSlug), false);
  assert.equal(allCaseFiles.some((caseItem) => caseItem.slug === draftCaseSlug), true);
  assert.equal(getCaseBySlug(draftCaseSlug), null);
  assert.equal(getCaseBySlug(draftCaseSlug, { includeDraft: true })?.draft, true);
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
  assert.equal(serialized.includes(draftArticleSlug), false);
  assert.equal(serialized.includes("fixture"), false);
  assert.equal(urls.some((url) => url.endsWith("/cases")), true);
  assert.equal(urls.some((url) => url.endsWith("/articles")), true);
});
