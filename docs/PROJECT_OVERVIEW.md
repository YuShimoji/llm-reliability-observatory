# Project Overview

このページは、現在の実装と権威文書を横断して読むための索引です。状態の正本は`docs/HANDOFF.md`、開発順序の正本は`docs/DEVELOPMENT_TURNS.md`です。

## まず見る場所

| 知りたいこと | 見る場所 | 現在の読み方 |
|---|---|---|
| 現在地・検証・残作業 | `docs/HANDOFF.md` | branch、公開境界、証跡、owner gate、再開手順 |
| Turn 0〜8 | `docs/DEVELOPMENT_TURNS.md` | 完了条件と次の最遠目標 |
| 公開契約と作業手順 | `docs/CASE_PUBLICATION_GUIDE.md` | schema、compiler、local review、公開前チェック |
| 最初のcaseとlegacy候補 | `docs/PUBLIC_CASE_INPUT_TEMPLATE.md` | active OpenAI caseとblocked Gemini candidateの境界 |
| 方法・編集・分類・広告 | `docs/METHODOLOGY.md`, `docs/EDITORIAL_POLICY.md`, `docs/TAXONOMY.md`, `docs/MONETIZATION_POLICY.md` | 現在実装されている運用規則。法的確定文書ではない |
| 画像証跡 | `docs/SCREENSHOT_INDEX.md` | MVP1 route、Publication Engine v2、Turn 4 corpusのlocal review画像 |

## 実装済み範囲

| 項目 | 現在状態 | 主な実装・証跡 |
|---|---|---|
| Static Next.js App Router | 維持 | production routeは従来の静的構成 |
| Publication Engine v2 | 実装済み | `scripts/lib/content-compiler.ts`, `src/content/schema.ts` |
| build-time content registry | 実装済み | `src/generated/content-registry.json`; runtime appに`node:fs`/`process.cwd()`なし |
| 必須コンパイル導線 | 実装済み | `predev`, `pretest`, `prebuild` |
| fail-closed公開判定 | 実装済み | draft欠落、pending、TODO、必須見出し欠落、source欠落、不正URLを遮断 |
| 公開取得ガード | 実装・テスト済み | 一覧、直接detail、related cases、sitemapはeligible contentのみ |
| 広告適格性 | 実装・テスト済み | substantiveな公開case/article detailのみ。home、空一覧、policy、draft、errorは非適格 |
| 一次資料付きmini corpus | 一括人間レビュー待ち | OpenAI、Microsoft、GitHubのpending draft 3件。production非露出 |
| local-only review | 実装済み | 単体`review:generate`と一括`review:generate-corpus`; production componentを再利用 |
| Observatory UI | production component実装済み | exact metadata filter、更新日・分類表示、明示的で決定的なrelated-case rule |
| MkDocs local documentation view | 維持 | `docs/index.md`, `mkdocs.yml` |

## 現在のコンテンツ状態

- 公開case: 0件。
- 公開article: 0件。
- case候補: template 1件、一次資料付きpending draft 3件。すべて非公開。
- fixture: `content/_fixtures/`に限定し、公開registryへは移しません。
- legacy Gemini候補: `docs/PUBLIC_CASE_INPUT_TEMPLATE.md`にblocked referenceとして保持し、現行の公開ゲートやcompiler入力にはしません。

AI補助草稿は許可されています。ただし一次資料、検証範囲、反証、AI補助開示、review statusが必須で、owner/editorの承認前は公開しません。

## まだ作らないもの

今回の範囲には、投稿、管理画面、認証、DB、API、メール、決済、コメント、投票、ランキング、会員課金、スポンサー契約、手動納品、実AdSense JavaScript、Sitesデプロイ、公開アクセス変更を含めません。owner-onlyのTurn 5以降へ持ち越します。
