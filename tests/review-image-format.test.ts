import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import {
  detectReviewImageFormat,
  verifyReviewImages
} from "../scripts/lib/review-image-format";

test("detects PNG, JPEG, WebP, and unknown magic bytes", () => {
  assert.equal(
    detectReviewImageFormat(Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])),
    "png"
  );
  assert.equal(detectReviewImageFormat(Uint8Array.from([0xff, 0xd8, 0xff, 0xe0])), "jpeg");
  assert.equal(
    detectReviewImageFormat(Buffer.from("RIFF0000WEBP", "ascii")),
    "webp"
  );
  assert.equal(detectReviewImageFormat(Uint8Array.from([0x00, 0x01, 0x02])), "unknown");
});

test("tracked publication-engine review images match their extensions", () => {
  const reviewRoot = path.join(process.cwd(), "samples", "_review", "publication-engine-v2");
  const checks = verifyReviewImages(reviewRoot);
  const currentCaseChecks = verifyReviewImages(
    path.join(reviewRoot, "002-gpt-4o-sycophancy-rollback")
  );

  assert.ok(checks.length >= 4);
  assert.equal(checks.every((check) => check.valid), true);
  assert.deepEqual(
    currentCaseChecks.map((check) => ({
      file: path.basename(check.file),
      expected: check.expected,
      detected: check.detected,
      valid: check.valid
    })),
    [
      { file: "case-card.png", expected: "png", detected: "png", valid: true },
      { file: "case-detail-desktop.png", expected: "png", detected: "png", valid: true },
      { file: "case-detail-mobile.png", expected: "png", detected: "png", valid: true },
      { file: "source-links.png", expected: "png", detected: "png", valid: true }
    ]
  );
});
