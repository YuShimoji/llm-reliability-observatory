# Project Handoff

Updated: 2026-07-21

Repository: `llm-reliability-observatory`

Current local integration branch: `codex/refresh-restart-handoff`

Remote baseline integrated locally: `db3b563` (`docs: close turn 4 editorial review`) from `origin/main`. The current branch preserves two older local documentation commits and merges the remote baseline; read live Git state for the final report commit and upstream parity.

Remote: `origin` -> `https://github.com/YuShimoji/llm-reliability-observatory.git`

## Current outcome

Turn 4 is editorially and technically complete in source/build state and is already present on `origin/main`. The 2026-07-21 local restart merged that baseline without discarding the older local documentation history.

- The project owner/editor supplied explicit case-level decisions dated 2026-07-19.
- All three evidence-backed cases are now `draft: false`, `review_status: approved`, and `ai_assistance.human_reviewed: true`.
- The generated registry contains 3 publication-eligible cases, 1 blocked template case, 0 public articles, and 5 excluded fixtures.
- Production components show the three cases in `/cases`, expose their detail routes, include them in `sitemap.xml`, and derive related cases only from exact metadata equality.
- The static local corpus Reset control works without React hydration: a GitHub filter narrows to `1 of 3`, and Reset restores all four selects and `3 of 3` cards/details.
- Eight new production acceptance images are real PNG files and were opened after encoding.
- No Sites operation, external deployment, domain change, PR, real advertising code, publisher ID, paid report, individual contract, audit service, payment, or membership feature was created.
- The local dependency tree was rebuilt with `npm ci`; 25 tests, editorial lint, a deterministic double compile, 26 review-image checks, the 18-page production build, and all 23 production route-boundary probes passed.
- `next dev` now reaches Ready on this Windows checkout. Because development mode replaces the shared `.next` output, rebuild before starting the production server after a dev session.

`publication-eligible` means eligible in the repository's source/build contract. It does not prove that a public URL was deployed or that a hosting environment was accepted.

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

## Residual work ownership

| Residual | Purpose | Effect | Requirement | State | Owner | Next move |
|---|---|---|---|---|---|---|
| Local synchronization report | Preserve the remote Turn 4 baseline together with dated local decision history and current verification | Gives the next reviewer an evidence-backed restart point; does not deploy a site | resolved merge, green local suite, clear document authority | Complete locally; publication not requested | Supervising AI / project owner | Review `CONTINUATION.md` and decide whether the local handoff branch should be published or retired |
| Production site URL | Replace the fallback canonical/robots/sitemap origin | Changes generated canonical URLs | owner-selected domain/environment and Sites plan | Owner-only pending | Deployment owner | Decide in Turn 5 before any external deployment |
| Sites compatibility and deployment | Prove the built site in the intended hosting surface | Creates external/public state if executed | explicit owner authorization, isolated compatibility check, rollback path | Not started; outside Turn 4 | Project owner | Open a new branch from updated main; do not infer permission from source eligibility |
| Public editorial MVP | Accept a live URL, canonical metadata, correction/removal flow, and production behavior | Begins public observatory operation | successful Turn 5, owner public-release decision, live-route evidence | Turn 6 closed | Project owner/editor | Validate the exact deployed artifact and URL |
| AdSense technical probe | Test the planned future revenue path on eligible detail pages | Adds external policy/account/code surface | public MVP, owner publisher setup, privacy/consent review, explicit authorization | Turn 7 closed | Project owner | Keep all IDs and scripts absent until the gate opens |
| Recurring observation loop | Sustain research, review, publication, re-verification, and correction | Creates an ongoing editorial cadence | owners, schedule, evidence refresh and correction SLA | Turn 8 closed | Editor + project owner | Define only after public MVP acceptance |
| Held Anthropic simulation | Preserve a bounded research lead without forcing taxonomy | No current compiler/publication effect | taxonomy packet and simulation-scope decision | Held | Taxonomy owner/editor | Revisit only with a precise approved category |
| Rejected/legacy Gemini directions | Preserve negative rationale | Prevents capability claims becoming unsupported failure cases | direct bounded failure evidence | Rejected/blocked | Research editor | Do not revive from capability material alone |

## Farthest safe roadmap

1. Review the local synchronization report and decide whether its historical documentation additions belong on the remote. `origin/main` already contains the accepted Turn 4 implementation.
2. Turn 5, only after explicit owner authorization: create a new branch from updated `main`, set a non-secret target URL/configuration, and perform Sites compatibility checks without adding ads or paid features. Stop before external publication unless separately authorized.
3. Turn 6, only after an owner release decision: validate the exact deployed artifact, live canonical URL, sitemap/robots, case routes, correction/removal path, mobile UI, console, and rollback. Source/build evidence alone cannot clear this gate.
4. Turn 7, only after a public editorial MVP and policy/account readiness: run a narrowly scoped AdSense technical probe on eligible detail pages. Do not add a real publisher ID before authorization.
5. Turn 8: establish recurring source review, case drafting, human approval, publication, re-verification, correction, and retirement procedures with measurable ownership.

Do not propose or implement paid reports, individual contracts, audit services, payments, or membership features. The intended future revenue lane is owner-authorized Codex Sites publication followed by advertising eligibility work.

## Resume sequence

1. Read live Git state first: branch, HEAD, worktree, upstream parity, and `origin/main` parity.
2. Read this handoff, `docs/DEVELOPMENT_TURNS.md`, `docs/CASE_PUBLICATION_GUIDE.md`, the decision record, evidence matrix, and corpus readback.
3. Treat Turn 4 as already integrated on `origin/main` at `db3b563`; do not repeat its merge or publication decision.
4. If beginning Turn 5, require a fresh `codex/` branch from updated `main` and an explicit owner instruction for the external-state boundary.
5. Keep real ads, Sites deployment, domain changes, payments, membership, paid reports, contracts, and audit services outside the branch unless separately authorized.

## Guardrails

- Preserve `content/_fixtures`; never publish fixtures.
- Never infer human approval; use the explicit decision record.
- Keep issuer document count, independent origins, and independent reproduction separate.
- Keep local build/browser evidence separate from deployed-public evidence.
- Do not expose blocked content through alternate routes or preview parameters.
- Do not add submissions, admin, auth, DB, API, payments, accounts, rankings, real ad IDs, or deployment changes in the current lane.
