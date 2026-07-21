import assert from "node:assert/strict";
import test from "node:test";
import {
  EMPTY_CASE_FILTERS,
  describeCaseRelation,
  filterCases,
  getCaseFilterOptions,
  getRelatedCases
} from "../src/lib/case-explorer";
import { getAllCases } from "../src/lib/content";

const corpusSlugs = [
  "002-gpt-4o-sycophancy-rollback",
  "003-new-bing-long-session-context-confusion",
  "004-github-copilot-insecure-code-replication"
];

function getCorpus() {
  return getAllCases({ includeDraft: true }).filter((caseItem) => corpusSlugs.includes(caseItem.slug));
}

test("filters the curated corpus by explicit metadata only", () => {
  const corpus = getCorpus();
  assert.equal(corpus.length, 3);
  assert.equal(filterCases(corpus, EMPTY_CASE_FILTERS).length, 3);
  assert.deepEqual(
    filterCases(corpus, { ...EMPTY_CASE_FILTERS, vendor: "Microsoft" }).map((item) => item.slug),
    ["003-new-bing-long-session-context-confusion"]
  );
  assert.deepEqual(
    filterCases(corpus, { ...EMPTY_CASE_FILTERS, verificationStatus: "multi_source" }).map(
      (item) => item.slug
    ),
    ["004-github-copilot-insecure-code-replication"]
  );
  assert.equal(
    filterCases(corpus, {
      ...EMPTY_CASE_FILTERS,
      category: "context_loss",
      caseKind: "reproduction_test"
    }).length,
    0
  );
});

test("exposes deterministic filter options for the corpus", () => {
  const options = getCaseFilterOptions(getCorpus());
  assert.deepEqual(options.categories, ["coding_accident", "context_loss", "sycophancy"]);
  assert.deepEqual(options.vendors, ["GitHub", "Microsoft", "OpenAI"]);
  assert.deepEqual(options.verificationStatuses, ["multi_source", "single_source"]);
});

test("related cases use only category, vendor, and case kind matches", () => {
  const corpus = getCorpus();
  const openAiCase = corpus.find((item) => item.slug === corpusSlugs[0]);
  const bingCase = corpus.find((item) => item.slug === corpusSlugs[1]);
  const copilotCase = corpus.find((item) => item.slug === corpusSlugs[2]);
  assert.ok(openAiCase && bingCase && copilotCase);

  assert.deepEqual(getRelatedCases(corpus, openAiCase).map((item) => item.slug), [bingCase.slug]);
  assert.equal(describeCaseRelation(openAiCase, bingCase), "kind: documented_regression");
  assert.deepEqual(getRelatedCases(corpus, copilotCase), []);
});
