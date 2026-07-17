# Project Handoff

Updated: 2026-07-17

Repository: `llm-reliability-observatory`

Handoff update branch: `codex/refresh-restart-handoff`

Remote: `origin` -> `https://github.com/YuShimoji/llm-reliability-observatory.git`

Last verified base before this handoff update: `add9336 docs: add local documentation overview`

During review, fetch and switch to `codex/refresh-restart-handoff` only after the branch exists on `origin`. Until then, the remote handoff is incomplete. After merge, use `main`. Run `git log --oneline -5` to confirm the latest synced commits.

## Current State

MVP1 Static Casebook Skeleton has been implemented and audited as a static Next.js App Router site.

The project is intentionally limited to a static casebook skeleton. It does not include submissions, admin screens, authentication, Supabase, database, storage, email, payments, API routes, comments, voting, ranking, user accounts, organization pages, pricing, subscriptions, AdSense JavaScript, or model score/ranking UI.

MVP1.2 First Human-Written Public Case was attempted on 2026-05-28, but no human-provided publishable case input was present in the task prompt, `content/cases`, or `docs/PUBLIC_CASE_INPUT_TEMPLATE.md`. No `draft: false` public case was created, and no fixture/template prose was reused as public content.

On 2026-05-29, a human-provided candidate case was staged into `docs/PUBLIC_CASE_INPUT_TEMPLATE.md` only. It is not yet copied into `content/cases` and must not be published until the remaining blockers are resolved: replace the placeholder source URL with a real official URL, make or approve the public summary for the preferred 160-220 character range, and confirm the adjusted taxonomy values.

On 2026-06-03, local `main` was confirmed clean and up to date with `origin/main` before this handoff refresh. No public case file has been added yet.

On 2026-06-08, local `main` was confirmed clean and up to date with `origin/main` before this handoff refresh. No public case file has been added yet, and the candidate remains staged only in `docs/PUBLIC_CASE_INPUT_TEMPLATE.md`.

On 2026-06-15, a local MkDocs Material documentation view was added so the repository Markdown can be reviewed through a browser tree pane and temporary Chrome / Edge / DeepL page translation. This adds overview, turn-plan, and screenshot-index documents without rewriting the existing canonical Markdown bodies. The policy/TODO documents remain intentionally unfilled, and no translated permanent files were created.

On 2026-07-17, the repository was reanalysed for eventual Codex Sites publication and monetization. The decision, technical gaps, revenue ladder, external references, and exact cross-device resume path are recorded in `docs/SITES_MONETIZATION_REANALYSIS.md`. The conclusion is that a Sites build direction is potentially feasible after a hosting-layer conversion, but production suitability remains unproven until Worker HTTP behavior and platform constraints are verified. The project is not revenue-ready while it has zero public cases/articles and unresolved source-data and publication-contract defects.

## Current Direction

The intended long-term direction is a free, evidence-backed Japanese LLM reliability casebook that can lead to paid audits, workshops, and cross-case reports through a separate sales and contracting channel. Ads are not the first revenue mechanism. Team SaaS, subscriptions, and API/data licensing remain later options only after repeated customer demand is demonstrated.

Current OpenAI guidance says ChatGPT Sites must not process payment-card data or enable financial transactions. Do not add checkout, purchase buttons, payment links, payment webhooks, or entitlement billing to a Site. Sites may be evaluated as the free publishing, trust, and analytics surface; any commerce product needs a separate compliant hosting and operating decision. See `docs/SITES_MONETIZATION_REANALYSIS.md` for the dated source links and the correction to the earlier external-checkout assumption.

The immediate implementation priority is content contract hardening before the first `draft: false` case:

1. Replace the flat frontmatter assumptions with runtime schema validation.
2. Make `source_links` use one consistent `{ label, url }` contract and render clickable sources.
3. Publish only records with `draft === false` and complete required fields.
4. Add a positive integration test for one complete public case.
5. Reject missing required sections instead of rendering `TODO`.

Do not start the Sites conversion, authentication, database, payments, or API work as part of this handoff documentation change. Those are separate implementation scopes with dependency and contract implications.

## Document Authority

When documents overlap, read them in this order:

1. `docs/HANDOFF.md` for current state, guardrails, verification, and the next safe implementation boundary.
2. `docs/SITES_MONETIZATION_REANALYSIS.md` for the Sites and business decision record; it is not final policy or implementation authorization.
3. `docs/DEVELOPMENT_TURNS.md` for work lanes and exit conditions. Turn numbers preserve project history but are not a strict requirement to complete every maintenance lane before a later probe.
4. `docs/PUBLIC_CASE_INPUT_TEMPLATE.md` for the human-provided first-case candidate and its publication gate.
5. `docs/MVP1_VERIFY_REPORT.md` and `docs/MVP1_1_PUBLIC_CASE_PROBE_REPORT.md` as historical verification snapshots.
6. `docs/METHODOLOGY.md`, `docs/EDITORIAL_POLICY.md`, `docs/TAXONOMY.md`, and `docs/MONETIZATION_POLICY.md` as human-owned final policy surfaces. Their current TODO state has no approved policy effect and must not be replaced by the decision record. After owner approval, their final text takes precedence over provisional business guidance in the dated Sites reanalysis.

## Implemented Surface

Public routes:

- `/`
- `/cases`
- `/articles`
- `/taxonomy`
- `/methodology`
- `/about`
- `/privacy`
- `/terms`
- `/removal-request`
- `/disclosures`

Generated metadata routes:

- `/sitemap.xml`
- `/robots.txt`

Blocked or absent routes verified as 404:

- `/submit`
- `/admin`
- `/admin/review`
- `/api`

## Content Model

Production content templates:

- `content/cases/001-template-case.mdx`
- `content/articles/001-template-article.mdx`

Both are `draft: true`, so they are excluded from public listings, direct detail pages, and sitemap output.

Synthetic examples live only in `content/_fixtures/`. Fixtures are for local UI/test/reference use and are excluded from public routes and sitemap output.

Docs intentionally contain headings and TODO only:

- `docs/METHODOLOGY.md`
- `docs/EDITORIAL_POLICY.md`
- `docs/TAXONOMY.md`
- `docs/MONETIZATION_POLICY.md`

Do not fill these with AI-authored final policy text unless the project owner explicitly changes that rule.

## Local Documentation View

Local browser review is now available through MkDocs Material.

Primary files:

- `mkdocs.yml`
- `docs/index.md`
- `docs/PROJECT_OVERVIEW.md`
- `docs/DEVELOPMENT_TURNS.md`
- `docs/SCREENSHOT_INDEX.md`
- `docs/_root_README.md`
- `tools/generate-doc-nav.ps1`

Screenshot artifacts remain in `samples/_review/mvp1-route-audit/`. For MkDocs browser display, the same 12 PNG files are copied under `docs/assets/review/mvp1-route-audit/`.

Normal local startup:

```powershell
python -m pip install mkdocs-material
python -m mkdocs serve -a 127.0.0.1:8000
```

Then open `http://127.0.0.1:8000/` and use the left navigation:

- `Project Overview` for implemented scope, future work, and where each status lives.
- `Turn-Based Development Plan` for non-date-based development turns.
- `Screenshot Index` for immediate visual checks and screenshot paths.

If port 8000 is already occupied, use another local port such as:

```powershell
python -m mkdocs serve -a 127.0.0.1:8002
```

## Verification Already Performed

Detailed audit report:

- `docs/MVP1_VERIFY_REPORT.md`

MVP1.1 public case probe report:

- `docs/MVP1_1_PUBLIC_CASE_PROBE_REPORT.md`

Public case input contract:

- `docs/PUBLIC_CASE_INPUT_TEMPLATE.md`

Hands-on publication guide:

- `docs/CASE_PUBLICATION_GUIDE.md`

Screenshot artifacts:

- `samples/_review/mvp1-route-audit/`

Commands that passed after the audit fixes:

```bash
npm run lint:editorial
npm test
npm run build
npm audit --audit-level=moderate
```

The same four commands were rerun on 2026-05-28 after the MVP1.2 resume check and passed again:

- `npm run lint:editorial`: passed with no warnings.
- `npm test`: passed, 8 tests.
- `npm run build`: passed, 15 pages generated.
- `npm audit --audit-level=moderate`: passed, 0 vulnerabilities.

`next start -p 3100` route checks were also rerun. Expected public routes returned 200, forbidden routes and draft template slugs returned 404, `/cases` and `/articles` did not expose TODO templates or fixtures, and AdSlot remained limited to allowed pages.

On 2026-05-29, after staging the candidate case in `docs/PUBLIC_CASE_INPUT_TEMPLATE.md`, these commands also passed:

- `npm run lint:editorial`: passed with no warnings.
- `npm test`: passed, 8 tests.
- `npm run build`: passed, 15 pages generated.

On 2026-06-03, before pushing this handoff refresh, these commands passed again:

- `npm run lint:editorial`: passed with no warnings.
- `npm test`: passed, 8 tests.
- `npm run build`: passed, 15 pages generated.
- `npm audit --audit-level=moderate`: passed, 0 vulnerabilities.

On 2026-06-08, before pushing this handoff refresh, these commands passed again:

- `npm run lint:editorial`: passed with no warnings.
- `npm test`: passed, 8 tests.
- `npm run build`: passed, 15 pages generated.
- `npm audit --audit-level=moderate`: passed, 0 vulnerabilities.

On 2026-06-15, the local documentation view was verified:

- `powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\generate-doc-nav.ps1`: produced a nav candidate for the current Markdown layout.
- `python -m mkdocs build --clean -d <temp-dir>`: passed. `PROJECT_OVERVIEW/index.html` and `assets/review/mvp1-route-audit/home-desktop.png` were generated in the temp site.
- Local HTTP checks passed for `PROJECT_OVERVIEW`, `DEVELOPMENT_TURNS`, `SCREENSHOT_INDEX`, and `home-desktop.png` through the MkDocs server.
- Existing canonical Markdown bodies were checked with `git diff` and were not modified by the documentation-view work.

On 2026-07-17, the handoff and Sites reanalysis documentation change was verified against the current dependency resolution:

- `npm run lint:editorial`: passed with no warnings.
- `npm test`: passed, 8 tests.
- `npm run build`: passed, 15 pages generated with Next.js 15.5.18.
- `python -m mkdocs build --strict --clean -d <temp-dir>`: passed. Material for MkDocs printed its upstream MkDocs 2.0 compatibility notice, but the strict build completed successfully.
- `npm audit --audit-level=moderate`: exited successfully but reported one low-severity `esbuild` development-server advisory (`GHSA-g7r4-m6w7-qqqr`). This supersedes the older zero-vulnerability snapshot; no dependency change was made in this documentation-only turn.
- Production HTTP checks passed for 12 public/metadata routes with 200 and 7 forbidden, draft, or fixture routes with 404. The public case/article indexes did not expose template or fixture slugs.
- Requests to fallback-disabled draft/fixture detail slugs still write the known `Internal: NoFallbackError` messages to server stderr while returning the expected 404. This remains an operational warning rather than an HTTP boundary failure.

The current automated tests do not cover nested/multiline `source_links`, missing `draft`, runtime frontmatter validation, or a complete positive public-case render. Those gaps are the reason content contract hardening precedes the first public case.

Test coverage currently includes:

- AdSlot allowlist and denylist behavior.
- Content publication boundaries: draft templates and fixtures stay out of public queries and sitemap output.
- Editorial lint negative examples for email, phone number, API-key-like string, derogatory terms, warning-only terms, fixture exclusion, and classification frontmatter exclusion.

## Operational Notes

`next start` works for verification after `npm run build`.

`next dev` was tested on this machine and repeatedly stayed at `Starting...` without serving HTTP. This was recorded but not debugged further because the audit request said not to deep-dive. Also, do not run `next dev` and `next start` against the same `.next` output at the same time; doing so can make static asset checks fail until the project is rebuilt.

`NEXT_PUBLIC_SITE_URL` currently defaults to `https://example.com`, so robots and sitemap output use `https://example.com/sitemap.xml` unless the environment variable is set. Replace it after the public domain is decided.

If route verification is needed again:

```bash
npm run build
npx next start -p 3100
```

Then check:

- Expected 200: `/`, `/cases`, `/articles`, `/taxonomy`, `/methodology`, `/about`, `/privacy`, `/terms`, `/removal-request`, `/disclosures`
- Expected 404: `/submit`, `/admin`, `/admin/review`, `/api`, `/cases/001-template-case`, `/articles/001-template-article`

## Safe Next Work

| Entry | Purpose | What It Unlocks |
|---|---|---|
| Harden the content contract | Add runtime validation, strict `draft === false`, a consistent source-link object, required-section checks, clickable citations, and a positive public-case integration test. | Prevents incomplete or untraceable records from becoming public and makes the first real case safe to integrate. |
| Complete first public case input | `docs/PUBLIC_CASE_INPUT_TEMPLATE.md` contains one human-provided candidate. Remaining blockers: real official source URL, final summary approval, and taxonomy confirmation. | Makes it safe to create the first non-fixture public case after the content contract is hardened. |
| Publish 3-5 verified cases and Methodology | Add human-approved cases with official sources and replace the public Methodology TODO with owner-approved text. | Gives readers and prospective customers enough evidence to experience the product value. |
| Probe Codex Sites compatibility | On a dedicated implementation branch, keep `origin` as the source remote, treat any `sites` remote as deployment-only, preserve a working Next.js rollback, and verify Worker HTTP routes, metadata, sharing, domain, external links, and third-party script constraints. | Produces an explicit go/no-go decision without committing the product to unverified beta behavior. |
| Validate one paid offer outside Sites | After 5-10 verified cases, keep Sites informational and use a separate sales, contract, invoice, and fulfillment channel for a manual LLM audit/workshop or report. Use the first 3-5 cases for free discovery and credibility testing. | Tests willingness to pay without violating the current Sites financial-transaction restriction. |
| Audit local docs view | Review `docs/PROJECT_OVERVIEW.md`, `docs/DEVELOPMENT_TURNS.md`, and `docs/SCREENSHOT_INDEX.md` in a browser translation workflow. | Confirms whether a new terminal can recover project state without reading every document manually. |
| Refresh screenshots | Re-capture current route screenshots if UI changes. | Keeps `docs/SCREENSHOT_INDEX.md` aligned with the actual rendered app. |
| Debug dev server | Investigate why `next dev` stays at `Starting...` on this machine. | Faster local iteration. |
| Polish assets | Add favicon and minimal OG image. | Removes favicon 404 and improves sharing previews. |

## Human-Side Resume Checklist

For the next human working session, start here:

1. Clone or fetch `https://github.com/YuShimoji/llm-reliability-observatory.git`.
2. During review, switch to `codex/refresh-restart-handoff` only if `git branch -r` shows `origin/codex/refresh-restart-handoff`; after merge, pull `main` with `--ff-only`.
3. Read `docs/HANDOFF.md` and `docs/SITES_MONETIZATION_REANALYSIS.md`.
4. Run the existing lint, test, and build commands.
5. Start the next implementation turn with content contract hardening.
6. Open `docs/PUBLIC_CASE_INPUT_TEMPLATE.md` and obtain the real official source URL, final summary approval, and taxonomy confirmation from the project owner.
7. Do not change `draft` to `false` until the code-level and human publication gates both pass.
8. Add one complete public case, verify its detail page and sources, then expand toward 3-5 verified cases.

Do not use `content/_fixtures` or `content/cases/001-template-case.mdx` prose as public case text.

## Guardrails For Future Work

- Keep public case/article prose human-authored.
- Keep fixtures under `content/_fixtures`.
- Keep `draft: true` content out of listings, detail routes, and sitemap.
- Keep AdSense JavaScript out of MVP1; only placeholder slots are allowed.
- Do not add API routes, auth, DB, Supabase, storage, mail, payment, comments, voting, ranking, or account features during MVP1 skeleton work.
- Treat the Sites and monetization direction as a recorded decision path, not authorization to add dependencies or change API/auth/payment contracts inside MVP1.
- Keep `docs/METHODOLOGY.md`, `docs/EDITORIAL_POLICY.md`, `docs/TAXONOMY.md`, and `docs/MONETIZATION_POLICY.md` human-authored unless the project owner explicitly changes that rule.
