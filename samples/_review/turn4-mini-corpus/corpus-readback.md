# Turn 4 Mini Corpus Readback

Updated: 2026-07-20

Scope: case-level owner/editor decisions, source/build publication eligibility, local static review, and production-component acceptance. External deployment is not included.

## Decision set

| Slug | Decision and state | Evidence boundary |
|---|---|---|
| `002-gpt-4o-sycophancy-rollback` | approve; `draft: false`, `approved`, human true | OpenAI documents 2 / issuing origin 1 / no independent reproduction; `single_source` |
| `003-new-bing-long-session-context-confusion` | `context_loss` explanation corrected, then approve; `draft: false`, `approved`, human true | Microsoft documents 2 / issuing origin 1 / no independent reproduction; `single_source` |
| `004-github-copilot-insecure-code-replication` | approve; `draft: false`, `approved`, human true | independent research teams 2 / published targeted replication / not rerun by LRO; `multi_source` |

The explicit authority record is `../turn4-publication-acceptance/editorial-decision-record.md` / `.json`. No personal identity is stored. The set covers three vendors or issuers and three primary categories, but remains curated rather than statistical or comparative.

## Classification and verification readback

- `context_loss` is LRO's editorial category, not Microsoft terminology. The case states Microsoft's direct scope: very long sessions could confuse the model, reduce accuracy, or produce unintended tone.
- Two same-origin documents do not establish independent sources. OpenAI and Microsoft remain `single_source`.
- The Copilot case remains `multi_source` because a second research team published a targeted replication. LRO did not rerun it.
- Document count, source-origin count, and independent reproduction remain separate review dimensions even though the current schema stores a two-value verification status.

## Static local review result

- `corpus-review.html` accepts either blocked pending drafts or fully eligible approved cases and shows the current approved set.
- It reuses production card, detail, source-link, badge, metadata, and related-case components.
- Exact filters remain available for category, vendor, verification status, and case kind.
- The Reset control is present in static markup. Selecting GitHub produced `1 of 3 cases` with one visible card/detail; Reset cleared all four selects and restored `3 of 3` cards/details.
- Six source links use `target="_blank"` and `rel="noopener noreferrer"`.
- Local review ad elements: 0. Browser console errors: 0. Horizontal overflow: false.

## Production-component result

- `/cases` showed `3 published` and all three cards at desktop 1280x800 and mobile 390x844.
- GitHub filter produced `1 of 3`; Reset restored `3 of 3`. An intentionally impossible `context_loss + reproduction_test` combination produced the deterministic empty state, then Reset recovered all cases.
- All three detail routes displayed approved/human-reviewed state, 9 sections, 2 safe source links, and 3 inert eligible-detail ad placeholders.
- Related boundary: 002 -> 003, 003 -> 002, 004 -> no related case. Only exact category/vendor/case-kind equality is used.
- Real advertising elements or code: 0. Browser console errors: 0. Desktop/mobile horizontal overflow: false.
- Template case/article, all 5 fixtures, and the legacy Gemini slug returned 404. Sitemap includes the 3 approved slugs and excludes all blocked inputs.

## Image acceptance

The 8 current production acceptance images are stored under `../turn4-publication-acceptance/`:

- `public-cases-desktop.png`, `public-cases-mobile.png`
- `002-detail-desktop.png`, `002-detail-mobile.png`
- `003-detail-desktop.png`, `003-detail-mobile.png`
- `004-detail-desktop.png`, `004-detail-mobile.png`

Browser capture bytes were JPEG. Each was decoded and encoded as PNG, not renamed. Every file begins with `89 50 4E 47 0D 0A 1A 0A`, is below 1MB, and was reopened for visual inspection. Detail evidence joins two discrete viewports; it is not a continuous full-page image.

No garbled text, clipped required label, missing source display, or horizontal overflow was found.

## Boundary and next gate

Turn 4 approval covers repository source/build publication eligibility. It does not authorize Sites settings, deployment, a public URL, domain configuration, real advertising, paid reports, individual contracts, audit services, payments, or membership.

The next gate is owner-only Turn 5 Sites compatibility from updated `main` on a new branch. Actual external publication remains a separate owner decision and must be validated against the exact deployed artifact.
