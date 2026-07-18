# Methodology

## 目的

生成AIやLLMの出力上の失敗・回帰・誤案内を、検証範囲と反証可能性が読者に分かるケース単位で記録します。caseはvendor/modelの総合点、恒常的品質、全利用者への影響を示すものではありません。

## Case kind

- `documented_regression`: 提供元または一次資料が特定の挙動変化と是正を記録している。
- `observed_output`: 特定条件で出力を観測したが、一般的な回帰とは断定しない。
- `reproduction_test`: 条件を明示した再現試験を主証拠とする。

## 検証手順

1. sourceの実在、発行主体、対象日、対象productを確認する。
2. 主張をsourceが直接支える範囲へ限定する。
3. observation、provider statement、independent reproductionを混同しない。
4. severity、verification status、reproducibilityを保守的に設定する。
5. `last_verified_at`と各sourceの`accessed_at`を記録する。
6. AI補助の用途と人間レビュー状態を開示する。
7. content compiler、editorial lint、test、production build、route/visual reviewを通す。

## 反証確認

公開候補には、異なる評価結果、限定された対象範囲、version/plan/region差、未再現、時間経過、source側の不確実性など、主張を弱め得る情報を記載します。反証が未解決ならverificationやseverityを上げません。

## 公開判断

技術的な公開適格性はschema、`draft === false`、`review_status === approved`、9見出し、source、placeholder検査の論理積です。技術ゲート通過は編集承認の代替ではありません。人間editorは、事実範囲、表現、分類、severity、AI開示を確認して承認または差し戻します。
