export type CaseSeverity = "sev0" | "sev1" | "sev2" | "sev3" | "sev4";

export type VerificationStatus =
  | "unverified_signal"
  | "single_source"
  | "multi_source"
  | "reproduced"
  | "corrected";

export type CaseKind = "documented_regression" | "observed_output" | "reproduction_test";

export type ReviewStatus = "pending" | "approved";

export type SourceType = "official" | "primary" | "secondary";

export type SourceLink = {
  label: string;
  url: string;
  source_type: SourceType;
  accessed_at: string;
};

export type AiAssistance = {
  used: boolean;
  disclosure: string;
  human_reviewed: boolean;
};

export type ContentSection = {
  heading: string;
  content: string;
};

export const CASE_REQUIRED_HEADINGS = [
  "状況",
  "期待していた回答",
  "実際の回答または要約",
  "誤りと判断した根拠",
  "再現条件",
  "分類根拠",
  "反証考察",
  "編集後記",
  "出典・参考リンク"
] as const;

export type PublicationState = {
  eligible: boolean;
  blockers: string[];
  schema_valid: boolean;
  required_headings_present: number;
  required_heading_count: number;
};

export type CaseFrontmatter = {
  title: string;
  slug: string;
  date: string;
  case_kind: CaseKind;
  review_status: ReviewStatus;
  last_verified_at: string;
  model_vendor: string;
  model_product: string;
  model_version: string;
  version_is_estimated: boolean;
  surface: string;
  plan: string;
  task_category: string;
  primary_failure_category: string;
  secondary_failure_categories: string[];
  severity: CaseSeverity;
  verification_status: VerificationStatus;
  reproducibility: string;
  public_summary: string;
  source_links: SourceLink[];
  disclosure: string | null;
  ai_assistance: AiAssistance;
  draft: boolean;
};

export type CaseRecord = CaseFrontmatter & {
  source_file: string;
  body: string;
  sections: ContentSection[];
  publication: PublicationState;
};
