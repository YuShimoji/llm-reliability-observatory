import { z } from "zod";

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "must use YYYY-MM-DD")
  .refine((value) => !Number.isNaN(Date.parse(`${value}T00:00:00Z`)), "must be a valid date");

const httpUrl = z
  .string()
  .url()
  .refine((value) => {
    try {
      const protocol = new URL(value).protocol;
      return protocol === "https:" || protocol === "http:";
    } catch {
      return false;
    }
  }, "must use http or https");

export const sourceLinkSchema = z
  .object({
    label: z.string().trim().min(1),
    url: httpUrl,
    source_type: z.enum(["official", "primary", "secondary"]),
    accessed_at: isoDate
  })
  .strict();

export const aiAssistanceSchema = z
  .object({
    used: z.boolean(),
    disclosure: z.string().trim().min(1),
    human_reviewed: z.boolean()
  })
  .strict();

export const caseFrontmatterSchema = z
  .object({
    title: z.string().trim().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    date: isoDate,
    case_kind: z.enum(["documented_regression", "observed_output", "reproduction_test"]),
    review_status: z.enum(["pending", "approved"]),
    last_verified_at: isoDate,
    model_vendor: z.string().trim().min(1),
    model_product: z.string().trim().min(1),
    model_version: z.string().trim().min(1),
    version_is_estimated: z.boolean(),
    surface: z.enum(["chat", "api", "agent", "coding_assistant", "unknown"]),
    plan: z.string().trim().min(1),
    task_category: z.enum(["research", "coding", "planning", "writing", "unknown"]),
    primary_failure_category: z.enum([
      "sycophancy",
      "fabricated_citation",
      "nonexistent_capability",
      "context_loss",
      "tool_failure",
      "coding_accident",
      "stale_information",
      "unknown"
    ]),
    secondary_failure_categories: z.array(
      z.enum([
        "sycophancy",
        "fabricated_citation",
        "nonexistent_capability",
        "context_loss",
        "tool_failure",
        "coding_accident",
        "stale_information",
        "unknown"
      ])
    ),
    severity: z.enum(["sev0", "sev1", "sev2", "sev3", "sev4"]),
    verification_status: z.enum([
      "unverified_signal",
      "single_source",
      "multi_source",
      "reproduced",
      "corrected"
    ]),
    reproducibility: z.string().trim().min(1),
    public_summary: z.string().trim().min(1),
    source_links: z.array(sourceLinkSchema),
    disclosure: z.string().trim().min(1).nullable(),
    ai_assistance: aiAssistanceSchema,
    draft: z.boolean().optional()
  })
  .strict();

export const articleFrontmatterSchema = z
  .object({
    title: z.string().trim().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    date: isoDate,
    kind: z.enum(["explainer", "methodology", "note"]),
    tags: z.array(z.string()),
    summary: z.string().trim().min(1),
    related_cases: z.array(z.string()),
    related_articles: z.array(z.string()),
    disclosure: z.string().trim().min(1).nullable(),
    draft: z.boolean().optional()
  })
  .strict();

export const staticPageFrontmatterSchema = z
  .object({
    title: z.string().trim().min(1),
    summary: z.string().trim().min(1).optional()
  })
  .passthrough();
