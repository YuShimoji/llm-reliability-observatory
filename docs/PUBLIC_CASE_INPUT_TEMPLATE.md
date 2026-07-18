# Public Case Intake Status

## Active review candidate

現在のactive candidateは`content/cases/002-gpt-4o-sycophancy-rollback.mdx`です。

- source: OpenAI公式資料2件
- case kind: `documented_regression`
- state: `draft: true` / `review_status: pending`
- AI assistance: 使用・開示済み、人間レビュー未完了
- production exposure: なし
- local review: `samples/_review/publication-engine-v2/002-gpt-4o-sycophancy-rollback/`

公開前に、人間editorがsourceとの一致、一般化の回避、`sev2`の保守性、反証、AI開示を確認します。

## Blocked legacy candidate: Gemini nonexistent capability

2026-05-29に受領した下記候補は削除せず、履歴参照として保持します。ただし実在source URL、正確なproduct/version、独立した証拠が不足するため、現行のactive gate、compiler入力、公開候補ではありません。この候補が未解決でも他の一次資料付きcaseを進められます。

State: `blocked_legacy_candidate`

| Blocker | Effect | Requirement | Owner | Next move |
|---|---|---|---|---|
| source URLがplaceholder | 主張を検証できない | 実在する公式または一次資料 | 元情報のowner | sourceを提示できる場合だけ再評価 |
| product/versionが`unknown` | 対象範囲を固定できない | 観測時点のproduct/surface/plan | 元情報のowner | 観測記録を補完 |
| 再現未確認 | 単発説明を一般化できない | conversation evidenceまたは再現手順 | editor | 入手できなければblocked維持 |

Legacy payload（公開・コピー禁止）:

```yaml
title: "存在しない機能案内の事例"
slug: "001-nonexistent-feature-guidance"
date: "2026-05-29"
case_kind: "observed_output"
review_status: "pending"
last_verified_at: "2026-05-29"
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
verification_status: "unverified_signal"
reproducibility: "not_attempted"
public_summary: "ユーザーが特定サービスの自動実行可否を確認した際、AIが実在確認できない機能を可能であるかのように案内したとされる未検証候補。"
source_links:
  - label: "TODO: real source required"
    url: "https://example.com/blocked-placeholder"
    source_type: "official"
    accessed_at: "2026-05-29"
disclosure: null
ai_assistance:
  used: false
  disclosure: "Legacy human-provided candidate; evidence incomplete."
  human_reviewed: false
draft: true
```

このpayloadには意図的な`TODO`と`example.com`があり、Publication Engine v2なら公開不可です。`content/cases`へコピーしません。

## Intake rule

新しい候補は`docs/CASE_PUBLICATION_GUIDE.md`を使用します。AI補助草稿を全面禁止しませんが、source、検証範囲、反証、AI開示、review status、人間承認を省略しません。
