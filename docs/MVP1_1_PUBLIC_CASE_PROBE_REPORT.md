# MVP1.1 Public Case Integration Probe Report

実施日: 2026-05-28

対象: `llm-reliability-observatory`

開始時点:

| 項目 | 値 |
|---|---|
| Branch | `main` |
| Remote | `origin` |
| HEAD | `5cf776d docs: avoid stale handoff commit reference` |
| `git pull origin main` | `Already up to date.` |
| 作業ツリー | clean |

## 今回の分岐

人間提供の公開case入力は、現在のタスク本文、`content/cases`、および `docs/PUBLIC_CASE_INPUT_TEMPLATE.md` のいずれにも見つからなかった。

そのため、今回も `draft: false` の公開caseは作成していない。fixture、template、AI生成文を公開caseとして流用することも行っていない。

## 不足している公開case入力

`docs/PUBLIC_CASE_INPUT_TEMPLATE.md` に対して、公開投入に必要な実入力はまだ未充足。

| 項目 | 現在状態 | 公開前に必要な入力 |
|---|---|---|
| `title` | 空欄 | 人間執筆の事例タイトル |
| `slug` | 空欄 | 安定したURL slug |
| `date` | `YYYY-MM-DD` の雛形 | 観測日または公開日 |
| `model_vendor` / `model_product` / `model_version` | 空欄 | 人間が観測した範囲のモデル情報 |
| `surface` / `task_category` / `primary_failure_category` | `unknown` などの雛形 | taxonomyに沿った分類 |
| `severity` / `verification_status` | 最低値の雛形 | 根拠に対して過大でない値 |
| `public_summary` | 空欄 | 160-220字程度の人間執筆概要 |
| `source_links` | `[]` | 少なくとも1件の実在source link |
| 本文9セクション | 見出しのみ | 人間提供または人間承認済みの公開本文 |
| 公開可否確認 | 未実施 | 個人情報、秘密、APIキー、内部情報、断定的批判がないこと |

## 実行コマンドと結果

| コマンド | 結果 |
|---|---|
| `git pull origin main` | 成功。`Already up to date.` |
| `git status --short --branch` | `## main...origin/main` |
| `git log --oneline -5` | `5cf776d`, `68b4fb0`, `59134e1`, `cee3d10` を確認 |
| `npm run lint:editorial` | 成功。warningsなし |
| `npm test` | 成功。8 tests pass |
| `npm run build` | 成功。15 pages generated |
| `npm audit --audit-level=moderate` | 成功。`found 0 vulnerabilities` |

補助確認として `npx tsx` 経由で `src/app/sitemap.ts` のURL一覧を確認し、公開case slug、draft template slug、fixture slugが含まれないことを確認した。

## 表示確認

`npm run build` 後に `node .\node_modules\next\dist\bin\next start -p 3100` 相当で確認した。`next start` はHTTP応答まで進み、主要ルートは期待どおり返った。

| ルート | 期待 | 結果 | 備考 |
|---|---:|---:|---|
| `/` | 200 | 200 | AdSlotあり |
| `/cases` | 200 | 200 | 公開caseなしの空状態。template/fixture名なし |
| `/cases/001-template-case` | 404 | 404 | draft templateは直接表示されない |
| `/articles` | 200 | 200 | 公開articleなしの空状態。template名なし |
| `/articles/001-template-article` | 404 | 404 | draft templateは直接表示されない |
| `/taxonomy` | 200 | 200 | AdSlotあり |
| `/methodology` | 200 | 200 | AdSlotあり |
| `/privacy` | 200 | 200 | AdSlotなし |
| `/terms` | 200 | 200 | AdSlotなし |
| `/removal-request` | 200 | 200 | AdSlotなし |
| `/disclosures` | 200 | 200 | AdSlotなし |
| `/submit` | 404 | 404 | 禁止ルートなし |
| `/admin` | 404 | 404 | 禁止ルートなし |
| `/admin/review` | 404 | 404 | 禁止ルートなし |
| `/api` | 404 | 404 | API routeなし |
| `/sitemap.xml` | 200 | 200 | draft/fixtureなし |

draft detail slugの404確認時に、Next.jsのserver stderrへ `NoFallbackError` が出た。HTTP結果は期待どおり404で、静的生成されたslug以外をfallbackしない挙動として扱う。

## draft / fixture / sitemap / AdSlot 境界

| 境界 | 結果 |
|---|---|
| `content/cases/001-template-case.mdx` | `draft: true` のまま。`/cases`、詳細、sitemapに出ない |
| `content/articles/001-template-article.mdx` | `draft: true` のまま。`/articles`、詳細、sitemapに出ない |
| `content/_fixtures/*` | 公開一覧、詳細、sitemapに出ない |
| `/cases` / `/articles` | 公開対象なしの空状態として表示。TODO雛形を公開記事として誤認させない |
| AdSlot許可ページ | `/`、`/taxonomy`、`/methodology` に表示 |
| AdSlot不許可ページ | `/cases`、`/articles`、policy系、禁止ルートに表示なし |
| sitemap URL | 現在は `https://example.com` ベース。公開ドメイン決定後に差し替える |

今回、公開caseを追加していないため、`/cases/<slug>` の実データ詳細、SeverityBadge、VerificationBadge、CaseMetaBar、RelatedCases、detail AdSlotの本番表示はまだ未検証。

## next dev 問題の扱い

今回の目的から外れるため、`next dev` の `Starting...` 停止問題は深追いしていない。表示確認は既知の代替手順どおり、`npm run build` 後の `next start -p 3100` で実施した。

## 残課題

| 残る点 | 次に確認する条件 |
|---|---|
| 最初の公開case投入 | 人間が本文、根拠、source linkを提供した後 |
| SeverityBadge / VerificationBadge実表示 | `draft: false` の公開case作成後 |
| RelatedCasesの0件時または関連あり時の見え方 | 公開case detail生成後 |
| detail AdSlot | 公開case detail生成後 |
| sitemapへの公開case追加 | 公開case作成後 |
| `NEXT_PUBLIC_SITE_URL` | 公開ドメイン決定後 |
| `next dev` 停止 | ローカル開発速度を優先する段階 |

## 次の安全な作業単位

| 入口 | 目的 | 次に可能になること |
|---|---|---|
| 公開case入力を埋める | `docs/PUBLIC_CASE_INPUT_TEMPLATE.md` に人間が1件分の実データを記入する | AIが本文を補完せずに初回公開caseへ進める |
| 公開case投入probe | 入力済みcaseを `content/cases/<slug>.mdx` として `draft: false` で追加する | `/cases/<slug>`、badge、RelatedCases、detail AdSlot、sitemapを実データで検証できる |
| ドメイン設定 | `NEXT_PUBLIC_SITE_URL` を本番ドメインに合わせる | robots/sitemapの `example.com` 前提を外せる |
| 開発体験の修理 | `next dev` 停止を切り分ける | build/start往復なしでUI確認できる |
