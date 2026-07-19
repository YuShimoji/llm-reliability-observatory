# Project Overview

現在状態の正本は`docs/HANDOFF.md`、開発順序の正本は`docs/DEVELOPMENT_TURNS.md`です。

## まず見る場所

| 知りたいこと | 正本 |
|---|---|
| 現在地、検証、残作業、owner gate | `docs/HANDOFF.md` |
| Turn 0〜8と出口条件 | `docs/DEVELOPMENT_TURNS.md` |
| 公開契約と手順 | `docs/CASE_PUBLICATION_GUIDE.md` |
| case単位の人間判断 | `samples/_review/turn4-publication-acceptance/editorial-decision-record.md` / `.json` |
| evidence選定と否定判断 | `samples/_review/turn4-mini-corpus/corpus-evidence-matrix.md` / `.json` |
| production受入画像 | `docs/SCREENSHOT_INDEX.md` |
| 方法、編集、分類、広告 | `docs/METHODOLOGY.md`, `docs/EDITORIAL_POLICY.md`, `docs/TAXONOMY.md`, `docs/MONETIZATION_POLICY.md` |

## 実装済み範囲

| 項目 | 現在状態 | 主な実装・証跡 |
|---|---|---|
| Static Next.js App Router | 維持 | 12の基本routeと3 case detailを静的生成 |
| Publication Engine v2 | 実装・受入済み | schema、compiler、deterministic registry、fail-closed gate |
| 公開取得ガード | 実装・テスト済み | 一覧、direct detail、related、sitemapはeligible contentのみ |
| 一次資料mini corpus | 3件承認済み | OpenAI、Microsoft、GitHub; owner/editor判断記録あり |
| Observatory UI | 実装・ブラウザ確認済み | 4 exact filters、Reset、更新日・分類、deterministic related cases |
| local-only review | 実装済み | 単体と一括generator; static Resetも検証 |
| 広告適格性 | 実装・テスト済み | eligible detailだけにinert placeholder; 実広告コード0 |
| Production acceptance images | 8枚保存 | `/cases`と3 detailのdesktop/mobile真正PNG |
| MkDocs local documentation view | 維持 | `docs/index.md`, `mkdocs.yml` |

## 現在のコンテンツ状態

- source/build上の公開case: 3件。
- 公開article: 0件。
- blocked case: template 1件。
- fixture: 5件。`content/_fixtures/`外へ移さず、routeは404。
- legacy Gemini candidate: documentation-only blocked reference。compiler入力ではなくrouteは404。
- held Anthropic / rejected Gemini research directions: evidence matrix内の意思決定記録のみ。

3件は`draft: false`、`review_status: approved`、`ai_assistance.human_reviewed: true`です。ただしrepo/buildの公開適格性はexternal deploymentやpublic URL acceptanceと同義ではありません。

## 現在作らないもの

投稿、管理画面、認証、DB、API、メール、決済、コメント、投票、ランキング、会員機能、有料レポート、個別契約、監査サービス、スポンサー契約、手動納品、実AdSense JavaScript、Sites deployment、domain変更はTurn 4に含みません。

次はowner-onlyのTurn 5です。更新後の`main`から専用branchを作り、ownerがhostingと外部状態変更を明示した場合だけSites compatibilityへ進みます。将来の収益化方針は、Codex Sitesでの公開受入後に広告適格性を検討することです。
