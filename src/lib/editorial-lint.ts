import fs from "node:fs";
import path from "node:path";

export type EditorialDiagnostic = {
  file: string;
  line: number;
  level: "error" | "warning";
  rule: string;
  message: string;
  match: string;
};

export type EditorialLintResult = {
  diagnostics: EditorialDiagnostic[];
  errorCount: number;
  warningCount: number;
};

const lintableFrontmatterKeys = new Set(["title", "public_summary", "summary"]);

const errorPatterns: Array<{ rule: string; message: string; pattern: RegExp }> = [
  {
    rule: "personal-email",
    message: "メールアドレスらしき文字列があります。",
    pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi
  },
  {
    rule: "phone-number",
    message: "電話番号らしき文字列があります。",
    pattern: /(?:\+?\d{1,3}[-.\s]?)?(?:\(?\d{2,4}\)?[-.\s]?)\d{2,4}[-.\s]?\d{3,4}/g
  },
  {
    rule: "api-key",
    message: "APIキー風の文字列があります。",
    pattern: /\b(?:sk-[A-Za-z0-9_-]{20,}|(?:api[_-]?key|secret)[\s:=]+["']?[A-Za-z0-9_-]{20,})\b/g
  },
  {
    rule: "derogatory-word",
    message: "中傷的に読まれやすい語があります。",
    pattern: /(ゴミ|ポンコツ|最低|失敗作)/g
  }
];

const warningTerms = ["劣化", "嘘", "捏造", "欠陥", "絶対に", "必ず", "明らかに", "間違いなく"];

function listTargetFiles(cwd: string) {
  return ["content/cases", "content/articles", "content/taxonomy", "content/methodology"]
    .map((directory) => path.join(cwd, directory))
    .flatMap((directory) => {
      if (!fs.existsSync(directory)) {
        return [];
      }

      return fs
        .readdirSync(directory)
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => path.join(directory, file));
    });
}

function splitFrontmatter(source: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source);
  if (!match) {
    return { frontmatter: "", body: source };
  }
  return { frontmatter: match[1], body: source.slice(match[0].length) };
}

function extractLintText(source: string) {
  const { frontmatter, body } = splitFrontmatter(source);
  const selectedFrontmatter = frontmatter
    .split(/\r?\n/)
    .filter((line) => {
      const match = /^([A-Za-z0-9_]+):/.exec(line);
      return Boolean(match && lintableFrontmatterKeys.has(match[1]));
    })
    .map((line) => line.replace(/^[A-Za-z0-9_]+:\s*/, ""))
    .join("\n");

  return [selectedFrontmatter, body].filter(Boolean).join("\n");
}

function lineForIndex(source: string, index: number) {
  return source.slice(0, index).split(/\r?\n/).length;
}

function collectPatternDiagnostics(
  file: string,
  text: string,
  level: "error" | "warning",
  rule: string,
  message: string,
  pattern: RegExp
) {
  const diagnostics: EditorialDiagnostic[] = [];
  for (const match of text.matchAll(pattern)) {
    diagnostics.push({
      file,
      line: lineForIndex(text, match.index ?? 0),
      level,
      rule,
      message,
      match: match[0]
    });
  }
  return diagnostics;
}

export function lintEditorialContent(cwd = process.cwd()): EditorialLintResult {
  const diagnostics = listTargetFiles(cwd).flatMap((filePath) => {
    const text = extractLintText(fs.readFileSync(filePath, "utf8"));
    const relativeFile = path.relative(cwd, filePath);
    const errors = errorPatterns.flatMap(({ rule, message, pattern }) =>
      collectPatternDiagnostics(relativeFile, text, "error", rule, message, pattern)
    );
    const warnings = warningTerms.flatMap((term) =>
      collectPatternDiagnostics(
        relativeFile,
        text,
        "warning",
        "context-sensitive-term",
        "文脈確認が必要な語があります。",
        new RegExp(term, "g")
      )
    );

    return [...errors, ...warnings];
  });

  return {
    diagnostics,
    errorCount: diagnostics.filter((diagnostic) => diagnostic.level === "error").length,
    warningCount: diagnostics.filter((diagnostic) => diagnostic.level === "warning").length
  };
}
