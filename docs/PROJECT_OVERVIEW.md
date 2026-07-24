# Project Overview

現在状態の正本は`docs/HANDOFF.md`、開発順序の正本は`docs/DEVELOPMENT_TURNS.md`です。

## まず見る場所

| 知りたいこと | 正本 |
|---|---|
| 現在地、検証、残作業、owner gate | `docs/HANDOFF.md` |
| Turn 0〜12と出口条件 | `docs/DEVELOPMENT_TURNS.md` |
| owner-only Sites証跡 | `docs/TURN5_SITES_COMPATIBILITY.md` |
| GitHub backport境界と再開手順 | `docs/TURN5B_GITHUB_BACKPORT_INVENTORY.md` |
| 2026-07-25依存security refreshと監修引継ぎ | `docs/TURN5C_DEPENDENCY_SECURITY_REFRESH.md` |
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
| Owner-only Sites compatibility | Turn 5完了 | private Version 2、Version 1 rollback、access/route/artifact証跡 |
| GitHub compatibility backport | Turn 5B PARTIAL | Vinext/Vite/Worker互換は成立、binding/canonical/fail-closedはTurn 5BCで閉鎖 |
| Binding and dependency closure | Turn 5BC branch成果完了 | exact binding、tracked canonical、unbound rejection、stable refresh、期限付きSharp例外、full gates |
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

投稿、管理画面、認証、DB、API、メール、決済、コメント、投票、ランキング、会員機能、有料レポート、個別契約、監査サービス、スポンサー契約、手動納品、実AdSense JavaScript、public access、custom domainは現在のlaneに含みません。

直近の判断はTurn 5BC remote branchのSupervisor acceptanceとmain統合可否です。受入後はTurn 6 local candidateを開始できます。tracked bindingはsource/build再現用であり、再deploy、access変更、public releaseを行いません。Sharp例外は2026-08-08までのexact-artifact限定で、audit 0やpublic authorityを意味しません。将来の収益化は、public editorial MVP受入後に広告適格性を別gateで検討します。
