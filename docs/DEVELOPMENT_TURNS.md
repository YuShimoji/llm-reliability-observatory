# Turn-Based Development Plan

このページは、日付ではなく開発ターン単位で現在地を確認するための作業地図です。各 turn は「何を終えたら次へ進めるか」を見るための区切りであり、公開 case 本文や policy 本文を代筆するものではありません。

Turn 番号はプロジェクト履歴を保持するための識別子です。Turn 3〜5 は maintenance / presentation / human-authoring の独立 lane であり、条件を満たした専用 branch で Turn 6 の Sites probe を行う前に、すべてを番号順で完了する必要はありません。

## ターン一覧

| Turn | 焦点 | 現在状態 | 出口条件 | 次に開けること |
|---|---|---|---|---|
| Turn 0 | MVP1 static skeleton and audit | 完了 | lint / test / build / route audit / screenshot capture が通っている | 公開前の入力整備へ進める |
| Turn 1 | First public case readiness | 進行中 | 公式 source URL、summary 承認、taxonomy mapping 確認が揃う | `content/cases/<slug>.mdx` へ安全に投入できる |
| Turn 1B | Publication contract hardening | 未開始・次の推奨 | runtime schema、`draft === false`、source object、必須 section、positive integration test を実装 | 最初の public case をコード側でも安全に受け入れられる |
| Turn 2 | First public case publication check | 未開始 | 人間執筆 case を `draft: false` で追加し、detail / badge / related / sitemap / AdSlot を確認 | 実データで公開面の品質を見られる |
| Turn 3 | Local development loop cleanup | 未開始 | `next dev` の Starting 停止を切り分ける、または `next start` 代替手順を固定する | 開発確認の待ち時間と迷いを減らせる |
| Turn 4 | Presentation polish | 未開始 | favicon / OG image / sharing preview を整える | 外形上の未整備と favicon 404 を減らせる |
| Turn 5 | Human-authored editorial expansion | 人間本文待ち | methodology / taxonomy / editorial / monetization の本文を project owner が書く | skeleton から公開可能な editorial surface へ進める |
| Turn 6 | Codex Sites compatibility probe | 未開始 | Sites build 層、Worker HTTP、metadata、sharing、domain、外部 link を限定 deploy で確認 | Sites を production host 候補として判断できる |
| Turn 7 | Paid offer validation outside Sites | 未開始 | 3〜5件で無償 discovery を行い、5〜10件へ拡張後、Sites は無料 sample に限定して別の契約・請求経路で監査 1 件または report 予約 5 件を得る | commerce hosting / SaaS 投資を実需要から判断できる |

Turn 1 と Turn 1B は並行可能ですが、Turn 2 の `draft: false` 公開は両方が完了するまで開始しません。Sites と収益化の詳細判断は `docs/SITES_MONETIZATION_REANALYSIS.md` を参照します。

## Turn 1 の残り

| 残り | なぜ必要か | 完了後にできること |
|---|---|---|
| 実在する公式 source URL | 公開 case の根拠を固定するため | verification status を過大にせず設定できる |
| public summary の承認または拡張 | 一覧表示で誤解を生まない範囲に収めるため | case card に載せる文面を確定できる |
| taxonomy mapping の確認 | `chat`, `nonexistent_capability`, `single_source`, secondary category 空配列の妥当性を見るため | frontmatter を current taxonomy に合わせられる |

## Turn 2 の確認観点

| 確認先 | 見ること |
|---|---|
| `/cases` | 公開 case だけが出て、draft / fixture が出ない |
| `/cases/<slug>` | h1、本文見出し、SeverityBadge、VerificationBadge、Disclosure、AdSlot が意図通り |
| `/sitemap.xml` | 公開 slug だけが入り、draft / fixture が入らない |
| tests | `npm run lint:editorial`, `npm test`, `npm run build` が通る |
