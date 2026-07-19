# Screenshot Index

このページは、履歴上のroute audit、local-only review、Turn 4 production-component acceptance画像の索引です。

## MVP1 route audit（履歴証跡）

元artifactは`samples/_review/mvp1-route-audit/`、MkDocs表示用コピーは`docs/assets/review/mvp1-route-audit/`です。home、cases、articles、taxonomy、methodology、privacy、termsのdesktop/mobile画像があります。これは公開caseが0件だったMVP1時点の証跡で、現在のcase表示は後段を正とします。

## Publication Engine v2 local review（履歴証跡）

`samples/_review/publication-engine-v2/002-gpt-4o-sycophancy-rollback/`

| 証跡 | ファイル | 当時の確認内容 |
|---|---|---|
| case card | `case-card.png` | title、severity、verification、case kind、summary |
| detail desktop | `case-detail-desktop.png` | local-only banner、metadata、本文導入 |
| detail mobile | `case-detail-mobile.png` | 390px、横溢れなし |
| source links | `source-links.png` | OpenAI source 2件、安全な外部リンク |
| readback | `readback.md` / `.json` | pending draft時点の判定境界 |

4枚は真正PNGです。この節は人間承認前の履歴であり、現在の002状態を示しません。

## Turn 4 mini corpus local review（履歴証跡）

`samples/_review/turn4-mini-corpus/`

| 証跡 | ファイル | 当時の確認内容 |
|---|---|---|
| corpus desktop | `corpus-review-desktop.png` | 1280x800、4 filter、pending card 3件 |
| corpus mobile | `corpus-review-mobile.png` | 390x844、filter縦積み、横溢れなし |
| evidence matrix | `corpus-evidence-matrix.md` / `.json` | 採用3件、保留1件、却下1件 |
| readback | `corpus-readback.md` / `.json` | 現在の決定・production受入結果へ更新済み |

2枚は人間判断前の履歴画像です。ブラウザ取得JPEGをデコード後にPNGへ再エンコードした真正PNGです。

## Turn 4 publication acceptance（現行証跡）

2026-07-19のowner/editor判断を実装したsource/build production表示証跡です。

`samples/_review/turn4-publication-acceptance/`

| 画面 | Desktop | Mobile | 確認内容 |
|---|---|---|---|
| `/cases` | `public-cases-desktop.png` | `public-cases-mobile.png` | 3 published、4 filter、統計標本ではない旨、横溢れなし |
| OpenAI 002 detail | `002-detail-desktop.png` | `002-detail-mobile.png` | approved、single source、公式2文書、human reviewed、003 related |
| Microsoft 003 detail | `003-detail-desktop.png` | `003-detail-mobile.png` | approved、LROの`context_loss`境界、公式2文書、002 related |
| GitHub 004 detail | `004-detail-desktop.png` | `004-detail-mobile.png` | approved、multi source、独立targeted replication、LRO再実行なし、related 0 |

detail画像は上部viewportと出典・AI開示・related領域のviewportを16pxの中立separatorで連結した受入証跡です。連続full-page captureとしては扱いません。

8枚すべてをJPEG captureからデコードし、PNGとして再エンコードしました。全ファイルの先頭8バイトは`89 50 4E 47 0D 0A 1A 0A`、最大ファイルも1MB未満です。desktop 1280x800、mobile 390x844で、文字化け、必須label切断、source link欠落、横溢れ、実広告要素、console errorはありません。

人間判断の正本は`editorial-decision-record.md` / `.json`です。画像はsource/build上のpublication eligibilityとproduction component表示を示しますが、Sites deployment、public URL、domain、live production acceptanceは示しません。
