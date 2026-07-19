import path from "node:path";
import { verifyReviewImages } from "./lib/review-image-format";

const rootArgument = process.argv.find((argument) => argument.startsWith("--root="))?.slice(7);
const reviewRoot = path.resolve(
  process.cwd(),
  rootArgument ?? path.join("samples", "_review")
);
const checks = verifyReviewImages(reviewRoot);

if (checks.length === 0) {
  throw new Error(`No review images found under ${reviewRoot}`);
}

for (const check of checks) {
  console.log(
    `${path.relative(process.cwd(), check.file)}: expected=${check.expected}; detected=${check.detected}; valid=${check.valid}`
  );
}

const invalid = checks.filter((check) => !check.valid);
if (invalid.length > 0) {
  throw new Error(`${invalid.length} review image(s) have mismatched extension and magic bytes.`);
}

console.log(`review image format verification passed: ${checks.length} image(s)`);
