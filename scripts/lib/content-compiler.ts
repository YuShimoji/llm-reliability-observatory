import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  articleFrontmatterSchema,
  caseFrontmatterSchema,
  staticPageFrontmatterSchema
} from "../../src/content/schema";
import type { ArticleRecord } from "../../src/types/article";
import {
  CASE_REQUIRED_HEADINGS,
  type CaseRecord,
  type ContentSection,
  type PublicationState
} from "../../src/types/case";

export type StaticContentPage = {
  title: string;
  summary?: string;
  body: string;
  sections: ContentSection[];
};

export type ContentRegistry = {
  schema_version: 2;
  source_digest: string;
  cases: CaseRecord[];
  articles: ArticleRecord[];
  static_pages: Record<"taxonomy" | "methodology", StaticContentPage>;
  stats: {
    case_count: number;
    public_case_count: number;
    blocked_case_count: number;
    article_count: number;
    public_article_count: number;
    fixture_count: number;
  };
};

export type ContentDiagnostic = {
  file: string;
  level: "blocked" | "error";
  code: string;
  message: string;
};

export type CaseCompilation = {
  record: CaseRecord | null;
  diagnostics: ContentDiagnostic[];
  fatal: boolean;
};

export type ContentCompilation = {
  registry: ContentRegistry;
  diagnostics: ContentDiagnostic[];
  fatalDiagnostics: ContentDiagnostic[];
};

type SourceEntry = { relativePath: string; source: string };

function normalizedPath(value: string) {
  return value.split(path.sep).join("/");
}

function normalizeSource(value: string) {
  return value.replace(/\r\n?/g, "\n");
}

function listMdxEntries(rootDir: string, relativeDirectory: string): SourceEntry[] {
  const directory = path.join(rootDir, relativeDirectory);
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"))
    .sort()
    .map((file) => {
      const absolutePath = path.join(directory, file);
      return {
        relativePath: normalizedPath(path.relative(rootDir, absolutePath)),
        source: normalizeSource(fs.readFileSync(absolutePath, "utf8"))
      };
    });
}

export function extractSections(body: string): ContentSection[] {
  const sections: ContentSection[] = [];
  let current: ContentSection | null = null;

  for (const line of body.split(/\r?\n/)) {
    if (line.startsWith("## ")) {
      if (current) {
        current.content = current.content.trim();
        sections.push(current);
      }
      current = { heading: line.replace(/^##\s+/, "").trim(), content: "" };
      continue;
    }

    if (current) current.content += `${line}\n`;
  }

  if (current) {
    current.content = current.content.trim();
    sections.push(current);
  }

  return sections;
}

function schemaDiagnostics(file: string, issues: Array<{ path: PropertyKey[]; message: string }>) {
  return issues.map<ContentDiagnostic>((issue) => ({
    file,
    level: "error",
    code: "schema_invalid",
    message: `${issue.path.map(String).join(".") || "frontmatter"}: ${issue.message}`
  }));
}

function hasPlaceholder(value: string) {
  return /\bTODO\b/i.test(value);
}

function unique(values: string[]) {
  return [...new Set(values)];
}

function publicationState(blockers: string[], headingsPresent: number): PublicationState {
  return {
    eligible: blockers.length === 0,
    blockers: unique(blockers),
    schema_valid: true,
    required_headings_present: headingsPresent,
    required_heading_count: CASE_REQUIRED_HEADINGS.length
  };
}

export function compileCaseSource(source: string, sourceFile: string): CaseCompilation {
  let parsed: matter.GrayMatterFile<string>;
  try {
    parsed = matter(normalizeSource(source));
  } catch (error) {
    const diagnostic: ContentDiagnostic = {
      file: sourceFile,
      level: "error",
      code: "frontmatter_parse_error",
      message: error instanceof Error ? error.message : String(error)
    };
    return { record: null, diagnostics: [diagnostic], fatal: true };
  }

  const raw = parsed.data as Record<string, unknown>;
  const publicationIntent = raw.draft === false && raw.review_status === "approved";
  const validated = caseFrontmatterSchema.safeParse(raw);
  if (!validated.success) {
    const diagnostics = schemaDiagnostics(sourceFile, validated.error.issues);
    return { record: null, diagnostics, fatal: publicationIntent };
  }

  const sections = extractSections(parsed.content.trim());
  const sectionMap = new Map(sections.map((section) => [section.heading, section.content]));
  const missingHeadings = CASE_REQUIRED_HEADINGS.filter(
    (heading) => !sectionMap.has(heading) || !sectionMap.get(heading)?.trim()
  );
  const normalizedDraft = validated.data.draft ?? true;
  const serializedCandidate = `${JSON.stringify(validated.data)}\n${parsed.content}`;
  const blockers: string[] = [];

  if (validated.data.draft === undefined) blockers.push("missing_draft");
  if (normalizedDraft) blockers.push("draft");
  if (validated.data.review_status !== "approved") blockers.push("review_not_approved");
  if (validated.data.source_links.length === 0) blockers.push("missing_source_links");
  if (missingHeadings.length > 0) blockers.push(`missing_headings:${missingHeadings.join(",")}`);
  if (hasPlaceholder(serializedCandidate)) blockers.push("contains_todo");
  if (/example\.com/i.test(serializedCandidate)) blockers.push("contains_example_domain");

  const publication = publicationState(
    blockers,
    CASE_REQUIRED_HEADINGS.length - missingHeadings.length
  );
  const record: CaseRecord = {
    ...validated.data,
    draft: normalizedDraft,
    source_file: sourceFile,
    body: parsed.content.trim(),
    sections,
    publication
  };
  const diagnostics = publication.eligible
    ? []
    : [
        {
          file: sourceFile,
          level: publicationIntent ? ("error" as const) : ("blocked" as const),
          code: "publication_blocked",
          message: publication.blockers.join(", ")
        }
      ];

  return { record, diagnostics, fatal: publicationIntent && !publication.eligible };
}

function compileArticleSource(source: string, sourceFile: string) {
  let parsed: matter.GrayMatterFile<string>;
  try {
    parsed = matter(normalizeSource(source));
  } catch (error) {
    const diagnostic: ContentDiagnostic = {
      file: sourceFile,
      level: "error",
      code: "frontmatter_parse_error",
      message: error instanceof Error ? error.message : String(error)
    };
    return { record: null, diagnostics: [diagnostic], fatal: true };
  }

  const raw = parsed.data as Record<string, unknown>;
  const publicationIntent = raw.draft === false;
  const validated = articleFrontmatterSchema.safeParse(raw);
  if (!validated.success) {
    const diagnostics = schemaDiagnostics(sourceFile, validated.error.issues);
    return { record: null, diagnostics, fatal: publicationIntent };
  }

  const sections = extractSections(parsed.content.trim());
  const draft = validated.data.draft ?? true;
  const serializedCandidate = `${JSON.stringify(validated.data)}\n${parsed.content}`;
  const blockers: string[] = [];
  if (validated.data.draft === undefined) blockers.push("missing_draft");
  if (draft) blockers.push("draft");
  if (sections.length === 0 || sections.some((section) => !section.content.trim())) {
    blockers.push("missing_content_section");
  }
  if (hasPlaceholder(serializedCandidate)) blockers.push("contains_todo");
  if (/example\.com/i.test(serializedCandidate)) blockers.push("contains_example_domain");
  const publication: PublicationState = {
    eligible: blockers.length === 0,
    blockers: unique(blockers),
    schema_valid: true,
    required_headings_present: sections.filter((section) => section.content.trim()).length,
    required_heading_count: Math.max(1, sections.length)
  };
  const record: ArticleRecord = {
    ...validated.data,
    draft,
    source_file: sourceFile,
    body: parsed.content.trim(),
    sections,
    publication
  };
  const diagnostics = publication.eligible
    ? []
    : [
        {
          file: sourceFile,
          level: publicationIntent ? ("error" as const) : ("blocked" as const),
          code: "publication_blocked",
          message: publication.blockers.join(", ")
        }
      ];
  return { record, diagnostics, fatal: publicationIntent && !publication.eligible };
}

function compileStaticPage(rootDir: string, section: "taxonomy" | "methodology") {
  const sourceFile = normalizedPath(path.join("content", section, "index.mdx"));
  const source = normalizeSource(fs.readFileSync(path.join(rootDir, sourceFile), "utf8"));
  const parsed = matter(source);
  const validated = staticPageFrontmatterSchema.parse(parsed.data);
  return {
    entry: { relativePath: sourceFile, source },
    page: {
      title: validated.title,
      summary: validated.summary,
      body: parsed.content.trim(),
      sections: extractSections(parsed.content.trim())
    } satisfies StaticContentPage
  };
}

function byDateDesc<T extends { date: string; slug: string }>(a: T, b: T) {
  return b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug);
}

export function compileContent(rootDir: string): ContentCompilation {
  const caseEntries = listMdxEntries(rootDir, "content/cases");
  const articleEntries = listMdxEntries(rootDir, "content/articles");
  const fixtureEntries = listMdxEntries(rootDir, "content/_fixtures");
  const taxonomy = compileStaticPage(rootDir, "taxonomy");
  const methodology = compileStaticPage(rootDir, "methodology");
  const caseResults = caseEntries.map((entry) => compileCaseSource(entry.source, entry.relativePath));
  const articleResults = articleEntries.map((entry) =>
    compileArticleSource(entry.source, entry.relativePath)
  );
  const fixtureResults = fixtureEntries.map((entry) =>
    compileCaseSource(entry.source, entry.relativePath)
  );
  const fixtureDiagnostics = fixtureResults.flatMap((result, index) => {
    const diagnostics = [...result.diagnostics];
    if (result.record?.publication.eligible) {
      diagnostics.push({
        file: fixtureEntries[index].relativePath,
        level: "error",
        code: "fixture_publication_forbidden",
        message: "Fixtures cannot become publication-eligible."
      });
    }
    return diagnostics;
  });
  const diagnostics = [
    ...caseResults.flatMap((result) => result.diagnostics),
    ...articleResults.flatMap((result) => result.diagnostics),
    ...fixtureDiagnostics
  ];
  const fatalDiagnostics = [
    ...caseResults.filter((result) => result.fatal).flatMap((result) => result.diagnostics),
    ...articleResults.filter((result) => result.fatal).flatMap((result) => result.diagnostics),
    ...fixtureDiagnostics.filter((diagnostic) => diagnostic.level === "error")
  ];
  const cases = caseResults.flatMap((result) => (result.record ? [result.record] : [])).sort(byDateDesc);
  const articles = articleResults
    .flatMap((result) => (result.record ? [result.record] : []))
    .sort(byDateDesc);
  const digestEntries = [
    ...caseEntries,
    ...articleEntries,
    ...fixtureEntries,
    taxonomy.entry,
    methodology.entry
  ].sort((a, b) => a.relativePath.localeCompare(b.relativePath));
  const sourceDigest = createHash("sha256")
    .update(digestEntries.map((entry) => `${entry.relativePath}\0${entry.source}`).join("\0"))
    .digest("hex");

  return {
    registry: {
      schema_version: 2,
      source_digest: sourceDigest,
      cases,
      articles,
      static_pages: { taxonomy: taxonomy.page, methodology: methodology.page },
      stats: {
        case_count: cases.length,
        public_case_count: cases.filter((record) => record.publication.eligible).length,
        blocked_case_count: cases.filter((record) => !record.publication.eligible).length,
        article_count: articles.length,
        public_article_count: articles.filter((record) => record.publication.eligible).length,
        fixture_count: fixtureEntries.length
      }
    },
    diagnostics,
    fatalDiagnostics
  };
}

export function assertCompilationSafe(compilation: ContentCompilation) {
  if (compilation.fatalDiagnostics.length === 0) return;
  throw new Error(
    compilation.fatalDiagnostics
      .map((diagnostic) => `${diagnostic.file}: ${diagnostic.code}: ${diagnostic.message}`)
      .join("\n")
  );
}

export function serializeRegistry(registry: ContentRegistry) {
  return `${JSON.stringify(registry, null, 2)}\n`;
}

export function writeRegistry(rootDir: string, registry: ContentRegistry) {
  const outputPath = path.join(rootDir, "src", "generated", "content-registry.json");
  const serialized = serializeRegistry(registry);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  const previous = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf8") : null;
  const changed = previous === null || normalizeSource(previous) !== serialized;
  if (changed) fs.writeFileSync(outputPath, serialized, "utf8");
  return { outputPath, changed, bytes: Buffer.byteLength(serialized) };
}
