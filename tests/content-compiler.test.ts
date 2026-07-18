import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import test from "node:test";
import {
  compileCaseSource,
  compileContent,
  serializeRegistry,
  writeRegistry
} from "../scripts/lib/content-compiler";
import { MarkdownBody } from "../src/components/MarkdownBody";
import { SourceLinks } from "../src/components/SourceLinks";

const requiredBody = `## 状況
限定された状況。

## 期待していた回答
根拠を明示した回答。

## 実際の回答または要約
観測された回答の要約。

## 誤りと判断した根拠
公式資料による確認。

## 再現条件
独立再現は未実施。

## 分類根拠
限定された分類根拠。

## 反証考察
一般化できない条件を記録。

## 編集後記
公開前レビューが必要。

## 出典・参考リンク
構造化リンクを参照。`;

function validCaseSource(options: {
  draftLine?: string;
  reviewStatus?: "pending" | "approved";
  sourceLinks?: string;
  body?: string;
  summary?: string;
} = {}) {
  return `---
title: "Compiler test case"
slug: "compiler-test-case"
date: "2025-04-25"
case_kind: "documented_regression"
review_status: "${options.reviewStatus ?? "approved"}"
last_verified_at: "2026-07-18"
model_vendor: "Example vendor"
model_product: "Example product"
model_version: "1"
version_is_estimated: false
surface: "chat"
plan: "unknown"
task_category: "research"
primary_failure_category: "sycophancy"
secondary_failure_categories:
  - "context_loss"
severity: "sev1"
verification_status: "single_source"
reproducibility: "not_attempted"
public_summary: "${options.summary ?? "Bounded summary for compiler validation."}"
${options.sourceLinks ?? `source_links:
  - label: "Official incident report"
    url: "https://vendor.invalid/incident"
    source_type: "official"
    accessed_at: "2026-07-18"`}
disclosure: null
ai_assistance:
  used: true
  disclosure: "AI-assisted compiler test fixture."
  human_reviewed: true
${options.draftLine === undefined ? "draft: false" : options.draftLine}
---

${options.body ?? requiredBody}
`;
}

test("parses multiline YAML arrays and structured source links", () => {
  const result = compileCaseSource(validCaseSource(), "virtual/approved.mdx");
  assert.equal(result.fatal, false);
  assert.equal(result.record?.source_links.length, 1);
  assert.equal(result.record?.source_links[0]?.source_type, "official");
  assert.deepEqual(result.record?.secondary_failure_categories, ["context_loss"]);
  assert.equal(result.record?.publication.eligible, true);
});

test("missing draft and pending review are never publication eligible", () => {
  const missingDraft = compileCaseSource(
    validCaseSource({ draftLine: "" }),
    "virtual/missing-draft.mdx"
  );
  const pending = compileCaseSource(
    validCaseSource({ reviewStatus: "pending" }),
    "virtual/pending.mdx"
  );

  assert.equal(missingDraft.record?.draft, true);
  assert.equal(missingDraft.record?.publication.eligible, false);
  assert.ok(missingDraft.record?.publication.blockers.includes("missing_draft"));
  assert.equal(pending.record?.publication.eligible, false);
  assert.ok(pending.record?.publication.blockers.includes("review_not_approved"));
});

test("approved publication intent fails closed on placeholders, headings, sources, and URLs", () => {
  const candidates = [
    validCaseSource({ summary: "TODO placeholder" }),
    validCaseSource({ body: requiredBody.replace(/## 反証考察[\s\S]*?## 編集後記/, "## 編集後記") }),
    validCaseSource({ sourceLinks: "source_links: []" }),
    validCaseSource({
      sourceLinks: `source_links:
  - label: "Broken URL"
    url: "not-a-url"
    source_type: "official"
    accessed_at: "2026-07-18"`
    })
  ];

  for (const [index, source] of candidates.entries()) {
    const result = compileCaseSource(source, `virtual/invalid-${index}.mdx`);
    assert.equal(result.fatal, true, `candidate ${index}`);
    assert.notEqual(result.record?.publication.eligible, true, `candidate ${index}`);
  }
});

test("content compilation is deterministic for identical input", () => {
  const first = serializeRegistry(compileContent(process.cwd()).registry);
  const second = serializeRegistry(compileContent(process.cwd()).registry);
  assert.equal(first, second);
});

test("content records are stable across LF and CRLF checkouts", () => {
  const lf = validCaseSource();
  const crlf = lf.replace(/\n/g, "\r\n");
  const lfResult = compileCaseSource(lf, "virtual/lf.mdx");
  const crlfResult = compileCaseSource(crlf, "virtual/lf.mdx");

  assert.deepEqual(crlfResult, lfResult);
  assert.equal(crlfResult.record?.body.includes("\r"), false);
});

test("registry writer does not rewrite an equivalent CRLF checkout", () => {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), "lro-registry-"));
  try {
    const registry = compileContent(process.cwd()).registry;
    const outputPath = path.join(rootDir, "src", "generated", "content-registry.json");
    const crlf = serializeRegistry(registry).replace(/\n/g, "\r\n");
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, crlf, "utf8");

    const result = writeRegistry(rootDir, registry);

    assert.equal(result.changed, false);
    assert.equal(fs.readFileSync(outputPath, "utf8"), crlf);
  } finally {
    fs.rmSync(rootDir, { recursive: true, force: true });
  }
});

test("blocked legacy Gemini candidate is documentation only, not a publication candidate", () => {
  const registry = compileContent(process.cwd()).registry;
  const legacySlug = "001-nonexistent-feature-guidance";
  const intake = fs.readFileSync(
    path.join(process.cwd(), "docs", "PUBLIC_CASE_INPUT_TEMPLATE.md"),
    "utf8"
  );

  assert.equal(registry.cases.some((record) => record.slug === legacySlug), false);
  assert.match(intake, /blocked_legacy_candidate/);
  assert.match(intake, /現行のactive gate、compiler入力、公開候補ではありません/);
});

test("structured source links render as safe external links", () => {
  const result = compileCaseSource(validCaseSource(), "virtual/render.mdx");
  const markup = renderToStaticMarkup(
    createElement(SourceLinks, { links: result.record?.source_links ?? [] })
  );
  assert.match(markup, /https:\/\/vendor\.invalid\/incident/);
  assert.match(markup, /target="_blank"/);
  assert.match(markup, /rel="noopener noreferrer"/);
  assert.match(markup, /accessed 2026-07-18/);
  assert.equal(renderToStaticMarkup(createElement(MarkdownBody, { source: "" })).includes("TODO"), false);
});

test("runtime application source has no filesystem or cwd dependency", () => {
  const roots = ["src/app", "src/components", "src/lib"];
  const files = roots.flatMap((root) => listFiles(path.join(process.cwd(), root)));
  const violations = files.flatMap((file) => {
    const source = fs.readFileSync(file, "utf8");
    return /node:fs|process\.cwd\(\)/.test(source) ? [path.relative(process.cwd(), file)] : [];
  });
  assert.deepEqual(violations, []);
});

function listFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(fullPath) : [fullPath];
  });
}
