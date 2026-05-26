export type TaxonomyOption = {
  code: string;
  label: string;
  description: string;
};

export const failure_categories: TaxonomyOption[] = [
  {
    code: "fabricated_citation",
    label: "引用捏造",
    description: "存在しない出典や確認不能な参照を示す。"
  },
  {
    code: "nonexistent_capability",
    label: "存在しない機能案内",
    description: "実際には使えない機能や手順を案内する。"
  },
  {
    code: "context_loss",
    label: "文脈崩壊",
    description: "会話や入力条件の重要部分を落とす。"
  },
  {
    code: "tool_failure",
    label: "ツール失敗",
    description: "外部ツールや実行結果の扱いで誤る。"
  },
  {
    code: "coding_accident",
    label: "AIコーディング事故",
    description: "実装、修正、生成コードが問題を生む。"
  },
  {
    code: "stale_information",
    label: "古い情報",
    description: "更新済みの仕様、価格、状態を古いまま扱う。"
  },
  {
    code: "unknown",
    label: "未分類",
    description: "分類がまだ確定していない。"
  }
];

export const severity_levels: TaxonomyOption[] = [
  { code: "sev0", label: "SEV0", description: "観測メモまたは軽微な誤り。" },
  { code: "sev1", label: "SEV1", description: "小さな手戻りや確認負荷が生じる。" },
  { code: "sev2", label: "SEV2", description: "意思決定や作業品質に影響する。" },
  { code: "sev3", label: "SEV3", description: "金銭、法務、運用上の損失につながり得る。" },
  { code: "sev4", label: "SEV4", description: "重大な損害や安全上の懸念がある。" }
];

export const verification_statuses: TaxonomyOption[] = [
  { code: "unverified_signal", label: "未検証シグナル", description: "記録のみで検証は未完了。" },
  { code: "single_source", label: "単一ソース確認", description: "一つの情報源で確認済み。" },
  { code: "multi_source", label: "複数ソース確認", description: "複数の情報源で確認済み。" },
  { code: "reproduced", label: "再現済み", description: "条件付きで再現を確認済み。" },
  { code: "corrected", label: "訂正済み", description: "公開後の訂正が反映済み。" }
];

export const task_categories: TaxonomyOption[] = [
  { code: "research", label: "調査", description: "情報収集や要約のタスク。" },
  { code: "coding", label: "コーディング", description: "設計、実装、レビューのタスク。" },
  { code: "planning", label: "計画", description: "手順、判断、優先順位づけのタスク。" },
  { code: "writing", label: "執筆", description: "文章生成や編集のタスク。" },
  { code: "unknown", label: "未分類", description: "タスク分類が未確定。" }
];

export const surface_options: TaxonomyOption[] = [
  { code: "chat", label: "チャットUI", description: "対話型UIで発生。" },
  { code: "api", label: "API", description: "API利用時に発生。" },
  { code: "agent", label: "エージェント", description: "ツール実行や自律処理で発生。" },
  { code: "coding_assistant", label: "コード支援", description: "IDEやCLIのコード支援で発生。" },
  { code: "unknown", label: "未分類", description: "発生面が未確定。" }
];
