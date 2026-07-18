# Local Review Readback

このディレクトリは`002-gpt-4o-sycophancy-rollback`の人間レビュー用診断証跡です。公開承認、production route、独立再現、全利用者への一般化を意味しません。

## Case state

| Field | Readback |
|---|---|
| slug | `002-gpt-4o-sycophancy-rollback` |
| case kind | `documented_regression` |
| draft | `true` |
| review status | `pending` |
| verification status | `single_source` |
| document count | OpenAI公式資料2件 |
| source-origin count | 1（OpenAI） |
| independent reproduction | なし |
| required headings | 9 / 9 |
| AI assistance | Codexが一次資料に基づく日本語草稿の構成と限定表現を補助。人間レビュー未完了 |

## Publication boundary

- `/cases`への一覧露出: なし。
- `/cases/002-gpt-4o-sycophancy-rollback`: productionで404。
- related casesへの露出: なし。
- `/sitemap.xml`への露出: なし。
- local review、home、空のcases一覧の広告枠: 0。
- draft preview用production route: なし。

## Verification readback

- content compiler v2: pass。public case 0、blocked case candidate 2、public article 0、digest prefix `59c70d6a47cf`、LF/CRLF正規化後の2回目registry unchanged。
- editorial lint: warningなしでpass。
- automated tests: 18 pass / 0 fail。
- production build: pass、15 routes。
- dependency audit: low thresholdで0 vulnerabilities。
- HTTP: intended public 12 routesが200、blocked 8 routesが404。
- browser console: local review 0 error、production home/cases/draft-404 0 error。
- mobile: 390px viewport、横溢れなし。
- image format: desktop、mobile、card、sourceの4件すべてPNG signature `89 50 4E 47 0D 0A 1A 0A`確認済み。

## Human review questions

1. OpenAI公式資料2件の範囲を越える主張がないか。
2. 独立再現なし、発生率不明、全利用者へ一般化しないという限定が十分か。
3. `sev2`が保守的で妥当か。
4. `sycophancy` / `single_source` / `documented_regression`の分類が適切か。
5. AI補助開示が明確か。

承認する場合も、画像だけで判断せずMDXとsourceを読み、`draft: false`、`review_status: approved`、`ai_assistance.human_reviewed: true`を同時に変更して全検証を再実行してください。
