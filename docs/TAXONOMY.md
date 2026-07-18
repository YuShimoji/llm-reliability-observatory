# Taxonomy

この文書は`src/lib/taxonomy.ts`と`src/content/schema.ts`の現行値を説明します。分類は観測単位の編集ラベルであり、vendor/modelの包括的評価ではありません。

## 事故類型

`sycophancy`、`fabricated_citation`、`nonexistent_capability`、`context_loss`、`tool_failure`、`coding_accident`、`stale_information`、`unknown`を使用します。主分類は最も直接的な失敗を1つ選び、副分類はsourceが支える場合だけ追加します。

## Case kind

`documented_regression`、`observed_output`、`reproduction_test`の3種です。提供元の事後報告だけを根拠にしたcaseを独立再現済みとして扱いません。

## 深刻度

| code | 運用上の目安 |
|---|---|
| `sev0` | 観測メモまたは軽微な誤り |
| `sev1` | 小さな手戻りや確認負荷 |
| `sev2` | 意思決定や作業品質に影響し得る |
| `sev3` | 金銭、法務、運用上の損失につながり得る |
| `sev4` | 重大な損害や安全上の懸念 |

不確実な場合は低い値を選び、引き上げる根拠を本文へ書きます。

## 検証状態

`unverified_signal`、`single_source`、`multi_source`、`reproduced`、`corrected`を使用します。`single_source`は同一の発行主体による一つ以上の文書、`multi_source`は独立した複数の発行主体による確認を表します。文書数と発行主体数を混同せず、独立再現の有無は`reproducibility`と本文で別に説明します。

## Source typeとreview status

- source type: `official`、`primary`、`secondary`。
- review status: `pending`または`approved`。

`approved`は人間editorの公開判断を表し、sourceの正しさや将来の不変性を保証しません。source URL、最終確認日、反証を併記します。

## 改訂手順

新しいcodeを追加するときは、schema、型、表示、template、tests、docsを同時に更新します。既存caseの意味が変わる改訂は、影響するcaseを再レビューしてから採用します。
