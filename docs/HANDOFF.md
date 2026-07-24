# Project Handoff

Updated: 2026-07-25

Repository: `llm-reliability-observatory`

Active local implementation branch: `codex/lro-turn5c-security-refresh`

Implementation start: remote state was fetched and pruned on 2026-07-25. `main` and `origin/main` remain at `db3b56391c49534d4b703d59486263fcb5b7d4e0`; `codex/lro-turn5-sites-compatibility` and its remote remain at `59433dc7135d5878128d8f3efe82dd7d9b8fe5a5`. Turn 5BC is derived from that exact compatibility SHA; read the current exact branch commit and parity from live Git.

Remote: `origin` -> `https://github.com/YuShimoji/llm-reliability-observatory.git`

## Current outcome

Turn 4 remains editorially and technically complete. Turn 5 owner-only Sites compatibility/private deployment is complete. Turn 5B backported the compatibility layer but remained partial because its GitHub artifact was unbound, its canonical depended on untracked environment state, and it permitted a null hosting identity. The current Turn 5BC branch closes those source/build gaps and integrates the Turn 5C dependency refresh.

- The project owner/editor supplied explicit case-level decisions dated 2026-07-19.
- All three evidence-backed cases are now `draft: false`, `review_status: approved`, and `ai_assistance.human_reviewed: true`.
- The generated registry contains 3 publication-eligible cases, 1 blocked template case, 0 public articles, and 5 excluded fixtures.
- Production components show the three cases in `/cases`, expose their detail routes, include them in `sitemap.xml`, and derive related cases only from exact metadata equality.
- The static local corpus Reset control works without React hydration: a GitHub filter narrows to `1 of 3`, and Reset restores all four selects and `3 of 3` cards/details.
- Eight new production acceptance images are real PNG files and were opened after encoding.
- Owner-only Sites Version 2 succeeded with the exact Sites-issued canonical; Version 1 remains rollback. Access stayed owner-only. No public access, custom domain, PR, real advertising code, publisher ID, paid report, individual contract, audit service, payment, or membership feature was created.
- Historical Turn 5B used Vinext 0.0.50, Vite 8.1.5, Cloudflare Vite plugin 1.45.1, Wrangler 4.112.0, React 19.2.6, and Next 16.2.10. Turn 5BC updates Next / eslint config to 16.2.11, Cloudflare Vite plugin to 1.47.0, and Wrangler to 4.114.0 while keeping Vinext, Vite, and React fixed.
- The current branch tracks the exact existing Site binding without recording its value in docs or logs. Production builds fail before bundling when the binding is missing, empty, malformed, unexpected, or secret-bearing.
- The exact Sites URL is tracked in `.env.production`; process/local overrides remain available, `.env.local` stays ignored, and clean-clone production builds need no manual environment value.
- No application, content, taxonomy, generated registry, component, source-link, review-evidence, or public-case file changed from the GitHub base.

`publication-eligible` means eligible in the repository's source/build contract. Owner-only deployment success does not prove public-release acceptance.

## Turn 5BC current branch state

Detailed evidence and restart steps are in `docs/TURN5C_DEPENDENCY_SECURITY_REFRESH.md`.

- Remote synchronization found protected `origin/main` and the compatibility branch at their required SHAs.
- Authenticated Sites readback produced one exact title/slug/URL/status/Version 2 match with custom owner-only access. The opaque identity value is not reproduced in this repository's prose.
- Stable Next.js remains 16.2.11. Audit remains red at high 2, critical 0 through optional Sharp 0.34.5.
- The public Worker blocks the unused Vinext image optimizer route with 404. Source imports, upload/decode/remote-image routes, and artifact Sharp/libvips/native binaries are absent.
- The exact-artifact exception is `DEBT_NONBLOCKING` until 2026-08-08 and returns to `BLOCK_SAFETY` on any recorded trigger. It permits local candidate work, never public release.
- Two deterministic compiles, editorial/generic lint, typecheck, 25/25 source tests, 26/26 image checks, Vinext build, and 5/5 Worker artifact tests pass.
- Content and UI are unchanged. No Sites deployment, access, environment, version, or public exposure was changed.

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
| `npm run build` | succeeds with tracked binding/canonical, process canonical unset, and `.env.local` absent |
| `npm run test:artifact` | 5 pass; safe exact binding, fail-closed manifest, route/content/link/ad and image-security contracts |
| `npm audit --json` | audit 0, or only the exact unexpired Turn 5C Sharp exception; current result high 2 / critical 0 and must remain reported as red |
| Worker public route smoke | 7/7 expected routes return 200 |
| blocked route smoke | template case/article, 5 fixtures, and legacy slug return 404 (8/8) |
| image optimizer route | `/_vinext/image` returns 404; Sharp/libvips/native image code absent from artifact |
| binding/canonical | safe nonempty source binding equals artifact; exact canonical/robots/sitemap; no `example.com` |
| sitemap/list/related | approved cases included; templates, fixtures, legacy excluded; exact related boundary retained |
| advertising | ineligible pages 0 placeholders; all pages 0 real ad code/elements |
| `git diff --check` | clean |
| secret/PII/artifact audit | no credential, personal identity, or oversized unintended artifact |

Turn 5BC uses Worker-artifact route evidence for source/build acceptance. Historical browser evidence remains in the Turn 4/5 records and is not upgraded into a fresh live deployment claim.

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
| Turn 5BC supervisory acceptance | Decide whether the exact remote branch may enter canonical source | May authorize a later main integration; does not itself deploy | exact remote commit, parity 0/0, protected refs unchanged, exception review | owner/supervisor gate | Supervisory AI / project owner | inspect the exact pushed commit; issue separate integration authority if accepted |
| Sharp stable remediation | Remove the bounded exception | Restores audit 0 on a supported stable framework | patched stable Next.js and the complete validation suite | upstream pending; exception expires 2026-08-08 | Implementation AI | recheck on release, trigger, or expiry; never force or override Sharp |
| Turn 6 local candidate | Prepare the public-editorial-release candidate without live effects | Produces local review evidence only | accepted branch; same runtime/image contract; unexpired exception | enabled after supervisory acceptance | Implementation AI | work locally; keep deployment/access/public release closed |
| Public editorial MVP | Accept public access, exact artifact, canonical metadata, correction/removal flow, and production behavior | Begins public observatory operation | valid security state, explicit owner public-release decision, fresh live evidence | Turn 6 owner gate | Project owner/editor | Keep closed until separately authorized |
| AdSense technical probe | Test the planned future revenue path on eligible detail pages | Adds external policy/account/code surface | public MVP, owner publisher setup, privacy/consent review, explicit authorization | Turn 7 closed | Project owner | Keep all IDs and scripts absent until the gate opens |
| Recurring observation loop | Sustain research, review, publication, re-verification, and correction | Creates an ongoing editorial cadence | owners, schedule, evidence refresh and correction SLA | Turn 8 closed | Editor + project owner | Define only after public MVP acceptance |
| Held Anthropic simulation | Preserve a bounded research lead without forcing taxonomy | No current compiler/publication effect | taxonomy packet and simulation-scope decision | Held | Taxonomy owner/editor | Revisit only with a precise approved category |
| Rejected/legacy Gemini directions | Preserve negative rationale | Prevents capability claims becoming unsupported failure cases | direct bounded failure evidence | Rejected/blocked | Research editor | Do not revive from capability material alone |

## Farthest safe roadmap

1. Review the exact Turn 5BC remote commit and decide whether to integrate it to `main`; branch success does not authorize integration.
2. Build the Turn 6 candidate locally under the recorded Sharp exception. Public release remains a separate owner gate.
3. Turn 6 public release, only after an owner decision and fresh security/access evidence: validate the exact deployed artifact, live canonical URL, sitemap/robots, case routes, correction/removal path, mobile UI, console, and rollback.
4. Turn 7, only after a public editorial MVP and policy/account readiness: run a narrowly scoped AdSense technical probe on eligible detail pages. Do not add a real publisher ID before authorization.
5. Turn 8: establish recurring source review, case drafting, human approval, publication, re-verification, correction, and retirement procedures with measurable ownership.
6. Turn 9: establish evidence-freshness targets, source-link health checks, correction SLA, and explicit stale-case states.
7. Turn 10: expand the corpus only through coverage targets and case-level human approval; separate document count, source-origin count, and independent reproduction in the schema when migration evidence is ready.
8. Turn 11: bind every release decision to source SHA, artifact digest, dependency audit, access policy, rollback target, accessibility checks, and a reproducible release manifest.
9. Turn 12: operate the observatory against transparent reliability, editorial, accessibility, and correction metrics; review taxonomy and policy changes through an auditable governance cadence.

Do not propose or implement paid reports, individual contracts, audit services, payments, or membership features. The intended future revenue lane is owner-authorized Codex Sites publication followed by advertising eligibility work.

## Resume sequence

1. Read live Git state first: branch, HEAD, worktree, upstream parity, and `origin/main` parity.
2. Read this handoff, `docs/TURN5C_DEPENDENCY_SECURITY_REFRESH.md`, `docs/DEVELOPMENT_TURNS.md`, and `docs/TURN5B_GITHUB_BACKPORT_INVENTORY.md`.
3. Fetch and remain on `codex/lro-turn5c-security-refresh`; require its upstream parity `0/0`. Do not merge it or open a PR without new authority.
4. Before dependency reconstruction, confirm no overlapping package operation in this checkout. Run `npm ci --include=optional`, then `npm ls --depth=0`.
5. Re-run `npm audit --json`. The accepted branch result is high 2 / critical 0 through Next.js -> Sharp 0.34.5 only; any additional advisory or changed reachability is a safety regression.
6. Keep `NEXT_PUBLIC_SITE_URL` unset and `.env.local` absent for the clean canonical/build proof. Verify source/artifact binding equality without printing the identity value.
7. The next supervisory action is branch acceptance/main-integration judgment. The next implementation lane is a local Turn 6 candidate; public release remains owner-controlled.

## Guardrails

- Preserve `content/_fixtures`; never publish fixtures.
- Never infer human approval; use the explicit decision record.
- Keep issuer document count, independent origins, and independent reproduction separate.
- Keep local build/Worker evidence, owner-only deployment evidence, and public-release evidence separate.
- Do not expose blocked content through alternate routes or preview parameters.
- Do not add submissions, admin, auth, DB, API, payments, accounts, rankings, real ad IDs, or deployment/access changes in the current lane.
- Keep the tracked Site identity confined to `.openai/hosting.json`; never copy its value into docs, logs, or reports.
