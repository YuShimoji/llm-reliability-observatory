import { lintEditorialContent } from "../src/lib/editorial-lint.ts";

const result = lintEditorialContent(process.cwd());

for (const diagnostic of result.diagnostics) {
  console.log(
    `[${diagnostic.level}] ${diagnostic.file}:${diagnostic.line} ${diagnostic.rule} ${diagnostic.message} (${diagnostic.match})`
  );
}

if (result.diagnostics.length === 0) {
  console.log("editorial lint passed with no warnings.");
} else {
  console.log(
    `editorial lint completed: ${result.errorCount} error(s), ${result.warningCount} warning(s).`
  );
}

if (result.errorCount > 0) {
  process.exitCode = 1;
}
