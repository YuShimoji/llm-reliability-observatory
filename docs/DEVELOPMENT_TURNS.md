# Turn-Based Development Plan

このページは日付ではなく、検証可能な出口条件で開発を区切る作業地図です。現行方針では、AI補助草稿を許可します。ただし一次資料、検証範囲、反証、AI補助開示、`review_status` を必須とし、人間の承認前は公開しません。

## ターン一覧

| Turn | 焦点 | 現在状態 | 出口条件 | 次に開けること |
|---|---|---|---|---|
| Turn 0 | Resume baseline | 完了 | `origin/main` 同期、依存復旧、lint/test/build/route/auditを再確認 | 既知の健全な基盤から変更できる |
| Turn 1 | Authority and dirty-diff integration | 完了 | 開始時4差分を監査・保全し、新方針、境界、ロードマップを正本へ統合 | 旧human-only gateに停止せず進められる |
| Turn 2 | Publication Engine v2 | 完了 | Zod schema、gray-matter、決定的build-time registry、fail-closed公開判定、広告適格判定が必須導線で動く | 安全にcase候補をコンパイルできる |
| Turn 3 | First evidence-backed case review | 技術成果物完了・人間レビュー待ち | 公式一次資料付きcaseをlocal-onlyでcard/detail/source表示し、公開経路非露出を証明。人間が内容・分類・severity・開示を承認または差し戻す | `draft: false` / `approved`への編集判断ができる |
| Turn 4 | 3〜5 case corpus and observatory UI | 未開始 | 独立した一次資料付きcaseを3〜5件に拡張し、一覧・taxonomy・関連caseが小規模コーパスで有用 | 公開MVPの情報設計を実データで評価できる |
| Turn 5 | Owner-only Sites compatibility deployment | owner gate | ownerが公開先・domain・設定を決定し、Sites互換性を専用環境で確認 | 公開アクセスを変える判断ができる |
| Turn 6 | Public editorial MVP | 未開始 | 承認済みcase、運用文書、訂正・削除導線、canonical URLが公開環境で成立 | 編集運用を開始できる |
| Turn 7 | AdSense technical probe | 未開始 | owner管理のpublisher設定とポリシー確認後、適格detailだけで技術probeを実施 | プログラマティック広告の実装可否を判断できる |
| Turn 8 | Recurring observation loop | 未開始 | 収集、草稿、レビュー、公開、再検証、訂正の反復周期と担当が定義される | 継続的な観測所運用へ移行できる |

## Turn 2 の公開条件

caseは次の論理積を満たす場合だけproduction registryで公開対象になります。

- frontmatterがruntime schemaを通過する。
- `draft === false`。
- `review_status === approved`。
- 9つの必須見出しがすべて存在し、本文が空でない。
- frontmatterと本文に`TODO`、`example.com`、空の必須値、不正URLがない。
- 構造化`source_links`が1件以上ある。

`draft`欠落は`true`相当として遮断します。fixtureは内容にかかわらず公開できません。公開意図を示したcaseが条件を破る場合、content compilerはbuildを失敗させます。

## Turn 3 のレビュー対象

- slug: `002-gpt-4o-sycophancy-rollback`
- kind: `documented_regression`
- state: `draft: true` / `review_status: pending`
- sources: OpenAI公式資料2件
- production: 一覧、detail、related cases、sitemapのすべてで非露出
- artifact: `samples/_review/publication-engine-v2/002-gpt-4o-sycophancy-rollback/`

ローカル画像とHTMLは診断証跡であり、公開承認の代替ではありません。

## 推奨最遠目標

次の主目標は **Turn 4: Evidence-Backed Mini Corpus and Observatory UI** とします。ただし、まずTurn 3の人間レビューを閉じ、最初のcaseを「承認」「要修正」「却下」のいずれかに確定します。その後、同じ公開契約で3〜5件の小規模コーパスを作り、case一覧、taxonomy、related cases、更新日・出典表示を実データで検証します。

この目標に、Sitesデプロイ、公開アクセス変更、実AdSenseコード、publisher ID、広告申請、PR作成、`main`へのmergeは含めません。Turn 5以降はowner-only gateです。
