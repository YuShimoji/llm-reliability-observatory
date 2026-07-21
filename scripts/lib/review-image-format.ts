import fs from "node:fs";
import path from "node:path";

export type ReviewImageFormat = "png" | "jpeg" | "webp" | "unknown";

export type ReviewImageCheck = {
  file: string;
  expected: ReviewImageFormat;
  detected: ReviewImageFormat;
  valid: boolean;
};

const signatures = {
  png: Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  jpeg: Buffer.from([0xff, 0xd8, 0xff])
};

export function detectReviewImageFormat(bytes: Uint8Array): ReviewImageFormat {
  const buffer = Buffer.from(bytes);
  if (buffer.length >= signatures.png.length && buffer.subarray(0, 8).equals(signatures.png)) {
    return "png";
  }
  if (buffer.length >= signatures.jpeg.length && buffer.subarray(0, 3).equals(signatures.jpeg)) {
    return "jpeg";
  }
  if (
    buffer.length >= 12 &&
    buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
    buffer.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return "webp";
  }
  return "unknown";
}

function expectedFormat(file: string): ReviewImageFormat | null {
  const extension = path.extname(file).toLowerCase();
  if (extension === ".png") return "png";
  if (extension === ".jpg" || extension === ".jpeg") return "jpeg";
  if (extension === ".webp") return "webp";
  return null;
}

function listImageFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return listImageFiles(fullPath);
    return entry.isFile() && expectedFormat(fullPath) ? [fullPath] : [];
  });
}

export function verifyReviewImages(directory: string): ReviewImageCheck[] {
  return listImageFiles(directory)
    .sort()
    .map((file) => {
      const expected = expectedFormat(file) ?? "unknown";
      const detected = detectReviewImageFormat(fs.readFileSync(file));
      return {
        file,
        expected,
        detected,
        valid: expected === detected
      };
    });
}
