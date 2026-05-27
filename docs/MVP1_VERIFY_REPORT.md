# MVP1 Verify Report

実施日: 2026-05-27

対象: MVP1 Static Casebook Skeleton

この監査は、新機能追加ではなく、現在のMVP1が「静的ケースブックの安全な骨組み」として成立しているかを確認するために実施した。公開本文、実在事例本文、docsの完成文面、投稿・管理・認証・DB・API・決済・広告JSなどは追加していない。

## 実行コマンドと結果

| コマンド | 結果 | 確認内容 |
|---|---:|---|
| `npm run lint:editorial` | 成功 | `editorial lint passed with no warnings.` |
| `npm test` | 成功 | 8 tests pass。ad allowlist、content publication guard、editorial-lint負例を確認。 |
| `npm run build` | 成功 | 15 pages generated。App Routerの静的生成と型検査が通過。 |
| `npm audit --audit-level=moderate` | 成功 | `found 0 vulnerabilities`。 |

`next dev -p 3101` は今回も `Starting...` のままHTTP応答に進まなかった。深追いはせず、検証は `npm run build` 後の `next start -p 3100` で代替した。

確認環境:

| 項目 | 値 |
|---|---|
| Node.js | v22.19.0 |
| npm | 10.9.3 |
| Next.js | 15.5.18 |
| OS | Windows NT 10.0.26200.0 |

## ルート確認結果

`npm run build` 後、`next start -p 3100` を起動し、`http://127.0.0.1:3100` に対して確認した。静的CSSアセットも200で返ることを確認した。

| ルート | HTTP | AdSlot | 判定 |
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

`/cases` と `/articles` は、公開対象がない状態で自然な空状態を表示している。HTTP本文上でも、`TODO: 事例タイトル`、`TODO: 記事タイトル`、fixture名は公開一覧に出ていない。

## draft制御とfixture非公開

| 確認対象 | 結果 |
|---|---|
| `content/cases/001-template-case.mdx` | `draft: true` のため `/cases` に出ない。 |
| `/cases/001-template-case` | 404。直接slugアクセスでも非公開。 |
| `content/articles/001-template-article.mdx` | `draft: true` のため `/articles` に出ない。 |
| `/articles/001-template-article` | 404。直接slugアクセスでも非公開。 |
| `content/_fixtures/*` | 一覧、個別、sitemapに出ない。 |
| `/cases/fixture-fabricated-citation-example` | 404。fixture slug相当の直アクセスも非公開。 |

今回、`tests/content-publication.test.ts` に公開取得ガードを追加した。`getAllCases()`、`getAllArticles()`、`getCaseBySlug()`、`getArticleBySlug()`、`sitemap()` の各経路で、draftテンプレートとfixtureが公開面に混ざらないことをテストで固定している。

## AdSlot確認

`src/lib/ad-allowlist.ts` と実際の配置箇所を確認した。`<AdSlot>` は次のページにだけ配置されている。

| 配置先 | 判定 |
|---|---|
| `/` | 許可ページ。OK |
| `/taxonomy` | 許可ページ。OK |
| `/methodology` | 許可ページ。OK |
| `/cases/[slug]` | 公開case詳細のみ生成される想定。現在公開caseなし。 |
| `/articles/[slug]` | 公開article詳細のみ生成される想定。現在公開articleなし。 |

`/cases`、`/articles`、`/about`、`/privacy`、`/terms`、`/removal-request`、`/disclosures`、禁止ルートではAdSlotが表示されないことをHTTP確認と `tests/ad-allowlist.test.ts` で確認した。

## editorial-lint負例テスト

`tests/editorial-lint.test.ts` は、一時ディレクトリにテスト用contentを生成して検証する。本番lint対象には負例ファイルを残さない。

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

日本語語彙はUnicode実体で検出できることも確認した。PowerShell上で一部日本語が文字化けして表示されることがあるが、ファイル内容とNode実行上の検出は正常。

## robots / sitemap確認

`robots.txt` は次の内容で返る。

```text
User-Agent: *
Allow: /
Disallow: /api
Disallow: /admin
Disallow: /submit

Sitemap: https://example.com/sitemap.xml
```

`sitemap.xml` は静的公開ページを含み、draft case/articleとfixtureを含まない。`privacy`、`terms`、`removal-request`、`disclosures` は、透明性、利用条件、削除依頼、開示を確認するためのページであり、検索到達できる方が現実的なのでsitemapに含めたままにする。これらのページには広告を表示しない。

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

desktopと375px mobile相当で、Header/Footer、Breadcrumb、cases/articlesの空状態、AdSlot placeholder、taxonomy/methodologyの読みやすさ、privacy/termsの広告非表示を確認した。現在は公開caseがないため、SeverityBadge、VerificationBadge、CaseCard、RelatedCasesの実データ表示は公開case投入後の確認対象として残る。

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

grep上、禁止領域に関する語はREADME、handoff、監査レポート、allowlist、robots、taxonomyのsurface codeなど、MVP1の説明や防御的検証に必要な文脈に限られていた。

## 今回の最小修正

| ファイル | 理由 |
|---|---|
| `tests/content-publication.test.ts` | draft/fixtureが公開取得経路とsitemapに混ざらないことを自動テスト化。 |
| `docs/MVP1_VERIFY_REPORT.md` | 2026-05-27時点の監査結果に更新。 |

既存のローカル差分として、`docs/CASE_PUBLICATION_GUIDE.md`、`docs/PUBLIC_CASE_INPUT_TEMPLATE.md`、`docs/MVP1_1_PUBLIC_CASE_PROBE_REPORT.md`、`docs/HANDOFF.md` の更新がある。これらは公開本文を生成せず、人間が次に安全に入力するための導線・記録であり、MVP1の禁止機能には該当しない。

## 残課題

| 残る点 | 次に確認するタイミング |
|---|---|
| 公開case/article詳細ページの実表示 | 人間が `draft: false` の本文を追加した後 |
| SeverityBadge / VerificationBadge / RelatedCasesの実UI | 公開case投入後 |
| `/cases/[slug]` と `/articles/[slug]` の詳細AdSlot実表示 | 公開詳細ページが生成された後 |
| `next dev` のStarting停止 | ローカル開発体験を整える段階 |
| Sitemap URLの公開ドメイン化 | 公開ドメイン決定後に `NEXT_PUBLIC_SITE_URL` を設定し、`https://example.com/sitemap.xml` を差し替える |
| favicon 404 | ブランドアセットを入れる段階 |

## 次の安全な作業単位

| 入口 | 目的 | 次に可能になること |
|---|---|---|
| 公開case入力 | `docs/PUBLIC_CASE_INPUT_TEMPLATE.md` に人間が1件分の実データを埋める。 | AIが公開本文を作らずに、最初の公開caseへ進める。 |
| 公開case検証 | 人間執筆caseを `draft: false` にして表示確認する。 | 詳細ページ、badge、RelatedCases、sitemap、AdSlotを実データで確認できる。 |
| `next dev` 調査 | `Starting...` 停止の原因を切り分ける。 | `next start` 代替なしで開発確認できる。 |
| favicon/OG整備 | 共有・外形上の未整備を減らす。 | favicon 404と共有プレビュー未整備を解消できる。 |
