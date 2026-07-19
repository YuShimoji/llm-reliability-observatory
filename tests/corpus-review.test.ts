import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

test("generated static corpus review includes an executable reset contract", () => {
  const html = fs.readFileSync(
    path.join(process.cwd(), "samples", "_review", "turn4-mini-corpus", "corpus-review.html"),
    "utf8"
  );
  const markup = html.split("<script>", 1)[0] ?? "";

  assert.equal((markup.match(/data-case-filter=/g) ?? []).length, 4);
  assert.equal((markup.match(/data-case-filter-item="true"/g) ?? []).length, 3);
  assert.equal((markup.match(/data-corpus-detail="true"/g) ?? []).length, 3);
  assert.match(markup, /data-case-filter-reset="true"/);
  assert.match(html, /reset\?\.addEventListener\('click'/);
  assert.match(html, /control\.value = ''/);
  assert.match(html, /apply\(\)/);
});
