import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { lintEditorialContent } from "../src/lib/editorial-lint";

function withTempContent(callback: (cwd: string) => void) {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "lro-editorial-"));
  try {
    callback(cwd);
  } finally {
    fs.rmSync(cwd, { force: true, recursive: true });
  }
}

function writeFile(cwd: string, relativePath: string, source: string) {
  const filePath = path.join(cwd, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, source, "utf8");
}

test("detects email, phone, api-key-like strings, and derogatory terms as errors", () => {
  withTempContent((cwd) => {
    writeFile(
      cwd,
      "content/cases/error-example.mdx",
      `---
title: "安全確認用"
slug: "error-example"
date: "2026-05-26"
draft: false
---

## 状況
連絡先は test@example.com、03-1234-5678、sk-abcdefghijklmnopqrstuvwxyz123456。
ゴミ、ポンコツ、最低、失敗作。
`
    );

    const result = lintEditorialContent(cwd);
    const rules = result.diagnostics.map((diagnostic) => diagnostic.rule);
    const matches = result.diagnostics.map((diagnostic) => diagnostic.match);

    assert.equal(result.errorCount, 7);
    assert.equal(result.warningCount, 0);
    assert.ok(rules.includes("personal-email"));
    assert.ok(rules.includes("phone-number"));
    assert.ok(rules.includes("api-key"));
    for (const term of ["ゴミ", "ポンコツ", "最低", "失敗作"]) {
      assert.ok(matches.includes(term), term);
    }
  });
});

test("reports context-sensitive editorial terms as warnings only", () => {
  withTempContent((cwd) => {
    writeFile(
      cwd,
      "content/articles/warning-example.mdx",
      `---
title: "安全確認用"
slug: "warning-example"
date: "2026-05-26"
draft: false
---

## 観察
劣化、嘘、捏造、欠陥、絶対に、必ず、明らかに、間違いなく。
`
    );

    const result = lintEditorialContent(cwd);
    const matches = result.diagnostics.map((diagnostic) => diagnostic.match);

    assert.equal(result.errorCount, 0);
    assert.equal(result.warningCount, 8);
    for (const term of [
      "劣化",
      "嘘",
      "捏造",
      "欠陥",
      "絶対に",
      "必ず",
      "明らかに",
      "間違いなく"
    ]) {
      assert.ok(matches.includes(term), term);
    }
  });
});

test("ignores fixtures and classification frontmatter while keeping taxonomy terms non-error", () => {
  withTempContent((cwd) => {
    writeFile(
      cwd,
      "content/_fixtures/ignored.mdx",
      `---
title: "Fixture"
---

## 状況
fixture@example.com と ゴミ。
`
    );
    writeFile(
      cwd,
      "content/cases/classification-frontmatter.mdx",
      `---
title: "安全確認用"
slug: "classification-frontmatter"
date: "2026-05-26"
primary_failure_category: "捏造"
draft: false
---

## 状況
安全な本文。
`
    );
    writeFile(
      cwd,
      "content/taxonomy/index.mdx",
      `---
title: "Taxonomy"
---

## 分類名
引用捏造
`
    );

    const result = lintEditorialContent(cwd);

    assert.equal(result.errorCount, 0);
    assert.equal(result.warningCount, 1);
    assert.equal(result.diagnostics[0]?.file, path.join("content", "taxonomy", "index.mdx"));
    assert.equal(result.diagnostics[0]?.match, "捏造");
  });
});
