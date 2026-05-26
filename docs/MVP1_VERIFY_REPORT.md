# MVP1 Verify Report

実施日: 2026-05-26

対象: MVP1 Static Casebook Skeleton

## 実行コマンドと結果

| コマンド | 結果 | メモ |
|---|---:|---|
| `npm run lint:editorial` | 成功 | `editorial lint passed with no warnings.` |
| `npm test` | 成功 | 5 tests pass。ad allowlist 2件、editorial-lint負例 3件。 |
| `npm run build` | 成功 | 15 pages generated。`next start` を止めた状態で成功。 |
| `npm audit --audit-level=moderate` | 成功 | `found 0 vulnerabilities`。 |

検証中、`next start` や `next dev` を起動したまま `npm run build` を再実行すると、`.next` の利用が競合してタイムアウトすることがあった。プロジェクトのNodeプロセスを停止した後の最終ビルドは成功した。

## ルート確認結果

確認用に `npm run build` 後、`next start -p 3100` を起動し、`http://127.0.0.1:3100` に対して確認した。

| ルート | HTTP | 広告placeholder | 判定 |
|---|---:|---:|---|
| `/` | 200 | あり | OK |
| `/cases` | 200 | なし | OK |
| `/articles` | 200 | なし | OK |
| `/taxonomy` | 200 | あり | OK |
| `/methodology` | 200 | あり | OK |
| `/about` | 200 | なし | OK |
| `/privacy` | 200 | なし | OK |
| `/terms` | 200 | なし | OK |
| `/removal-request` | 200 | なし | OK |
| `/disclosures` | 200 | なし | OK |
| `/submit` | 404 | なし | OK |
| `/admin` | 404 | なし | OK |
| `/admin/review` | 404 | なし | OK |
| `/api` | 404 | なし | OK |

`/cases` と `/articles` は、現在 `draft: true` のテンプレートのみなので空状態として表示される。HTTP本文上でもテンプレートタイトルやfixture名は見つからなかった。

## draft制御とfixture非公開

| 確認対象 | 結果 |
|---|---|
| `content/cases/001-template-case.mdx` | `draft: true` のため `/cases` に出ない。 |
| `/cases/001-template-case` | 404。個別slug直アクセスでも非公開。 |
| `content/articles/001-template-article.mdx` | `draft: true` のため `/articles` に出ない。 |
| `/articles/001-template-article` | 404。個別slug直アクセスでも非公開。 |
| `content/_fixtures/*` | 一覧、個別、sitemapに出ない。 |
| `/cases/fixture-fabricated-citation-example` | 404。fixture slug相当の直アクセスも非公開。 |

`sitemap.xml` には `001-template-case`、`001-template-article`、`fixture` を含まないことを確認した。

## AdSlot確認

`src/lib/ad-allowlist.ts` と配置箇所を確認し、`tests/ad-allowlist.test.ts` に `/api`、`/admin/review/queue`、末尾slash、query付きrootのケースを追加した。

| ページ種別 | 期待 | 実確認 |
|---|---|---|
| `/` | 表示 | 1枠表示 |
| `/taxonomy` | 表示 | 1枠表示 |
| `/methodology` | 表示 | 1枠表示 |
| `/cases` | 非表示 | 0枠 |
| `/articles` | 非表示 | 0枠 |
| policy系ページ | 非表示 | 0枠 |
| `/submit`, `/admin/*`, `/api/*` | 非表示 | 404かつ0枠 |

公開済みのcase/articleがまだ存在しないため、`/cases/[slug]` と `/articles/[slug]` の公開詳細面での広告表示は、実データ投入後に再確認が必要。

## editorial-lint負例テスト

`tests/editorial-lint.test.ts` を追加し、一時ディレクトリにテスト用contentを生成して検証する形にした。本番lint対象には負例ファイルを残していない。

| 負例 | 期待 | 結果 |
|---|---|---|
| メールアドレス | error | 検出 |
| 電話番号 | error | 検出 |
| APIキー風文字列 | error | 検出 |
| `ゴミ` / `ポンコツ` / `最低` / `失敗作` | error | 検出 |
| `劣化` / `嘘` / `捏造` / `欠陥` / `絶対に` / `必ず` / `明らかに` / `間違いなく` | warning | 検出 |
| `content/_fixtures` 内の負例 | lint対象外 | 無視 |
| case frontmatterの分類語 | error扱いしない | 無視 |
| taxonomy本文の分類語 `捏造` | warningに留める | warning 1件 |

## robots / sitemap確認

`robots.ts` は `/api`、`/admin`、`/submit` を直接disallowするように修正した。`/api/` や `/admin/review` もrobotsのprefix解釈上この指定に含まれる。

`sitemap.xml` は公開静的ページを含み、draft case/articleとfixtureは含まない。`privacy`、`terms`、`removal-request`、`disclosures` は、透明性・修正依頼・利用条件の確認ページとして検索到達可能である方が自然なので含めたままにした。広告はこれらのページに表示しない。

## 見た目確認

スクリーンショット保存先:

- `samples/_review/mvp1-route-audit/home-desktop.png`
- `samples/_review/mvp1-route-audit/home-mobile.png`
- `samples/_review/mvp1-route-audit/cases-desktop.png`
- `samples/_review/mvp1-route-audit/cases-mobile.png`
- `samples/_review/mvp1-route-audit/articles-desktop.png`
- `samples/_review/mvp1-route-audit/articles-mobile.png`
- `samples/_review/mvp1-route-audit/taxonomy-desktop.png`
- `samples/_review/mvp1-route-audit/taxonomy-mobile.png`
- `samples/_review/mvp1-route-audit/methodology-desktop.png`
- `samples/_review/mvp1-route-audit/privacy-desktop.png`
- `samples/_review/mvp1-route-audit/privacy-mobile.png`
- `samples/_review/mvp1-route-audit/terms-desktop.png`

desktopと375px mobile相当で、Header/Footer、Breadcrumb、cases/articlesの空状態、AdSlot placeholder、taxonomy/methodologyの読みやすさ、privacy/termsの広告非表示を確認した。現在は公開caseがないため、SeverityBadge、VerificationBadge、CaseCardの実表示は未確認で、公開事例投入後の確認対象として残る。

## スコープ逸脱チェック

| 確認 | 結果 |
|---|---|
| `src/app/submit` | 存在しない |
| `src/app/admin` | 存在しない |
| `src/app/api` | 存在しない |
| Supabase関連依存 | なし |
| Resend / Stripe / DB / Storage / Auth関連依存 | なし |
| AdSense JS本体 | なし |
| コメント、投票、ランキング、ユーザー登録関連コード | 実装なし |

grep上、`submit`、`admin`、`api` はallowlist、robots、説明文、taxonomyのsurface codeなどMVP1上必要な文脈に限られていた。

## next dev問題

`next dev -p 3101` を短時間起動して確認したところ、今回もログは次の状態で止まり、HTTP応答には進まなかった。

```text
Next.js 15.5.18
Local: http://localhost:3101
Starting...
```

深追いはしていない。検証は `next start` で代替し、静的アセットが200で返ることを確認した。なお、`next dev` は `.next` を開発用に作り替えるため、起動中の `next start` と併用すると静的アセット確認が壊れる。検証時はどちらか一方だけを動かす。

## 残課題

| 残る点 | 次に確認するタイミング |
|---|---|
| 公開case/article詳細ページの実表示 | 人間が `draft: false` の本文を追加した後 |
| SeverityBadge / VerificationBadge / RelatedCasesの実UI | 公開case投入後 |
| `next dev` のStarting停止 | ローカル開発体験を整える段階 |
| favicon 404 | ブランドアセットを入れる段階 |
