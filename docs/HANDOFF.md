# Project Handoff

Updated: 2026-06-15

Repository: `llm-reliability-observatory`

Branch: `main`

Remote: `origin` -> `https://github.com/YuShimoji/llm-reliability-observatory.git`

Last verified base before this handoff update: `ad55db1 docs: refresh handoff before public case work`

After pulling, use `git log --oneline -5` to confirm the latest synced commits.

## Current State

MVP1 Static Casebook Skeleton has been implemented and audited as a static Next.js App Router site.

The project is intentionally limited to a static casebook skeleton. It does not include submissions, admin screens, authentication, Supabase, database, storage, email, payments, API routes, comments, voting, ranking, user accounts, organization pages, pricing, subscriptions, AdSense JavaScript, or model score/ranking UI.

MVP1.2 First Human-Written Public Case was attempted on 2026-05-28, but no human-provided publishable case input was present in the task prompt, `content/cases`, or `docs/PUBLIC_CASE_INPUT_TEMPLATE.md`. No `draft: false` public case was created, and no fixture/template prose was reused as public content.

On 2026-05-29, a human-provided candidate case was staged into `docs/PUBLIC_CASE_INPUT_TEMPLATE.md` only. It is not yet copied into `content/cases` and must not be published until the remaining blockers are resolved: replace the placeholder source URL with a real official URL, make or approve the public summary for the preferred 160-220 character range, and confirm the adjusted taxonomy values.

On 2026-06-03, local `main` was confirmed clean and up to date with `origin/main` before this handoff refresh. No public case file has been added yet.

On 2026-06-08, local `main` was confirmed clean and up to date with `origin/main` before this handoff refresh. No public case file has been added yet, and the candidate remains staged only in `docs/PUBLIC_CASE_INPUT_TEMPLATE.md`.

On 2026-06-15, a local MkDocs Material documentation view was added so the repository Markdown can be reviewed through a browser tree pane and temporary Chrome / Edge / DeepL page translation. This adds overview, turn-plan, and screenshot-index documents without rewriting the existing canonical Markdown bodies. The policy/TODO documents remain intentionally unfilled, and no translated permanent files were created.

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
| Complete first public case input | `docs/PUBLIC_CASE_INPUT_TEMPLATE.md` now contains one human-provided candidate. Remaining blockers: real official source URL, final approval or expansion of the 116-character summary to the preferred 160-220 character range, and confirmation that `chat`, `nonexistent_capability`, `single_source`, and empty secondary categories are acceptable taxonomy mappings. | Makes it safe to create the first non-fixture `draft: false` case without AI-authored public prose. |
| Verify published content | Add one human-authored `draft: false` case and verify detail rendering. | Real detail-page checks for badges, related cases, detail AdSlot, and sitemap inclusion. |
| Audit local docs view | Review `docs/PROJECT_OVERVIEW.md`, `docs/DEVELOPMENT_TURNS.md`, and `docs/SCREENSHOT_INDEX.md` in a browser translation workflow. | Confirms whether a new terminal can recover project state without reading every document manually. |
| Refresh screenshots | Re-capture current route screenshots if UI changes. | Keeps `docs/SCREENSHOT_INDEX.md` aligned with the actual rendered app. |
| Debug dev server | Investigate why `next dev` stays at `Starting...` on this machine. | Faster local iteration. |
| Polish assets | Add favicon and minimal OG image. | Removes favicon 404 and improves sharing previews. |
| Editorial expansion | Human-authored docs and public case text. | First publishable version without changing the static architecture. |

## Human-Side Resume Checklist

For the next human working session, start here:

1. Pull the latest `main`.
2. Run `python -m mkdocs serve -a 127.0.0.1:8000` and open the local docs view.
3. Read `docs/PROJECT_OVERVIEW.md` and `docs/DEVELOPMENT_TURNS.md` for the current map.
4. Open `docs/PUBLIC_CASE_INPUT_TEMPLATE.md`.
5. Replace the placeholder source URL with a real official source URL.
6. Approve or revise the public summary so it meets the publication gate.
7. Do not change `draft` to `false` until the publication gate in that template is satisfied.
8. After the case is ready, add exactly one new `content/cases/<slug>.mdx` file and run the existing verification commands.

Do not use `content/_fixtures` or `content/cases/001-template-case.mdx` prose as public case text.

## Guardrails For Future Work

- Keep public case/article prose human-authored.
- Keep fixtures under `content/_fixtures`.
- Keep `draft: true` content out of listings, detail routes, and sitemap.
- Keep AdSense JavaScript out of MVP1; only placeholder slots are allowed.
- Do not add API routes, auth, DB, Supabase, storage, mail, payment, comments, voting, ranking, or account features during MVP1 skeleton work.
