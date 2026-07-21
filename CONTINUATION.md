# 監修AI向け現状報告

更新日: 2026-07-21（JST）

この報告は、リモート最新化、ローカル開発環境の復旧、検証、文書権威の整理を行った時点の再開記録です。外部deploy、domain変更、広告設定、PR、pushは実施していません。

## 今回到達した状態

`origin/main` の最新 `db3b563`（`docs: close turn 4 editorial review`）を取得し、現在の `codex/refresh-restart-handoff` へ統合しました。ローカルにだけ存在していた2件の文書コミットは消さずに保持し、競合した `docs/HANDOFF.md`、`docs/DEVELOPMENT_TURNS.md`、`docs/PROJECT_OVERVIEW.md` では、実装済みのPublication Engine v2と3件の承認caseを反映したリモート側を正本として採用しました。

現在の製品状態は次のとおりです。

| 対象 | 現在地 | workflowへの意味 |
|---|---|---|
| Publication Engine v2 | schema、compiler、deterministic registry、fail-closed gateを実装済み | 未完成・未承認contentが公開経路へ漏れる前にbuildで止められる |
| 公開適格case | 3件。OpenAI、Microsoft、GitHubのevidence-backed case | 一覧、detail、sitemap、related caseを実データで検証できる |
| 非公開content | template case 1件、template article 1件、fixture 5件、legacy candidate 1件 | 404境界を回帰試験できる |
| 公開article | 0件 | article編集運用はまだ始まっていない |
| Observatory UI | exact metadata filter、Reset、deterministic related ruleを実装済み | 推測による関連付けを避けつつmini corpusを閲覧できる |
| 外部公開 | 未実施 | repository/build上のpublication eligibilityをlive公開証拠と混同しない |

## ローカル開発環境

`npm ci` でlockfileどおりに依存を再構築しました。確認したtoolchainはNode.js `v22.19.0`、npm `10.9.3`、Git `2.50.1.windows.1`です。依存treeは有効で、`npm audit --audit-level=low` は脆弱性0でした。

`npm run dev -- --hostname 127.0.0.1 --port 3101` は10.7秒でReadyになり、以前の「Startingで停止する」というローカル記録は現在のcheckoutでは再現しませんでした。`/`、`/cases`、承認case detail、`/sitemap.xml` は200、template detailは404を返しました。

Next.jsのdevelopment serverとproduction buildは同じ`.next`を使います。`next dev`を起動すると直前のproduction buildはproduction serverから利用できなくなるため、dev後に`npx next start`を使う場合は、先に`npm run build`を再実行してください。最終状態では再build済みです。

## 2026-07-21の検証実績

| 検証 | 実測結果 | 判断できること |
|---|---|---|
| `npm ls --depth=0` | exit 0 | lockfileとinstall済み依存が整合 |
| `npm run content:compile` 2回 | 各回3 public cases / 1 blocked case / 0 articles、digest `4ea9f26ba88d`、registry不変 | compiler出力が決定的 |
| `npm run lint:editorial` | warning/error 0 | 現行contentが編集lintを通過 |
| `npm test` | 25 pass / 0 fail | schema、公開境界、filter、related、lint、画像形式の回帰が通過 |
| `npm run review:verify-images` | 26/26 valid | 追跡画像の拡張子とmagic bytesが一致 |
| `npm run build` | Next.js 15.5.18、18 static/SSG pages生成 | production bundleと3 detail routeが生成可能 |
| production route smoke | 200期待15/15、404期待8/8、合計23/23 | 公開routeとblocked routeの境界が実HTTPで成立 |
| `npm audit --audit-level=low` | 0 vulnerabilities | 現lockfileに既知npm advisoryなし |

存在しないstatic slugをproduction serverで意図的に確認すると、Next.jsはserver consoleへ`Internal: NoFallbackError`を出します。HTTPは期待どおり404であり公開境界は成立していますが、運用ログ上の既知ノイズとして残ります。

## 文書の整理と判断境界

ローカルの `docs/SITES_MONETIZATION_REANALYSIS.md` は2026-07-17時点の歴史資料として保持しました。ただし、そこにある「公開case 0件」「content contract未実装」「有料audit/reportを次の収益経路とする」といった記述は、2026-07-20以降の `docs/HANDOFF.md`、`docs/DEVELOPMENT_TURNS.md`、`docs/MONETIZATION_POLICY.md` に置き換えられています。先頭へsuperseded noticeを追加し、外部状態変更やcommerceの許可根拠には使わないことを明示しました。

現在の権威順は、現状とgateが `docs/HANDOFF.md`、Turn順序が `docs/DEVELOPMENT_TURNS.md`、case単位の人間判断が `samples/_review/turn4-publication-acceptance/editorial-decision-record.*` です。この報告は再開用の観測記録であり、それらの編集・事業判断を上書きしません。

## 残る不確実性

| 未確定事項 | いま止めている理由 | 開くために必要な判断 |
|---|---|---|
| production URL / canonical domain | `NEXT_PUBLIC_SITE_URL`のfallbackは`https://example.com`で、live環境の証拠がない | ownerがhosting、domain、外部状態変更、rollback条件を明示 |
| Sites compatibility | source/build受入とhosting互換性は別問題 | 更新済み`main`から専用branchを作る明示許可 |
| 公開editorial MVP | exact deployed artifactをまだ受入していない | Turn 5後のrelease判断とlive route検証 |
| 広告技術probe | publisher設定、privacy/consent、実scriptは未導入 | public MVP後のowner承認 |
| このhandoff branchのremote掲載 | 今回はpush/PRを依頼されていない | 監修AIまたはownerがpublish、squash、retireのいずれかを選択 |

## 次の取っ掛かり

| 入口 | 減らす摩擦 | 選ぶと次に可能になること |
|---|---|---|
| **Audit — handoff差分を受入判断** | 歴史資料と現行正本が同じbranchにあることによる判断迷い | このbranchをpushするか、必要文書だけmain向けに整理するかを決められる |
| **Advance — Turn 5のowner gateを定義** | hosting、canonical、外部変更、rollbackの未決定 | 外部公開を伴わないcompatibility branchを安全に開始できる |
| **Verify — live受入チェックリストを先に固定** | source/build proofとdeployment proofの混同 | Turn 6でexact artifact、URL、robots/sitemap、訂正導線を一貫して判定できる |
| **Explore — recurring observation loopを設計** | case追加後の再検証・訂正・retirement担当が未定 | 公開後の編集運用を単発作業から継続workflowへ移せる |

最も安全な次手は、まずこのhandoff差分の扱いを監修AIが判断し、その後にownerの明示許可を得てTurn 5を別branchで始めることです。
