import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { Plugin } from "vite";

export interface HostingConfig {
  project_id: string;
  d1?: string | null;
  r2?: string | null;
}

const ALLOWED_HOSTING_FIELDS = new Set(["project_id", "d1", "r2"]);
const SENSITIVE_FIELD_PATTERN =
  /authorization|bearer|credential|password|private|secret|token/i;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function parseHostingConfig(value: unknown): HostingConfig {
  if (!isRecord(value)) {
    throw new Error("Sites hosting manifest must be a JSON object.");
  }

  for (const key of Object.keys(value)) {
    if (SENSITIVE_FIELD_PATTERN.test(key)) {
      throw new Error("Sites hosting manifest contains a forbidden sensitive field.");
    }
    if (!ALLOWED_HOSTING_FIELDS.has(key)) {
      throw new Error("Sites hosting manifest contains an unexpected field.");
    }
  }

  if (typeof value.project_id !== "string" || value.project_id.trim().length === 0) {
    throw new Error("Sites hosting manifest requires a nonempty project_id.");
  }

  for (const key of ["d1", "r2"] as const) {
    const binding = value[key];
    if (
      binding !== undefined &&
      binding !== null &&
      (typeof binding !== "string" || binding.trim().length === 0)
    ) {
      throw new Error(`Sites hosting manifest ${key} must be omitted, null, or nonempty.`);
    }
  }

  return value as unknown as HostingConfig;
}

export async function readHostingConfig(root: string): Promise<HostingConfig> {
  const path = resolve(root, ".openai", "hosting.json");
  let source: string;
  try {
    source = await readFile(path, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      throw new Error("A bound Sites hosting manifest is required for production builds.");
    }
    throw error;
  }

  try {
    return parseHostingConfig(JSON.parse(source) as unknown);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error("Sites hosting manifest must contain valid JSON.");
    }
    throw error;
  }
}

// Packages Sites metadata and migrations after Vite finishes compiling.
// Production builds require an owner-approved binding and copy only the
// validated manifest into the immutable artifact.
export function sites(): Plugin {
  let root = process.cwd();

  return {
    name: "sites",
    apply: "build",
    configResolved(config) {
      root = config.root;
    },
    async buildStart() {
      await readHostingConfig(root);
    },
    async closeBundle() {
      const outputDirectory = resolve(root, "dist", ".openai");
      const outputHostingConfig = resolve(outputDirectory, "hosting.json");
      const drizzleSource = resolve(root, "drizzle");
      const hostingConfig = await readHostingConfig(root);

      await rm(outputDirectory, { recursive: true, force: true });
      await mkdir(outputDirectory, { recursive: true });
      await writeFile(
        outputHostingConfig,
        `${JSON.stringify(hostingConfig, null, 2)}\n`,
        "utf8",
      );
      try {
        await cp(drizzleSource, resolve(outputDirectory, "drizzle"), {
          recursive: true,
        });
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
          throw error;
        }
      }
    },
  };
}
