# Public Case Input Template

This is the input contract for adding the first public case. It is not a public page and must not be copied from `content/_fixtures`.

Do not create a `draft: false` case until a human provides the case text, evidence, and source links. If a value is not known, keep it as `unknown` or use the lowest supported verification status.

## Frontmatter Input

```yaml
title: ""
slug: ""
date: "YYYY-MM-DD"
model_vendor: ""
model_product: ""
model_version: ""
version_is_estimated: true
surface: "unknown"
plan: "unknown"
task_category: "unknown"
primary_failure_category: "unknown"
secondary_failure_categories: []
severity: "sev0"
verification_status: "unverified_signal"
reproducibility: "unknown"
public_summary: ""
source_links: []
disclosure: null
draft: true
```

## Field Notes

| Field | Publication requirement |
|---|---|
| `title` | Human-written case title. Avoid sensational or accusatory wording. |
| `slug` | Stable URL slug, lowercase and hyphenated. |
| `date` | Observation or publication date in `YYYY-MM-DD`. |
| `model_vendor` | Vendor name as observed by the human source, or `unknown`. |
| `model_product` | Product/model surface name as observed, or `unknown`. |
| `model_version` | Exact version if known; otherwise `unknown`. |
| `version_is_estimated` | `true` when the version is inferred or unknown. |
| `surface` | Use a current taxonomy value such as `chat`, `api`, `agent`, `coding_assistant`, or `unknown`. |
| `plan` | Plan/tier if relevant and safe to publish, otherwise `unknown`. |
| `task_category` | Use a current taxonomy value such as `research`, `coding`, `planning`, `writing`, or `unknown`. |
| `primary_failure_category` | Use a current taxonomy value; keep `unknown` if classification is uncertain. |
| `secondary_failure_categories` | Optional supporting categories. Use `[]` when none are established. |
| `severity` | Current supported values are `sev0`, `sev1`, `sev2`, `sev3`, and `sev4`. Do not overstate severity. |
| `verification_status` | Current supported values are `unverified_signal`, `single_source`, `multi_source`, `reproduced`, and `corrected`. Use `unverified_signal` when evidence is incomplete. |
| `reproducibility` | Short human-written note such as `not_attempted`, `single_attempt`, `reproduced_once`, or `unknown`. |
| `public_summary` | 160-220 Japanese characters is preferred for public listing copy. Use bounded phrasing such as "in this observed case". |
| `source_links` | At least one human-provided source link is required before publishing. Do not fabricate links. |
| `disclosure` | Use `null` unless there is a real conflict, sponsorship, affiliate, or other disclosure to state. |
| `draft` | Keep `true` until the case is ready for public display. |

## Body Input

Fill every section with human-provided text or a human-approved summary. Remove private data, email addresses, phone numbers, API keys, internal logs, and confidential material before publication.

### 状況

### 期待していた回答

### 実際の回答または要約

### 誤りと判断した根拠

### 再現条件

### 分類根拠

### 反証考察

### 編集後記

### 出典・参考リンク

## Publication Gate

Before setting `draft: false`, confirm all of the following:

- The prose was provided or approved by a human.
- The case is not copied from `content/_fixtures`.
- `source_links` contains at least one real source.
- `public_summary` is specific enough for a listing page but does not overclaim.
- The verification status matches the evidence actually available.
- The text does not include personal information, secrets, internal data, or unsupported claims.
- `npm run lint:editorial`, `npm test`, and `npm run build` pass.
