export type CaseSeverity = "sev0" | "sev1" | "sev2" | "sev3" | "sev4";

export type VerificationStatus =
  | "unverified_signal"
  | "single_source"
  | "multi_source"
  | "reproduced"
  | "corrected";

export type ContentSection = {
  heading: string;
  content: string;
};

export type CaseFrontmatter = {
  title: string;
  slug: string;
  date: string;
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
  source_links: string[];
  disclosure: string | null;
  draft: boolean;
};

export type CaseRecord = CaseFrontmatter & {
  body: string;
  sections: ContentSection[];
};
