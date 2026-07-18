import type { ContentSection, PublicationState } from "./case";

export type ArticleKind = "explainer" | "methodology" | "note";

export type ArticleFrontmatter = {
  title: string;
  slug: string;
  date: string;
  kind: ArticleKind;
  tags: string[];
  summary: string;
  related_cases: string[];
  related_articles: string[];
  disclosure: string | null;
  draft: boolean;
};

export type ArticleRecord = ArticleFrontmatter & {
  source_file: string;
  body: string;
  sections: ContentSection[];
  publication: PublicationState;
};
