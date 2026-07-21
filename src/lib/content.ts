import registryData from "@/generated/content-registry.json";
import type { ContentRegistry, StaticContentPage } from "../../scripts/lib/content-compiler";
import type { ArticleRecord } from "@/types/article";
import type { CaseRecord } from "@/types/case";

const registry = registryData as unknown as ContentRegistry;

function cloneCases(records: CaseRecord[]) {
  return records.map((record) => ({ ...record }));
}

function cloneArticles(records: ArticleRecord[]) {
  return records.map((record) => ({ ...record }));
}

export function getAllCases(options: { includeDraft?: boolean } = {}): CaseRecord[] {
  const records = options.includeDraft
    ? registry.cases
    : registry.cases.filter((record) => record.publication.eligible);
  return cloneCases(records);
}

export function getCaseBySlug(slug: string, options: { includeDraft?: boolean } = {}) {
  return getAllCases(options).find((record) => record.slug === slug) ?? null;
}

export function getAllArticles(options: { includeDraft?: boolean } = {}): ArticleRecord[] {
  const records = options.includeDraft
    ? registry.articles
    : registry.articles.filter((record) => record.publication.eligible);
  return cloneArticles(records);
}

export function getArticleBySlug(slug: string, options: { includeDraft?: boolean } = {}) {
  return getAllArticles(options).find((record) => record.slug === slug) ?? null;
}

export function getStaticContentPage(section: "taxonomy" | "methodology"): StaticContentPage {
  return { ...registry.static_pages[section] };
}

export function getContentStats() {
  return { ...registry.stats, source_digest: registry.source_digest };
}
