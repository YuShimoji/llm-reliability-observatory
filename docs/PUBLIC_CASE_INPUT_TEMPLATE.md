# Public Case Input Template

This is the input contract for adding the first public case. It is not a public page and must not be copied from `content/_fixtures`.

Do not create a `draft: false` case until a human provides the case text, evidence, and source links. If a value is not known, keep it as `unknown` or use the lowest supported verification status.

## Current Candidate Input

Status: not ready to publish.

The following candidate is based on human-provided text from 2026-05-29. It has been aligned with the current taxonomy where possible, but it must not be copied into `content/cases` until the remaining publication blockers are resolved.

| Item | Current adjustment |
|---|---|
| `surface` | Human input used `web`; current taxonomy does not define it, so use `chat` for a web chat UI unless the taxonomy is intentionally expanded later. |
| `primary_failure_category` | Human input used `nonexistent_feature`; current taxonomy value is `nonexistent_capability`. |
| `secondary_failure_categories` | Human input used `overconfidence`; current taxonomy does not define it, so keep `[]` and describe the confidence issue in prose only. |
| `verification_status` | Human input used `evidence_supported`; current taxonomy value closest to one official source is `single_source`. Use `unverified_signal` instead if the real source URL is not supplied. |
| `public_summary` | Current text is 116 characters. A human should expand or approve it to the preferred 160-220 character range before publication. |
| `source_links` | The URL is still a placeholder. A real official source URL is required before publication. |
| `draft` | Keep `true` in this staging file. Set `draft: false` only in the actual `content/cases/<slug>.mdx` file after the publication gate passes. |

```yaml
title: "存在しない機能案内の事例"
slug: "001-nonexistent-feature-guidance"
date: "2026-05-29"
model_vendor: "google"
model_product: "Gemini"
model_version: "unknown"
version_is_estimated: true
surface: "chat"
plan: "unknown"
task_category: "research"
primary_failure_category: "nonexistent_capability"
secondary_failure_categories: []
severity: "sev2"
verification_status: "single_source"
reproducibility: "unknown"
public_summary: "この事例では、ユーザーが特定サービスの自動実行可否を確認した際、AIが実在確認できない機能を可能であるかのように案内した。公式情報と照合すると、少なくとも当該条件で利用可能な機能としては確認できず、存在しない機能案内として分類した。"
source_links:
  - label: "TODO: 公式ヘルプまたは仕様ページ"
    url: "TODO: https://..."
disclosure: null
draft: true
```

### 状況

ユーザーは、特定の生成AI関連サービスについて、定期実行や自動生成が可能かを確認した。

### 期待していた回答

実際に利用可能な機能、公式に提供されている自動化手段、または未提供である場合の制約を明確に説明することを期待していた。

### 実際の回答または要約

AIは、当該サービスを定期的に実行し、成果物を自動生成できるかのように案内した。

### 誤りと判断した根拠

公式ヘルプまたは公開仕様を確認した範囲では、AIが案内したような自動実行機能は確認できなかった。したがって、この事例では存在しない機能案内として扱う。

### 再現条件

同一条件での再現は未確認。会話時点の単発事例として扱う。

### 分類根拠

主分類は `nonexistent_capability` とする。AIが、実在確認できない機能を可能であるかのように説明したためである。根拠が不十分なまま可能性を強く述べた点は、現行taxonomyの副分類には置かず、編集上の観点として記録する。

### 反証考察

公式ページの更新、地域差、プラン差、実験的機能の有無によって解釈が変わる可能性がある。そのため、この事例はサービス全体の恒常的な不具合ではなく、当該条件で観測された出力事故として扱う。

### 編集後記

この種の誤案内は、ユーザーに存在しない運用フローを計画させる点で作業阻害を生みやすい。特に自動化・スケジュール実行・API提供状況のような機能確認では、公式情報との照合が必要である。

### 出典・参考リンク

- TODO: 公式ヘルプまたは仕様ページ: `TODO: https://...`

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

## Publication Gate

Before setting `draft: false`, confirm all of the following:

- The prose was provided or approved by a human.
- The case is not copied from `content/_fixtures`.
- `source_links` contains at least one real source.
- `public_summary` is specific enough for a listing page but does not overclaim.
- The verification status matches the evidence actually available.
- The text does not include personal information, secrets, internal data, or unsupported claims.
- The case uses taxonomy values that currently exist in `src/lib/taxonomy.ts`.
- `npm run lint:editorial`, `npm test`, and `npm run build` pass.
