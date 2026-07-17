# Continuation

Updated: 2026-07-17

Status: **Remote handoff blocked at the repository-visibility decision gate. Local documentation handoff is committed and verified.**

## Repository coordinates

| Item | Value |
|---|---|
| Repository | `YuShimoji/llm-reliability-observatory` |
| Source remote | `origin` -> `https://github.com/YuShimoji/llm-reliability-observatory.git` |
| Default branch | `main` |
| Handoff branch | `codex/refresh-restart-handoff` |
| Implementation/base commit | `add9336` (`docs: add local documentation overview`) |
| Final documented change commit | `2eeba80` (`docs: record Sites monetization handoff`) |
| Expected upstream after approval | `origin/codex/refresh-restart-handoff` |

`2eeba80` is the final content/handoff implementation commit. This `CONTINUATION.md` is a separate state record; use `git rev-parse HEAD` to identify the commit containing the record itself.

## Why the remote handoff is not complete

The remote exists, resolves to the expected `YuShimoji` owner, uses HTTPS, and has `main` as its default branch. GitHub CLI authentication is active as `YuShimoji`.

The hosted repository is currently **public**, while the user-owned cross-repository policy at `C:\Users\PLANNER007\.codex\policies\repository-workflow.yaml` requires repositories in this workspace to be **private** before push. The policy treats that mismatch as a decision gate and forbids changing visibility automatically.

No push, visibility change, remote mutation, or pull request has been performed in this handoff turn. A user decision is required before the branch can be put on `origin`:

1. Make `YuShimoji/llm-reliability-observatory` private, then push the handoff branch; or
2. Explicitly direct this task to keep the repository public and authorize proceeding despite the private-repository baseline.

The second option should be chosen only if the project and the new business/technical decision record are intentionally public.

## What is preserved

| Document | Role |
|---|---|
| `docs/HANDOFF.md` | Current state, guardrails, verification, document authority, and next safe work |
| `docs/SITES_MONETIZATION_REANALYSIS.md` | Dated Sites/business decision record, official policy correction, platform risks, and revenue ladder |
| `docs/DEVELOPMENT_TURNS.md` | Work lanes and exit conditions |
| `docs/PUBLIC_CASE_INPUT_TEMPLATE.md` | Human-provided first-case candidate and publication gate |
| `docs/MVP1_VERIFY_REPORT.md` / `docs/MVP1_1_PUBLIC_CASE_PROBE_REPORT.md` | Historical verification snapshots |
| `README.md` | Fast cross-device entry point and verified local review path |

The owner-authored `docs/METHODOLOGY.md`, `docs/EDITORIAL_POLICY.md`, `docs/TAXONOMY.md`, and `docs/MONETIZATION_POLICY.md` remain TODO. The dated reanalysis does not replace those final policies.

## Decisions carried forward

1. The next implementation bottleneck is content contract hardening before any `draft: false` case.
2. `source_links` needs one validated `{ label, url }` contract, clickable rendering, and positive integration coverage.
3. Publication must fail closed with runtime validation and `draft === false`; missing fields or sections must not render as a public `TODO`.
4. The first 3-5 verified cases are for free discovery and credibility. A paid pilot starts only after roughly 5-10 verified cases plus Methodology and a correction channel.
5. Sites is only a potentially viable free publishing/trust/analytics surface until a reproducible Worker HTTP probe passes.
6. Current OpenAI guidance forbids ChatGPT Sites from processing payment-card data or enabling financial transactions. Do not place checkout, payment links, purchase buttons, billing webhooks, or entitlement billing on a Site.
7. Any paid audit, report, SaaS, or API commerce flow must use a separately approved and compliant operating surface. Sites must remain informational unless OpenAI policy changes.
8. `origin` is the only source remote. Any future `sites` remote is deployment-only and must not be used for source parity claims.

## Verification on 2026-07-17

| Check | Result |
|---|---|
| `npm run lint:editorial` | Passed with no warnings |
| `npm test` | Passed, 8/8 tests |
| `npm run build` | Passed, 15 static/SSG pages with Next.js 15.5.18 |
| `python -m mkdocs build --strict --clean -d <temp-dir>` | Passed; Material for MkDocs printed its upstream MkDocs 2.0 compatibility notice |
| `git diff --check` | Passed |
| Production HTTP boundary | 12 public/metadata routes returned 200; 7 forbidden/draft/fixture routes returned 404 |
| Public index leak check | Passed; template and fixture slugs were absent |
| `npm audit --audit-level=moderate` | Exit 0, but one low-severity `esbuild` advisory remains (`GHSA-g7r4-m6w7-qqqr`) |

Expected 404 requests for fallback-disabled draft/fixture detail routes still emit `Internal: NoFallbackError` messages to server stderr. The HTTP boundary is correct, but the operational warning is unresolved.

Current automated tests do not cover nested/multiline frontmatter, missing `draft`, invalid taxonomy/source values, or a complete positive public-case render.

## Remaining work and correct owner

| Work | Current blocker or owner | Safe next action |
|---|---|---|
| Remote handoff | Project owner must resolve public/private decision | Resolve visibility, push with upstream, verify parity |
| Content contract hardening | Implementation scope; dependency/contract changes require an explicit slice | Add validation, strict draft gate, source object/rendering, required sections, positive tests |
| First public case | Project owner | Supply real official URL and approve summary/taxonomy |
| Methodology and policies | Project owner | Author or explicitly delegate final text |
| Sites compatibility | Separate implementation/deployment scope | Preserve Next.js rollback and create a reproducible Worker HTTP go/no-go probe |
| Paid validation | Business owner, outside Sites | Use free discovery first; later run separate contract/invoice/fulfillment workflow |

## Resume commands

On the originating machine, the local branch is ready:

```powershell
cd C:\Users\PLANNER007\llm-reliability-observatory
git switch codex/refresh-restart-handoff
git log --oneline -5
git status -sb
```

After the visibility decision and successful push, another machine can use:

```powershell
git clone https://github.com/YuShimoji/llm-reliability-observatory.git
cd llm-reliability-observatory
git fetch origin
git switch --track origin/codex/refresh-restart-handoff
npm install
npm run lint:editorial
npm test
npm run build
```

If the branch has already been merged, use `git switch main` and `git pull --ff-only origin main` instead.

## Completion gates for the next turn

- [ ] Resolve the public/private repository decision.
- [ ] Scan the proposed commit range for secrets and non-noreply author/committer email.
- [ ] Push `codex/refresh-restart-handoff` with its upstream on `origin`.
- [ ] Verify `git rev-list --left-right --count origin/codex/refresh-restart-handoff...HEAD` returns `0 0`.
- [ ] Verify the worktree is clean.
- [ ] Update this status from blocked to complete and record the pushed branch tip.

A pull request was not requested and must not be created automatically.

