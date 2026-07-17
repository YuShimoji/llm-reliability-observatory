# Project Overview

このページは、既存文書と実装状態を横断して見るための索引です。公開 case 本文、policy 本文、仕様の最終文面を新しく書き足すものではありません。

## まず見る場所

| 知りたいこと | 見る場所 | 現在の読み方 |
|---|---|---|
| プロジェクト全体の現在地 | `docs/HANDOFF.md` | 現在の実装範囲、禁止している機能、次の安全な作業がまとまっている |
| Codex Sites と収益化の判断 | `docs/SITES_MONETIZATION_REANALYSIS.md` | 公開可否、技術的な変換点、収益化ラダー、未確定事項、別端末での再開手順がまとまっている |
| 実装済み機能の検証結果 | `docs/MVP1_VERIFY_REPORT.md` | ルート、draft/fixture制御、AdSlot、robots/sitemap、lint/test/build の確認記録 |
| 最初の公開 case の進捗 | `docs/PUBLIC_CASE_INPUT_TEMPLATE.md` | 候補入力は staged だが、公式 URL、summary 承認、taxonomy 確認が残っている |
| 公開 case/article を足す手順 | `docs/CASE_PUBLICATION_GUIDE.md` | 人間が本文を用意した後の追加手順と検証導線 |
| スクリーンショット | `docs/SCREENSHOT_INDEX.md` | ルート監査時の画像と、元 artifact / MkDocs 表示用コピーの場所 |
| 日付ではない開発区切り | `docs/DEVELOPMENT_TURNS.md` | Turn 単位の進捗、出口条件、次に開ける作業 |

## 実装済み範囲

| 項目 | 現在状態 | 確認できる文書 |
|---|---|---|
| Static Next.js App Router skeleton | 実装済み | `docs/HANDOFF.md`, `docs/MVP1_VERIFY_REPORT.md` |
| 公開ルート | `/`, `/cases`, `/articles`, `/taxonomy`, `/methodology`, `/about`, `/privacy`, `/terms`, `/removal-request`, `/disclosures` が対象 | `docs/HANDOFF.md` |
| 禁止または未実装ルート | `/submit`, `/admin`, `/admin/review`, `/api` は 404 確認済み | `docs/HANDOFF.md`, `docs/MVP1_VERIFY_REPORT.md` |
| Content model | case/article template は `draft: true`; fixture は `content/_fixtures` に限定 | `docs/HANDOFF.md`, `docs/MVP1_VERIFY_REPORT.md` |
| 公開取得ガード | draft template と fixture が一覧、詳細、sitemap に混ざらないことをテスト | `docs/MVP1_VERIFY_REPORT.md` |
| Editorial lint | 個人情報、API key 風文字列、警告語、fixture 除外などを検証 | `docs/MVP1_VERIFY_REPORT.md` |
| AdSlot 境界 | 許可ページと不許可ページを route / test で確認 | `docs/MVP1_VERIFY_REPORT.md` |
| robots / sitemap | 静的公開ページだけを対象に確認 | `docs/MVP1_VERIFY_REPORT.md` |
| MkDocs local documentation view | 追加済み | `docs/index.md`, `mkdocs.yml` |
| Codex Sites manifest / Worker build | 未実装 | `docs/SITES_MONETIZATION_REANALYSIS.md` |
| 収益化導線 | 未実装。AdSlot placeholder のみ | `docs/MONETIZATION_POLICY.md`, `docs/SITES_MONETIZATION_REANALYSIS.md` |

## 今後の新機能と進捗

| 作業候補 | 進捗 | 進める条件 | 見る場所 |
|---|---|---|---|
| First public case | 入力候補は staging 済み、公開は未実施 | 実在 source URL、summary 承認、taxonomy mapping 確認 | `docs/PUBLIC_CASE_INPUT_TEMPLATE.md` |
| Content contract hardening | 未開始・次の推奨実装 | runtime validation、厳格な draft gate、source link 契約、positive integration test | `docs/SITES_MONETIZATION_REANALYSIS.md`, `docs/HANDOFF.md` |
| Published case verification | 未開始 | 人間執筆の `draft: false` case が追加されること | `docs/CASE_PUBLICATION_GUIDE.md`, `docs/DEVELOPMENT_TURNS.md` |
| Codex Sites compatibility probe | 隔離 build probe のみ。repository への移行は未実施 | content contract と公開価値を整え、専用 scope で Worker HTTP を検証 | `docs/SITES_MONETIZATION_REANALYSIS.md` |
| Paid offer validation | 未開始・Sites 外で実施 | 3〜5件で無償 discovery を行い、5〜10件以上の検証済み case、Methodology、訂正窓口、別の契約・請求経路を揃える | `docs/SITES_MONETIZATION_REANALYSIS.md` |
| Dev server investigation | 未開始 | `next dev` の Starting 停止を調査する判断 | `docs/HANDOFF.md` |
| favicon / OG polish | 未開始 | ブランド asset を入れる判断 | `docs/HANDOFF.md`, `docs/DEVELOPMENT_TURNS.md` |
| Human-authored policy expansion | 人間本文待ち | project owner が policy 本文を書く、または明示的に方針を変える | `docs/METHODOLOGY.md`, `docs/TAXONOMY.md`, `docs/EDITORIAL_POLICY.md`, `docs/MONETIZATION_POLICY.md` |

## まだ作らないもの

MVP1 skeleton work では、投稿フォーム、管理画面、認証、DB、API、メール、決済、コメント、投票、ランキング、AdSense JavaScript、model score / ranking UI は追加しません。Sites と収益化の方向は将来判断として記録済みですが、MVP1 の実装許可には読み替えません。`docs/HANDOFF.md` の guardrails を正本として参照します。
