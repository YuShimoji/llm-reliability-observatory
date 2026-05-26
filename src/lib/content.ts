import fs from "node:fs";
import path from "node:path";
import type { ArticleRecord } from "@/types/article";
import type { CaseRecord, ContentSection } from "@/types/case";

type Frontmatter = Record<string, unknown>;

export type StaticContentPage = {
  title: string;
  summary?: string;
  body: string;
  sections: ContentSection[];
};

const rootDir = process.cwd();
const contentDir = path.join(rootDir, "content");

function listMdxFiles(directory: string) {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"))
    .sort()
    .map((file) => path.join(directory, file));
}

function splitFrontmatter(source: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source);

  if (!match) {
    return { frontmatter: {}, body: source };
  }

  return {
    frontmatter: parseFrontmatter(match[1]),
    body: source.slice(match[0].length).trim()
  };
}

function parseFrontmatter(raw: string): Frontmatter {
  return raw.split(/\r?\n/).reduce<Frontmatter>((result, line) => {
    if (!line.trim()) {
      return result;
    }

    const match = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line);
    if (!match) {
      return result;
    }

    const [, key, value] = match;
    result[key] = parseValue(value.trim());
    return result;
  }, {});
}

function parseValue(value: string): unknown {
  if (value === "null") {
    return null;
  }
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  if (value === "[]") {
    return [];
  }
  if (value.startsWith("[") && value.endsWith("]")) {
    return JSON.parse(value);
  }
  if (value.startsWith('"') && value.endsWith('"')) {
    return JSON.parse(value);
  }

  return value;
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

    if (current) {
      current.content += `${line}\n`;
    }
  }

  if (current) {
    current.content = current.content.trim();
    sections.push(current);
  }

  return sections;
}

function readMdx(filePath: string) {
  const source = fs.readFileSync(filePath, "utf8");
  const { frontmatter, body } = splitFrontmatter(source);
  return { frontmatter, body, sections: extractSections(body) };
}

function byDateDesc<T extends { date: string; slug: string }>(a: T, b: T) {
  return b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug);
}

export function getAllCases(options: { includeDraft?: boolean } = {}): CaseRecord[] {
  return listMdxFiles(path.join(contentDir, "cases"))
    .map((filePath) => {
      const parsed = readMdx(filePath);
      return {
        ...parsed.frontmatter,
        body: parsed.body,
        sections: parsed.sections
      } as CaseRecord;
    })
    .filter((item) => options.includeDraft || !item.draft)
    .sort(byDateDesc);
}

export function getCaseBySlug(slug: string, options: { includeDraft?: boolean } = {}) {
  return getAllCases(options).find((item) => item.slug === slug) ?? null;
}

export function getAllArticles(options: { includeDraft?: boolean } = {}): ArticleRecord[] {
  return listMdxFiles(path.join(contentDir, "articles"))
    .map((filePath) => {
      const parsed = readMdx(filePath);
      return {
        ...parsed.frontmatter,
        body: parsed.body,
        sections: parsed.sections
      } as ArticleRecord;
    })
    .filter((item) => options.includeDraft || !item.draft)
    .sort(byDateDesc);
}

export function getArticleBySlug(slug: string, options: { includeDraft?: boolean } = {}) {
  return getAllArticles(options).find((item) => item.slug === slug) ?? null;
}

export function getStaticContentPage(section: "taxonomy" | "methodology"): StaticContentPage {
  const parsed = readMdx(path.join(contentDir, section, "index.mdx"));
  return {
    title: String(parsed.frontmatter.title ?? section),
    summary: parsed.frontmatter.summary ? String(parsed.frontmatter.summary) : undefined,
    body: parsed.body,
    sections: parsed.sections
  };
}
