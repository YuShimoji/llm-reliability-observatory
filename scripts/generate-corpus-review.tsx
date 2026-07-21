import fs from "node:fs";
import path from "node:path";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CaseDetail } from "../src/components/CaseDetail";
import { CaseExplorer } from "../src/components/CaseExplorer";
import {
  describeCaseRelation,
  getRelatedCases
} from "../src/lib/case-explorer";
import registryData from "../src/generated/content-registry.json";
import type { ContentRegistry } from "./lib/content-compiler";

type MatrixCandidate = {
  proposed_slug: string;
  document_count: number;
  source_origin_count: number;
  independent_reproduction: boolean;
  directly_supported_claims: string[];
  not_established: string[];
  counterevidence_or_limits: string[];
  decision: string;
};

type EvidenceMatrix = {
  candidates: MatrixCandidate[];
};

const rootDir = process.cwd();
const outputDirectory = path.join(rootDir, "samples", "_review", "turn4-mini-corpus");
const matrixPath = path.join(outputDirectory, "corpus-evidence-matrix.json");
const registry = registryData as unknown as ContentRegistry;
const matrix = JSON.parse(fs.readFileSync(matrixPath, "utf8")) as EvidenceMatrix;
const adoptedSlugs = new Set(
  matrix.candidates
    .filter((candidate) => candidate.decision === "adopt" || candidate.decision === "adopt_existing_pending_draft")
    .map((candidate) => candidate.proposed_slug)
);
const cases = registry.cases.filter((caseItem) => adoptedSlugs.has(caseItem.slug));

if (cases.length < 3 || cases.length > 5) {
  throw new Error(`Turn 4 review requires 3-5 adopted cases; found ${cases.length}.`);
}
for (const caseItem of cases) {
  const pendingReview = caseItem.draft && caseItem.review_status === "pending" && !caseItem.publication.eligible;
  const approvedReview =
    !caseItem.draft &&
    caseItem.review_status === "approved" &&
    caseItem.ai_assistance.human_reviewed &&
    caseItem.publication.eligible;
  if (!pendingReview && !approvedReview) {
    throw new Error(`Corpus review requires a safe pending or approved state: ${caseItem.slug}`);
  }
}
const allCasesApproved = cases.every((caseItem) => caseItem.publication.eligible);

const cssDirectory = path.join(rootDir, ".next", "static", "css");
if (!fs.existsSync(cssDirectory)) {
  throw new Error("Production CSS is missing. Run npm run build before generating corpus review.");
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
  .review-frame { max-width: 1180px; margin: 0 auto; padding: 32px 20px 80px; }
  .review-label { color: #9a4f34; font: 700 12px/1.5 ui-monospace, monospace; letter-spacing: .14em; text-transform: uppercase; }
  .review-intro { border-left: 4px solid #9a4f34; background: rgba(154,79,52,.08); padding: 20px; }
  .review-case { margin-top: 64px; border-top: 2px solid rgba(23,32,27,.16); padding-top: 24px; }
  .evidence-boundary { margin: 24px auto; max-width: 896px; border: 1px solid rgba(23,32,27,.12); background: rgba(255,255,255,.65); padding: 20px; }
  .evidence-boundary ul { margin: 8px 0 0; padding-left: 20px; }
  .evidence-boundary li { margin-top: 6px; }
  [hidden] { display: none !important; }
`;

const filterScript = `
(() => {
  const explorer = document.querySelector('[data-case-explorer="true"]');
  if (!explorer) return;
  const controls = [...explorer.querySelectorAll('[data-case-filter]')];
  const cards = [...explorer.querySelectorAll('[data-case-filter-item="true"]')];
  const details = [...document.querySelectorAll('[data-corpus-detail="true"]')];
  const count = explorer.querySelector('[data-case-result-count="true"]');
  const reset = explorer.querySelector('[data-case-filter-reset="true"]');
  const dataKeys = { category: 'category', vendor: 'vendor', verificationStatus: 'verificationStatus', caseKind: 'caseKind' };
  const apply = () => {
    const filters = Object.fromEntries(controls.map((control) => [control.dataset.caseFilter, control.value]));
    let visible = 0;
    for (const item of [...cards, ...details]) {
      const matches = Object.entries(filters).every(([key, value]) => !value || item.dataset[dataKeys[key]] === value);
      item.hidden = !matches;
      if (cards.includes(item) && matches) visible += 1;
    }
    if (count) count.textContent = visible + ' of ' + cards.length + ' cases';
  };
  controls.forEach((control) => control.addEventListener('change', apply));
  reset?.addEventListener('click', () => {
    controls.forEach((control) => { control.value = ''; });
    apply();
  });
  apply();
})();
`;

function EvidenceBoundary({ candidate }: { candidate: MatrixCandidate }) {
  return (
    <aside className="evidence-boundary" data-evidence-boundary="true">
      <p className="review-label">Evidence boundary</p>
      <p className="mt-3 text-sm text-smoke">
        Documents {candidate.document_count} · source origins {candidate.source_origin_count} · independent reproduction {String(candidate.independent_reproduction)}
      </p>
      <h3 className="mt-5 text-lg font-semibold text-ink">Directly supported</h3>
      <ul className="text-sm leading-6 text-smoke">
        {candidate.directly_supported_claims.map((claim) => <li key={claim}>{claim}</li>)}
      </ul>
      <h3 className="mt-5 text-lg font-semibold text-ink">Not established</h3>
      <ul className="text-sm leading-6 text-smoke">
        {candidate.not_established.map((claim) => <li key={claim}>{claim}</li>)}
      </ul>
      <h3 className="mt-5 text-lg font-semibold text-ink">Counterevidence and limits</h3>
      <ul className="text-sm leading-6 text-smoke">
        {candidate.counterevidence_or_limits.map((claim) => <li key={claim}>{claim}</li>)}
      </ul>
    </aside>
  );
}

const caseSections = cases.map((caseItem) => {
  const candidate = matrix.candidates.find((entry) => entry.proposed_slug === caseItem.slug);
  if (!candidate) throw new Error(`Evidence matrix entry missing: ${caseItem.slug}`);
  const relatedCases = getRelatedCases(cases, caseItem);
  return (
    <section
      key={caseItem.slug}
      id={`case-${caseItem.slug}`}
      className="review-case"
      data-corpus-detail="true"
      data-category={caseItem.primary_failure_category}
      data-vendor={caseItem.model_vendor}
      data-verification-status={caseItem.verification_status}
      data-case-kind={caseItem.case_kind}
    >
      <EvidenceBoundary candidate={candidate} />
      <CaseDetail
        caseItem={caseItem}
        relatedCases={relatedCases}
        reviewMode
        showAds={false}
        relatedCaseHrefForCase={(related) => `#case-${related.slug}`}
        relatedCaseLabelForCase={(related) => describeCaseRelation(caseItem, related)}
      />
    </section>
  );
});

const markup = renderToStaticMarkup(
  <main className="review-frame">
    <header className="review-intro">
      <p className="review-label">
        Turn 4 / local-only corpus review / {allCasesApproved ? "owner-approved source state" : "not approved"}
      </p>
      <h1 className="mt-4 text-3xl font-semibold text-ink">Evidence-Backed Mini Corpus</h1>
      <p className="mt-4 max-w-4xl text-base leading-7 text-smoke">
        3件の{allCasesApproved ? "publication-eligible case" : "pending draft"}をproduction componentで一括比較する診断面です。外部配備、公開URL、統計的な市場代表性を意味しません。
      </p>
      <p className="mt-3 text-sm text-smoke">
        全caseは{allCasesApproved ? " project owner/editor承認済みでsource/build上の公開適格状態" : " draft true / review_status pending"}です。広告配信、投稿、保存、認証機能はありません。
      </p>
      <nav className="mt-5 flex flex-wrap gap-3 text-sm font-semibold text-moss">
        <a href="corpus-evidence-matrix.md" className="underline">Evidence matrix (Markdown)</a>
        <a href="corpus-evidence-matrix.json" className="underline">Evidence matrix (JSON)</a>
        <a href="corpus-readback.md" className="underline">Readback</a>
      </nav>
    </header>
    <section className="mt-10">
      <h2 className="text-2xl font-semibold text-ink">Compare and filter</h2>
      <p className="mt-3 text-sm leading-6 text-smoke">Filters use exact metadata matches. They do not infer semantic similarity or causality.</p>
      <div className="mt-5"><CaseExplorer cases={cases} reviewMode staticResetControl /></div>
    </section>
    {caseSections}
  </main>
);

const html = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <title>Turn 4 Mini Corpus Review</title>
  <style>${applicationCss}\n${reviewCss}</style>
</head>
<body data-local-review="true" data-corpus-review="true">
${markup}
<script>${filterScript}</script>
</body>
</html>\n`;

fs.mkdirSync(outputDirectory, { recursive: true });
fs.writeFileSync(path.join(outputDirectory, "corpus-review.html"), html, "utf8");
console.log(`local corpus review generated: ${path.relative(rootDir, outputDirectory)}`);
