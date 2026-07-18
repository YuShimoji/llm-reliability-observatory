import fs from "node:fs";
import path from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CaseCard } from "../src/components/CaseCard";
import { CaseDetail } from "../src/components/CaseDetail";
import { SourceLinks } from "../src/components/SourceLinks";
import registryData from "../src/generated/content-registry.json";
import type { ContentRegistry } from "./lib/content-compiler";

const registry = registryData as unknown as ContentRegistry;
const slug = process.argv.find((argument) => argument.startsWith("--slug="))?.slice(7) ??
  "002-gpt-4o-sycophancy-rollback";
const caseItem = registry.cases.find((record) => record.slug === slug);

if (!caseItem) throw new Error(`Case not found in generated registry: ${slug}`);
if (!caseItem.draft || caseItem.review_status !== "pending" || caseItem.publication.eligible) {
  throw new Error("Local review generation is restricted to blocked pending drafts.");
}

const rootDir = process.cwd();
const cssDirectory = path.join(rootDir, ".next", "static", "css");
if (!fs.existsSync(cssDirectory)) {
  throw new Error("Production CSS is missing. Run npm run build before npm run review:generate.");
}

function listCssFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return listCssFiles(fullPath);
    return entry.isFile() && entry.name.endsWith(".css") ? [fullPath] : [];
  });
}

const applicationCss = listCssFiles(cssDirectory)
  .sort()
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");
const reviewCss = `
  body { margin: 0; background: #f7f5ef; color: #17201b; }
  .review-shell { min-height: 100vh; }
  .review-frame { max-width: 1180px; margin: 0 auto; padding: 32px 20px 64px; }
  .review-label { margin: 0 0 20px; color: #9a4f34; font: 700 12px/1.5 ui-monospace, monospace; letter-spacing: .14em; text-transform: uppercase; }
`;

function document(title: string, markup: string) {
  return `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <title>${title}</title>
  <style>${applicationCss}\n${reviewCss}</style>
</head>
<body data-local-review="true">
  <div class="review-shell">${markup}</div>
</body>
</html>\n`;
}

const outputDirectory = path.join(rootDir, "samples", "_review", "publication-engine-v2", slug);
fs.mkdirSync(outputDirectory, { recursive: true });
const cardMarkup = renderToStaticMarkup(
  <main className="review-frame">
    <p className="review-label">Local review artifact / case card / not approved</p>
    <div className="max-w-2xl">
      <CaseCard caseItem={caseItem} href={null} />
    </div>
  </main>
);
const detailMarkup = renderToStaticMarkup(
  <main className="review-frame">
    <p className="review-label">Local review artifact / case detail / not approved</p>
    <CaseDetail caseItem={caseItem} relatedCases={[]} reviewMode showAds={false} />
  </main>
);
const sourceLinksMarkup = renderToStaticMarkup(
  <main className="review-frame">
    <p className="review-label">Local review artifact / source links / not approved</p>
    <section className="max-w-3xl">
      <h1 className="text-2xl font-semibold text-ink">出典・参考リンク</h1>
      <p className="mb-8 mt-3 text-sm leading-6 text-smoke">
        公開草稿の事実関係を支える構造化一次資料。リンク先、種別、最終確認日を人間が確認する。
      </p>
      <SourceLinks links={caseItem.source_links} />
    </section>
  </main>
);
const indexMarkup = `<main class="review-frame">
  <p class="review-label">Publication Engine v2 / local review only</p>
  <h1>${caseItem.title}</h1>
  <ul><li><a href="case-card.html">Case card</a></li><li><a href="case-detail.html">Case detail</a></li><li><a href="source-links.html">Source links</a></li></ul>
  <p>This diagnostic artifact is not publication approval and is not a production route.</p>
</main>`;

fs.writeFileSync(path.join(outputDirectory, "case-card.html"), document(`${caseItem.title} / card`, cardMarkup));
fs.writeFileSync(
  path.join(outputDirectory, "case-detail.html"),
  document(`${caseItem.title} / detail`, detailMarkup)
);
fs.writeFileSync(
  path.join(outputDirectory, "source-links.html"),
  document(`${caseItem.title} / sources`, sourceLinksMarkup)
);
fs.writeFileSync(path.join(outputDirectory, "index.html"), document(`${caseItem.title} / review`, indexMarkup));

console.log(`local review HTML generated: ${path.relative(rootDir, outputDirectory)}`);
