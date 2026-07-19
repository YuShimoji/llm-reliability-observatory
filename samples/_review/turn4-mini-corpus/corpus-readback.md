# Turn 4 Mini Corpus Readback

Validated: 2026-07-19

Scope: local review only. This readback records technical reviewability and production non-exposure. It is not publication approval.

## Review set

| Slug | Evidence boundary | State |
|---|---|---|
| `002-gpt-4o-sycophancy-rollback` | 2 documents / 1 source origin / no independent reproduction | `draft: true`, `pending`, human review false |
| `003-new-bing-long-session-context-confusion` | 2 documents / 1 source origin / no independent reproduction | `draft: true`, `pending`, human review false |
| `004-github-copilot-insecure-code-replication` | 2 documents / 2 independent research teams / published targeted replication not rerun by LRO | `draft: true`, `pending`, human review false |

The set covers three vendors or issuers and three primary categories. It is deliberately curated and is not a statistical sample, market ranking, or vendor scorecard.

## Local review result

- `corpus-review.html` reuses the production card, detail, source-link, badge, metadata, and related-case components.
- Exact filters are available for category, vendor, verification status, and case kind. Selecting GitHub produced `1 of 3 cases`; resetting restored all three.
- Six external source links are visible and use `target="_blank"` with `rel="noopener noreferrer"`.
- Related cases use only explicit exact metadata matches and display the matching field; no semantic or causal relationship is inferred.
- Desktop 1280x800 and mobile 390x844 were opened in the in-app browser. Required text and links were visible without garbling or horizontal overflow.
- Review advertising elements: 0. Browser console errors: 0.
- `corpus-review-desktop.png` and `corpus-review-mobile.png` were decoded and encoded as real PNG files. Both begin with `89 50 4E 47 0D 0A 1A 0A`.

## Production non-exposure result

- 12 public routes returned 200.
- All five draft routes, including the template case, all three corpus cases, and the template article, returned 404.
- Corpus slugs appeared zero times in production case/article listings and sitemap.
- Production `/cases` remained an honest 0-published empty state on desktop and mobile.
- Production advertising elements or markers: 0. Browser console errors: 0. Horizontal overflow: false.

## Human review checklist

For each case, read the MDX and every linked primary source, then record exactly one decision: `approve`, `revise`, or `reject`.

- Confirm the summary and each body claim remain inside the directly supported evidence.
- Confirm date, product/version boundary, case kind, category, severity, and verification status.
- Confirm counterevidence and non-generalization language.
- Confirm AI-assistance disclosure and any independent-reproduction wording.
- State concrete edits for `revise`; state the evidence or scope reason for `reject`.

Do not change `draft`, `review_status`, or `ai_assistance.human_reviewed` merely because the technical review passed. Publication-state changes require an explicit human case-level decision followed by the full validation suite.
