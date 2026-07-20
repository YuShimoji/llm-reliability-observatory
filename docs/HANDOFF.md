# Project Handoff

Updated: 2026-07-21

Repository: `llm-reliability-observatory`

Active implementation branch: `codex/lro-turn5-sites-compatibility`

Implementation start: clean GitHub `main` at `db3b56391c49534d4b703d59486263fcb5b7d4e0`, fetched on 2026-07-21 with `HEAD...origin/main = 0/0`. Turn 5B must remain on the dedicated branch; final branch SHA and remote parity must be read from live Git state.

Remote: `origin` -> `https://github.com/YuShimoji/llm-reliability-observatory.git`

## Current outcome

Turn 4 remains editorially and technically complete. Turn 5 owner-only Sites compatibility/private deployment is complete, and Turn 5B has backported its reproducible compatibility layer to the dedicated GitHub branch without binding GitHub to the private Site.

- The project owner/editor supplied explicit case-level decisions dated 2026-07-19.
- All three evidence-backed cases are now `draft: false`, `review_status: approved`, and `ai_assistance.human_reviewed: true`.
- The generated registry contains 3 publication-eligible cases, 1 blocked template case, 0 public articles, and 5 excluded fixtures.
- Production components show the three cases in `/cases`, expose their detail routes, include them in `sitemap.xml`, and derive related cases only from exact metadata equality.
- The static local corpus Reset control works without React hydration: a GitHub filter narrows to `1 of 3`, and Reset restores all four selects and `3 of 3` cards/details.
- Eight new production acceptance images are real PNG files and were opened after encoding.
- Owner-only Sites Version 2 succeeded with the exact Sites-issued canonical; Version 1 remains rollback. Access stayed owner-only. No public access, custom domain, PR, real advertising code, publisher ID, paid report, individual contract, audit service, payment, or membership feature was created.
- GitHub backport uses Vinext 0.0.50, Vite 8.1.5, Cloudflare Vite plugin 1.45.1, Wrangler 4.112.0, React 19.2.6, and Next 16.2.10.
- Bound `.openai/hosting.json` metadata is not tracked. An unbound checkout builds deterministically and packages `project_id`, `d1`, and `r2` as null.
- No application, content, taxonomy, generated registry, component, source-link, review-evidence, or public-case file changed from the GitHub base.

`publication-eligible` means eligible in the repository's source/build contract. Owner-only deployment success does not prove public-release acceptance.

## Recorded editorial decisions

The durable decision record is:

- `samples/_review/turn4-publication-acceptance/editorial-decision-record.md`
- `samples/_review/turn4-publication-acceptance/editorial-decision-record.json`

| Slug | Decision | Classification | Verification boundary | Source/build state |
|---|---|---|---|---|
| `002-gpt-4o-sycophancy-rollback` | approve | `documented_regression` / `sycophancy` / `sev2` | OpenAI documents 2, issuing origin 1, no independent reproduction; `single_source` | approved, human reviewed, publication-eligible |
| `003-new-bing-long-session-context-confusion` | approve after classification clarification | `documented_regression` / `context_loss` / `sev1` | Microsoft documents 2, issuing origin 1, no independent reproduction; `single_source` | approved, human reviewed, publication-eligible |
| `004-github-copilot-insecure-code-replication` | approve | `reproduction_test` / `coding_accident` / `sev2` | independent research teams 2, published targeted replication, not rerun by LRO; `multi_source` | approved, human reviewed, publication-eligible |

The held Anthropic simulation and rejected Gemini capability-report direction remain non-input records in the evidence matrix. The legacy Gemini candidate remains documentation-only and blocked.

## New Bing classification correction

`context_loss` is an LRO editorial taxonomy term. Microsoft did not use that label. Its official materials directly described very long conversations confusing the underlying model, reducing answer accuracy, or producing unintended tone. The case now says both things explicitly and does not generalize the February 2023 preview observation to short conversations, an undisclosed exact model, or current Bing products.

The taxonomy description now covers unstable context use in long conversations, including loss of important constraints, lower accuracy, or unintended response tone. This does not assert that every issuer uses the same terminology.

## Verification semantics

The current `verification_status` is about source-origin independence rather than raw link count.

- document count: number of supporting documents;
- source-origin count: number of independent issuing origins;
- independent reproduction: whether an independent team reproduced the tested behavior.

OpenAI and Microsoft each have two documents but one issuing origin, so both remain `single_source`. The Copilot case has an independent targeted replication by a second research team, so it remains `multi_source`. LRO did not independently rerun any of the three cases.

These three dimensions remain candidates for future schema separation; no new verification enum was added in Turn 4.

## Publication and advertising boundary

A case is publication-eligible only when schema validation passes and all of these are true:

1. `draft === false`;
2. `review_status === approved`;
3. all 9 required sections exist and are non-empty;
4. no `TODO`, empty required value, `example.com`, or invalid URL exists;
5. at least one structured source link exists;
6. AI assistance is disclosed and human review is true.

Fixtures never become eligible. The same generated registry controls listing, direct detail lookup, related cases, and sitemap. There is no production draft-preview route.

Only substantive eligible detail pages receive inert ad placeholders. Home, listings, policy/info pages, errors, templates, fixtures, and legacy candidates remain ineligible. Repository and rendered-page scans found no `adsbygoogle`, `ca-pub-*`, or `googlesyndication` implementation.

## Production acceptance evidence

Artifact root:

`samples/_review/turn4-publication-acceptance/`

Files:

- `public-cases-desktop.png` / `public-cases-mobile.png`
- `002-detail-desktop.png` / `002-detail-mobile.png`
- `003-detail-desktop.png` / `003-detail-mobile.png`
- `004-detail-desktop.png` / `004-detail-mobile.png`
- `editorial-decision-record.md` / `.json`

Browser acceptance covered:

- `/cases` at 1280x800 and 390x844;
- all three detail routes at 1280x800 and 390x844;
- all six source links and safe `target="_blank"` / `rel="noopener noreferrer"` attributes;
- approved/human-reviewed labels and case-specific evidence boundaries;
- related cases: 002 -> 003, 003 -> 002, 004 -> none;
- static local corpus GitHub filter and Reset behavior;
- no horizontal overflow, garbled text, missing required labels, real ad elements, or browser console errors.

The browser returned JPEG capture bytes. Each output was decoded and saved as PNG; all eight files begin with `89 50 4E 47 0D 0A 1A 0A`. Detail evidence combines a top viewport with a source/AI/related viewport separated by a neutral strip; it is not represented as a continuous full-page capture.

## Acceptance checks

The complete suite for this branch must remain green immediately before integration:

| Check | Expected accepted result |
|---|---|
| `npm ls --depth=0` | valid dependency tree |
| `npm run content:compile` twice | 3 public cases, 1 blocked case, 0 public articles; second run unchanged; digest `4ea9f26ba88d...` |
| `npm run lint:editorial` | no errors or warnings |
| `npm test` | 25 pass, 0 fail |
| `npm run review:generate-corpus` | approved/human-reviewed local review generated; static Reset present |
| `npm run review:verify-images` | every tracked review image matches extension and magic bytes |
| `npm run build` | static build succeeds; all 3 case detail routes generated |
| `npm audit --audit-level=low` | 0 vulnerabilities |
| production route smoke | 15/15 expected routes return 200 |
| blocked route smoke | template case/article, 5 fixtures, and legacy slug return 404 (8/8) |
| sitemap/list/related | approved cases included; templates, fixtures, legacy excluded; exact related boundary retained |
| advertising | ineligible pages 0 placeholders; all pages 0 real ad code/elements |
| browser | console errors 0; desktop/mobile overflow false |
| `git diff --check` | clean |
| secret/PII/artifact audit | no credential, personal identity, or oversized unintended artifact |

Expected 200 routes are the 12 static/public resources plus the three approved case detail routes. A Next.js `NoFallbackError` may appear on the server console while intentionally probing unknown static slugs; the HTTP result remains the acceptance authority and must be 404.

## Turn 5B acceptance evidence

Environment: Node `v24.13.0`, npm `11.6.2`. The declared Node engine remains `>=22.13.0`.

| Check | 2026-07-21 result |
|---|---|
| Remote base | fetched; `main` = `origin/main` = `db3b56391c49534d4b703d59486263fcb5b7d4e0`; `0/0` |
| Dependency recovery | one monitored `npm install`; 419 added, 1 removed, 9 changed; audit 0 |
| `npm ls --depth=0` | exit 0; declared top-level versions resolved; npm 11 on Node 24 continues to label optional `@napi-rs/wasm-runtime@1.1.6` extraneous after `npm prune`, without failing the tree |
| Content compile twice | 3 public cases, 1 blocked candidate, 0 public articles; digest `4ea9f26ba88d`; registry unchanged; Git blob `6befa0b8cc20bd16341ff4f6b2fbdb05dfe9be75` both times |
| Editorial/source tests | editorial lint clean; 25/25 pass |
| Review images | 26/26 match extensions and magic bytes |
| Generic lint / typecheck | pass / pass |
| Dependency audit | 0 vulnerabilities at `--audit-level=low` |
| Vinext build | pass with exact `NEXT_PUBLIC_SITE_URL`; no `example.com` in home/robots/sitemap |
| Worker artifact | 3/3 pass; 7 public routes 200; 8 blocked routes 404; 6 safe source links; real ad code 0; hosting state null/unbound |
| Production local start | `/`, `/cases`, one public detail, robots, sitemap = 200; blocked template = 404; exact canonical present |
| Dev restart | initial Cloudflare `Request.cf` probe timed out and used its documented placeholder; stabilized server returned public routes 200, blocked route 404, repeated reloads 200; no React hook error occurred |
| Scope / diff | editorial/application surfaces unchanged; `git diff --check` clean; bound hosting metadata, credentials, PII, real ads, and unintended artifacts absent |

The first dev start was probed before the initial optimizer had opened a stable listener and therefore produced connection failures. That attempt is not acceptance evidence. The subsequent optimized start and production start are the accepted local restart checks. The large compile-duration numbers printed by the dev logger are a timing-report anomaly; observed HTTP behavior was normal after stabilization.

## Residual work ownership

| Residual | Purpose | Effect | Requirement | State | Owner | Next move |
|---|---|---|---|---|---|---|
| Turn 5B remote branch | Make compatibility and handoff reproducible from another terminal | Publishes source/docs only; does not bind or deploy Sites | full gates green, one intentional commit, branch push, `0/0` branch parity | Implementation/validation complete; remote parity is live-Git authority | Codex implementation lane | Require `0/0` before resuming; after that, no remaining Turn 5B implementation action |
| GitHub-to-Site binding | Optionally bind this GitHub checkout to the existing private Site | Adds project resource identity to a checkout and may affect future deploy workflow | explicit owner decision on the exact Site and binding file | Closed / not performed | Project owner | Keep `.openai/hosting.json` absent until explicitly authorized |
| Public editorial MVP | Accept public access, exact artifact, canonical metadata, correction/removal flow, and production behavior | Begins public observatory operation | explicit owner public-release decision and fresh live evidence | Turn 6 owner gate | Project owner/editor | Decide whether to open Turn 6; owner-only evidence cannot clear it |
| AdSense technical probe | Test the planned future revenue path on eligible detail pages | Adds external policy/account/code surface | public MVP, owner publisher setup, privacy/consent review, explicit authorization | Turn 7 closed | Project owner | Keep all IDs and scripts absent until the gate opens |
| Recurring observation loop | Sustain research, review, publication, re-verification, and correction | Creates an ongoing editorial cadence | owners, schedule, evidence refresh and correction SLA | Turn 8 closed | Editor + project owner | Define only after public MVP acceptance |
| Held Anthropic simulation | Preserve a bounded research lead without forcing taxonomy | No current compiler/publication effect | taxonomy packet and simulation-scope decision | Held | Taxonomy owner/editor | Revisit only with a precise approved category |
| Rejected/legacy Gemini directions | Preserve negative rationale | Prevents capability claims becoming unsupported failure cases | direct bounded failure evidence | Rejected/blocked | Research editor | Do not revive from capability material alone |

## Farthest safe roadmap

1. Require the dedicated Turn 5B branch to be at remote parity `0/0` before resuming; do not merge `main` or create a PR without a new instruction.
2. Turn 6, only after an owner public-release decision: re-fetch access policy and validate the exact deployed artifact, live canonical URL, sitemap/robots, case routes, correction/removal path, mobile UI, console, and rollback. Source/build or owner-only evidence cannot clear this gate.
3. Turn 7, only after a public editorial MVP and policy/account readiness: run a narrowly scoped AdSense technical probe on eligible detail pages. Do not add a real publisher ID before authorization.
4. Turn 8: establish recurring source review, case drafting, human approval, publication, re-verification, correction, and retirement procedures with measurable ownership.

Do not propose or implement paid reports, individual contracts, audit services, payments, or membership features. The intended future revenue lane is owner-authorized Codex Sites publication followed by advertising eligibility work.

## Resume sequence

1. Read live Git state first: branch, HEAD, worktree, upstream parity, and `origin/main` parity.
2. Read this handoff, `docs/DEVELOPMENT_TURNS.md`, `docs/CASE_PUBLICATION_GUIDE.md`, the decision record, evidence matrix, and corpus readback.
3. Switch to `codex/lro-turn5-sites-compatibility`, pull `--ff-only`, and require branch parity `0/0`; do not merge it to `main` or create a PR without a new instruction.
4. Run `npm ci` without overlapping package operations, then `npm ls --depth=0`. For full canonical validation, set `NEXT_PUBLIC_SITE_URL` only in the process environment and follow `docs/TURN5B_GITHUB_BACKPORT_INVENTORY.md`.
5. Treat `docs/TURN5_SITES_COMPATIBILITY.md` as private-deployment evidence and `docs/TURN5B_GITHUB_BACKPORT_INVENTORY.md` as the code/backport boundary.
6. The first next decision is owner-owned: open Turn 6 public editorial MVP or keep owner-only operation. Keep binding, public access, custom domains, real ads, payments, membership, paid reports, contracts, and audit services closed without explicit authorization.

## Guardrails

- Preserve `content/_fixtures`; never publish fixtures.
- Never infer human approval; use the explicit decision record.
- Keep issuer document count, independent origins, and independent reproduction separate.
- Keep local build/Worker evidence, owner-only deployment evidence, and public-release evidence separate.
- Do not expose blocked content through alternate routes or preview parameters.
- Do not add submissions, admin, auth, DB, API, payments, accounts, rankings, real ad IDs, bound Site metadata, or deployment/access changes in the current lane.
