import {
  assertCompilationSafe,
  compileContent,
  writeRegistry
} from "./lib/content-compiler";

const rootDir = process.cwd();
const compilation = compileContent(rootDir);
assertCompilationSafe(compilation);
const output = writeRegistry(rootDir, compilation.registry);
const blockedCases = compilation.registry.cases.filter((record) => !record.publication.eligible);

console.log(
  [
    `content compiler v${compilation.registry.schema_version} passed`,
    `${compilation.registry.stats.public_case_count} public case(s)`,
    `${blockedCases.length} blocked case candidate(s)`,
    `${compilation.registry.stats.public_article_count} public article(s)`,
    `digest ${compilation.registry.source_digest.slice(0, 12)}`,
    output.changed ? "registry updated" : "registry unchanged"
  ].join("; ")
);
