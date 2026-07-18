# Project Handoff

Updated: 2026-07-18

Repository: `llm-reliability-observatory`

Acceptance branch: `codex/lro-publication-engine-v2`

Post-acceptance integration target: `main` by fast-forward only; use live Git state as the final parity authority.

Synced base inherited at task start: `add9336` on `main`, reported `+0/-0` against `origin/main`

Remote: `origin` -> `https://github.com/YuShimoji/llm-reliability-observatory.git`

## Outcome / State Transition

The repository moved from a healthy static skeleton blocked on human-only prose to a development-ready Publication Engine v2 with a local-only evidence-backed case review artifact.

- Turn 0 resume baseline remains valid.
- Turn 1 authority and dirty-diff integration is complete.
- Turn 2 Publication Engine v2 is complete and verified.
- Turn 3 has a technically complete local review artifact; editorial approval is still a human gate.
- Public case count remains truthfully 0.
- No deployment, Sites conversion, public access change, real AdSense code, PR, or merge commit was created. This acceptance turn authorizes only the recorded fast-forward integration into `main`.

## Acceptance Hardening

The Publication Engine v2 acceptance follow-up corrected two evidence inconsistencies before integration:

- all four tracked `.png` review files were found to contain JPEG `FF D8 FF` magic bytes; the current artifacts were recaptured, decoded, and re-encoded as real PNG files with signature `89 50 4E 47 0D 0A 1A 0A`;
- the first case now uses `verification_status: single_source` because its two documents share one issuing origin, OpenAI. The two source links remain intact and independent reproduction remains false.

Regression protection is explicit and lightweight: `npm run review:verify-images` checks review-image extensions against magic bytes, and the normal test suite covers both signature detection and all four tracked artifacts. It is not added to `prebuild`.

## Start-State Dirty Diff Audit

The task began with intentional changes in exactly four files:

- `docs/HANDOFF.md`
- `docs/DEVELOPMENT_TURNS.md`
- `docs/PROJECT_OVERVIEW.md`
- `package-lock.json`

No reset, checkout, or stash was used. The three docs contained the 2026-07-17 restart-readiness handoff and were adopted as the factual baseline before being integrated with the new authority. The initial lockfile diff had only the `esbuild` platform family version move `0.28.0 -> 0.28.1` at the package-version level. It also contained npm-generated peer/dev metadata flag changes.

Decision Packet resolution for the metadata flags:

- Observed fact: flags changed outside the literal `esbuild` version lines.
- Risk: adopting unexplained lock churn could hide an unrelated dependency change.
- Safe check: from an isolated copy of the `HEAD` lockfile, the same npm `11.6.2` audit-fix operation was reproduced.
- Result: reproduced and workspace lockfiles had the same SHA-256, `11E2158D907C531380097D8E0E62CE2FEB3DF6E2AE0C3484EFD703B73EEF82B0`.
- Decision: the original lock correction was adopted. Later lock changes add the explicit Publication Engine dependencies `gray-matter` and `zod`.

The worktree was then moved to `codex/lro-publication-engine-v2` without discarding the dirty diff. Repository-local Git author email was changed to `YuShimoji@users.noreply.github.com`; existing history was not rewritten.

## Authority Now in Force

The former rules “wait until a human writes all prose,” “the Gemini candidate is the only entrance,” and “AI-assisted public prose is prohibited” are retired.

Current rule:

> AI-assisted drafting is allowed, but sources, verification bounds, counterevidence, AI-assistance disclosure, and review status are mandatory. Content is not public before human approval.

Operational policy is recorded in:

- `docs/EDITORIAL_POLICY.md`
- `docs/METHODOLOGY.md`
- `docs/TAXONOMY.md`
- `docs/MONETIZATION_POLICY.md`
- `docs/CASE_PUBLICATION_GUIDE.md`

These documents describe implemented workflow and verifiable boundaries; they are not presented as final legal determinations. The old Gemini nonexistent-capability candidate remains in `docs/PUBLIC_CASE_INPUT_TEMPLATE.md` as a `blocked_legacy_candidate`. It is not a compiler input, active gate, or publication candidate.

The roadmap authority is `docs/DEVELOPMENT_TURNS.md`:

0. resume baseline
1. authority and dirty-diff integration
2. Publication Engine v2
3. first evidence-backed case review
4. 3-5 case corpus and observatory UI
5. owner-only Sites compatibility deployment
6. public editorial MVP
7. AdSense technical probe
8. recurring observation loop

## Publication Engine v2

### Build-time content boundary

- `gray-matter` parses YAML frontmatter, including nested objects and multiline arrays.
- Zod schemas in `src/content/schema.ts` validate case/article metadata.
- `scripts/lib/content-compiler.ts` reads MDX and produces `src/generated/content-registry.json`.
- source paths and inputs are sorted before serialization; a content SHA-256 is recorded.
- `predev`, `pretest`, and `prebuild` run the compiler.
- runtime application code reads the generated registry and contains no `node:fs` or `process.cwd()` dependency.

### Case metadata contract

New required structures include:

- `case_kind`: `documented_regression`, `observed_output`, or `reproduction_test`
- `review_status`: `pending` or `approved`
- `last_verified_at`
- `source_links[]`: `label`, `url`, `source_type`, `accessed_at`
- `ai_assistance`: `used`, `disclosure`, `human_reviewed`

### Fail-closed publication contract

A case is publication-eligible only when all conditions are true:

1. schema valid;
2. `draft === false`;
3. `review_status === approved`;
4. all 9 required headings exist with non-empty bodies;
5. no `TODO`, empty required value, `example.com`, or invalid URL exists;
6. at least one structured source link exists.

Missing `draft` normalizes to non-public and adds a blocker. A case that declares publication intent but breaks a gate makes the compiler/build fail. Fixtures can never become publication-eligible. Missing content no longer renders a `TODO` fallback.

The same generated registry controls case/article listings, direct detail lookup, related cases, and sitemap output. There is no production draft-preview route.

### Advertising eligibility

Ad eligibility is state-based, not a broad route allowlist. A page must be both published and substantive, and must be a case/article detail route. Home, empty listings, policy/info pages, drafts, local review artifacts, and errors are ineligible. No real advertising JavaScript or publisher ID is present.

## First Evidence-Backed Case

Case: `content/cases/002-gpt-4o-sycophancy-rollback.mdx`

- title: GPT-4oの迎合的応答を招いた2025年4月更新とロールバック
- kind: `documented_regression`
- category: `sycophancy`
- severity: conservative `sev2`
- verification: `single_source`; two official documents, one source origin (OpenAI)
- state: `draft: true`, `review_status: pending`
- independent reproduction: not attempted
- AI assistance: disclosed; human review incomplete

Sources:

- `https://openai.com/index/sycophancy-in-gpt-4o/`
- `https://openai.com/index/expanding-on-sycophancy/`

The draft records the April 25, 2025 GPT-4o ChatGPT update, the reported increase in sycophantic behavior, and rollback beginning April 28. It does not add an unsupported incident rate, all-user generalization, independent causal theory, or long-term impact claim.

Evidence-counting note for future schema work:

- document count: 2 official OpenAI documents;
- source-origin count: 1 independent issuing organization (OpenAI);
- independent reproduction: none.

The current taxonomy therefore uses `single_source`. A future schema may store these three dimensions separately, but this acceptance fix does not add a new verification status.

## Local Review Artifact

Artifact root:

`samples/_review/publication-engine-v2/002-gpt-4o-sycophancy-rollback/`

Contents:

- `case-card.html` / `case-card.png`
- `case-detail.html` / `case-detail-desktop.png` / `case-detail-mobile.png`
- `source-links.html` / `source-links.png`
- `readback.json`
- `readback.md`

The HTML uses the production component and production CSS output but is served only by `npm run review:serve`. Generation rejects any case that is not a blocked pending draft. These files are diagnostic evidence, not publication approval.

Visual/browser readback:

- desktop detail rendered with local-review and not-approved labels;
- mobile viewport 390px, no horizontal overflow;
- two external source links, each with `target=_blank` and `rel="noopener noreferrer"`;
- review ads: 0;
- review console errors: 0.
- all four `.png` artifacts have the PNG signature `89 50 4E 47 0D 0A 1A 0A`; `npm run review:verify-images` enforces extension/magic-byte agreement.

## Verification

Passed on this branch after authority integration:

| Check | Result |
|---|---|
| `npm ls --depth=0` | pass; dependency tree valid |
| `npm run content:compile` | pass twice; public cases 0, blocked case candidates 2, public articles 0; digest prefix `7bac89f05279`; second run unchanged |
| `npm run lint:editorial` | pass, no warnings |
| `npm test` | 17 pass, 0 fail |
| `npm run review:verify-images` | 4/4 valid PNG signatures |
| `npm run build` | pass; 15 routes |
| `npm audit --audit-level=low` | 0 vulnerabilities |
| production public HTTP | 12/12 routes returned 200 |
| blocked HTTP | 8/8 routes returned 404, including both draft templates, the new draft case, and fixture-equivalent slug |
| production home/cases | draft absent, ads 0, construction markers absent, public count text shows 0 |
| sitemap | new draft, templates, fixtures absent |
| browser console | 0 errors on production home, cases, draft 404, and local review |
| visual | desktop and 390px mobile checked; mobile horizontal overflow false |

Expected 200 routes:

`/`, `/cases`, `/articles`, `/taxonomy`, `/methodology`, `/about`, `/privacy`, `/terms`, `/removal-request`, `/disclosures`, `/robots.txt`, `/sitemap.xml`

Expected 404 routes checked:

`/submit`, `/admin`, `/admin/review`, `/api`, `/cases/001-template-case`, `/cases/002-gpt-4o-sycophancy-rollback`, `/articles/001-template-article`, `/cases/fixture-fabricated-citation-example`

## Residual Work Ownership

| Residual | Purpose | Effect | Requirement | State | Owner | Next move |
|---|---|---|---|---|---|---|
| First case editorial decision | Close Turn 3 | Determines approve/revise/reject; production count remains 0 meanwhile | Human source/prose/classification review | Pending human judgment | Project owner / editor | Review MDX, both official sources, screenshots, and readback |
| Mini corpus | Validate observatory value with real data | Enables useful listings, taxonomy, related cases | 2-4 more evidence-backed candidates under the same contract | Not started | Editor + developer | Start only after first-case review feedback is incorporated |
| Production site URL | Correct canonical robots/sitemap URLs | Current fallback remains `https://example.com` | Domain and environment decision | Owner-only pending | Deployment owner | Set `NEXT_PUBLIC_SITE_URL` in Turn 5/6 |
| Sites compatibility/deployment | Prove target hosting | Would change external/public state | Owner instruction and target configuration | Out of current scope | Project owner | Handle in owner-only Turn 5 |
| AdSense probe | Validate future primary revenue path | Introduces external policy/account/code surface | Public editorial MVP, owner publisher setup, privacy/consent review | Turn 7 only | Project owner | Do not add IDs or code before explicit gate |
| Legacy Gemini candidate | Preserve potentially useful observation without blocking work | None while blocked; unsafe if copied | Real source, scope, observation evidence | Blocked legacy reference | Original information owner | Re-evaluate only if evidence arrives |
| Local MkDocs runtime | Optional browser docs view | Does not block Next.js development | Working local Python + mkdocs-material | Machine-local pending | Local developer | Repair only when docs server is needed |
| Favicon/OG assets | Presentation polish | Sharing remains skeletal | Approved brand assets | Not started | Brand/product owner | Include with Turn 4 UI work if assets exist |

## Recommended Farthest Safe Goal

Set the next objective to **Turn 4: Evidence-Backed Mini Corpus and Observatory UI**, with a hard first checkpoint to close the Turn 3 human review.

The objective is complete when:

1. the first OpenAI case receives an explicit approve/revise/reject decision;
2. any required correction is applied and re-verified;
3. 3-5 total source-backed cases exist under the same schema, each pending or approved with honest boundaries;
4. listings, taxonomy navigation, related-case logic, update/source labels, empty states, and ad eligibility are reviewed against the corpus;
5. pending/draft cases remain absent from production routes and sitemap;
6. compiler, lint, tests, build, audit, HTTP, console, desktop/mobile, and diff checks pass;
7. new screenshots/readbacks and this handoff are updated.

Do not include Sites deployment, public access changes, actual AdSense code or applications, paid reports, individual contracts, audit services, payments, or membership features. Turn 4 must start from updated `main` on a new branch and must not implicitly merge itself back.

## Resume Sequence

1. Confirm `main` is clean and at parity with `origin/main`; fetch before treating the state as current.
2. Read this file, `docs/DEVELOPMENT_TURNS.md`, and `docs/CASE_PUBLICATION_GUIDE.md`.
3. Create a new `codex/` branch for Turn 4; do not continue feature work directly on `main`.
4. Run `npm ls --depth=0`, `npm run content:compile`, and `npm run review:verify-images`.
5. Review the active MDX, both source pages, `readback.md`, and four PNGs.
6. Record an explicit editorial decision before changing `draft` or `review_status`.
7. Keep owner-only Turn 5+ actions outside the branch unless separately authorized.

## Guardrails

- Preserve fixtures under `content/_fixtures` and never publish them.
- AI assistance is allowed only with disclosure and human approval before publication.
- Keep evidence boundaries explicit; local/browser proof is not independent reproduction or production acceptance.
- Do not expose drafts through query parameters, secret slugs, or alternate production routes.
- Keep ads off drafts, empty listings, home, policy/info, review, and error pages.
- Do not add submissions, admin, auth, DB, API, payments, accounts, rankings, real ad IDs, or deployment changes in the current lane.
