# Project Handoff

Updated: 2026-05-26

Repository: `llm-reliability-observatory`

Branch: `main`

Remote: `origin` -> `https://github.com/YuShimoji/llm-reliability-observatory.git`

## Current State

MVP1 Static Casebook Skeleton has been implemented and audited as a static Next.js App Router site.

The project is intentionally limited to a static casebook skeleton. It does not include submissions, admin screens, authentication, Supabase, database, storage, email, payments, API routes, comments, voting, ranking, user accounts, organization pages, pricing, subscriptions, AdSense JavaScript, or model score/ranking UI.

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

## Verification Already Performed

Detailed audit report:

- `docs/MVP1_VERIFY_REPORT.md`

Screenshot artifacts:

- `samples/_review/mvp1-route-audit/`

Commands that passed after the audit fixes:

```bash
npm run lint:editorial
npm test
npm run build
npm audit --audit-level=moderate
```

Test coverage currently includes:

- AdSlot allowlist and denylist behavior.
- Editorial lint negative examples for email, phone number, API-key-like string, derogatory terms, warning-only terms, fixture exclusion, and classification frontmatter exclusion.

## Operational Notes

`next start` works for verification after `npm run build`.

`next dev` was tested on this machine and repeatedly stayed at `Starting...` without serving HTTP. This was recorded but not debugged further because the audit request said not to deep-dive. Also, do not run `next dev` and `next start` against the same `.next` output at the same time; doing so can make static asset checks fail until the project is rebuilt.

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
| Verify published content | Add one human-authored `draft: false` case or article and verify detail rendering. | Real detail-page checks for badges, related cases, and detail AdSlot. |
| Debug dev server | Investigate why `next dev` stays at `Starting...` on this machine. | Faster local iteration. |
| Polish assets | Add favicon and minimal OG image. | Removes favicon 404 and improves sharing previews. |
| Editorial expansion | Human-authored docs and public case text. | First publishable version without changing the static architecture. |

## Guardrails For Future Work

- Keep public case/article prose human-authored.
- Keep fixtures under `content/_fixtures`.
- Keep `draft: true` content out of listings, detail routes, and sitemap.
- Keep AdSense JavaScript out of MVP1; only placeholder slots are allowed.
- Do not add API routes, auth, DB, Supabase, storage, mail, payment, comments, voting, ranking, or account features during MVP1 skeleton work.
