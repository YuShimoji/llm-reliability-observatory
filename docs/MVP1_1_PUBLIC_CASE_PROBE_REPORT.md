# MVP1.1 Public Case Integration Probe Report

Date: 2026-05-27

Repository: `llm-reliability-observatory`

Branch: `main`

HEAD at probe start: `cee3d10 Implement MVP1 static casebook skeleton`

## Branch Chosen

No human-provided publishable case body was found in the current task prompt or in `content/cases`.

Because the project rule is that AI must not invent public case prose, this probe did not create a `draft: false` public case. The work stayed on the input-contract path and added `docs/PUBLIC_CASE_INPUT_TEMPLATE.md` for the first human-authored case.

## Existing Local Changes Observed

The repository was not clean at probe start, even though the handoff note said it should be clean.

Observed pre-existing local changes:

- `docs/HANDOFF.md` had an unstaged link to `docs/CASE_PUBLICATION_GUIDE.md`.
- `docs/CASE_PUBLICATION_GUIDE.md` existed as an untracked file.
- `tests/content-publication.test.ts` existed as an untracked file and was included by the existing `npm test` command.

These changes were preserved and not reverted.

## Commands Run

| Command | Result |
|---|---|
| `git status --short --branch` | `## main...origin/main`, with local unstaged/untracked files already present |
| `git log --oneline -5` | Latest commit was `cee3d10 Implement MVP1 static casebook skeleton` |
| `npm run lint:editorial` | Passed with no warnings |
| `npm test` | Passed, 8 tests |
| `npm run build` | Passed, 15 pages generated |
| `node -v` | `v22.19.0` |
| `npm -v` | `10.9.3` |
| OS check | `Microsoft Windows NT 10.0.26200.0` |

`npm test` currently runs 8 tests because the local untracked `tests/content-publication.test.ts` file adds publication-boundary coverage for public queries and sitemap behavior.

## Display Probe

No public case was added, so the public detail route `/cases/[slug]` could not be validated with real case data in this run.

After `npm run build`, `next start` was checked with:

```bash
node .\node_modules\next\dist\bin\next start -p 3100
```

Result:

- `http://127.0.0.1:3100/cases` returned HTTP 200.
- The server reported ready through `next start`.

## Boundaries Confirmed

| Boundary | Result |
|---|---|
| Public case creation | Not performed because no human case text was available. |
| Fixtures | `content/_fixtures` was not reused as public content. |
| Draft template | `content/cases/001-template-case.mdx` remains the only case template and stays draft-only. |
| Sitemap | No new public case slug was added because no `draft: false` case was created. |
| AdSense | No AdSense JavaScript was added. Existing placeholder-only behavior was left unchanged. |
| Scope exclusions | No submission form, admin UI, auth, Supabase, DB, Storage, email, payment, API route, ranking, score UI, or account feature was added. |

## next dev Note

This probe did not debug `next dev`; that remains outside the MVP1.1 scope.

Recorded environment:

- Node: `v22.19.0`
- npm: `10.9.3`
- OS: `Microsoft Windows NT 10.0.26200.0`
- Known command with issue: `next dev -p 3101`
- Known symptom from handoff: Next.js prints `Starting...` and does not serve HTTP in this environment.
- Alternative checked in this probe: `next start -p 3100` after `npm run build` served `/cases` with HTTP 200.

## Remaining Uncertainty

The actual public-case surface is still unproven with real data. Severity badge, verification badge, case metadata layout, detail-page AdSlot, RelatedCases behavior, and sitemap inclusion for a real public case remain to be checked after a human provides one publishable case.

## Safe Next Work

1. Fill `docs/PUBLIC_CASE_INPUT_TEMPLATE.md` with one human-authored, source-backed case.
2. Add one `content/cases/<slug>.mdx` with `draft: false` only after the publication gate is satisfied.
3. Run `npm run lint:editorial`, `npm test`, and `npm run build`.
4. Use `next start` to check `/cases`, `/cases/<slug>`, policy pages, and `/sitemap.xml`.
