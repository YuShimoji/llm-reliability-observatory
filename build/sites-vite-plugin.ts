import { access, cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { Plugin } from "vite";

const UNBOUND_HOSTING_CONFIG = {
  project_id: null,
  d1: null,
  r2: null,
};

async function exists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

// Packages Sites metadata and migrations after Vite finishes compiling.
// A checkout without an owner-approved binding receives an explicit unbound
// marker so compatibility builds stay reproducible without copying a Site ID.
export function sites(): Plugin {
  let root = process.cwd();

  return {
    name: "sites",
    apply: "build",
    configResolved(config) {
      root = config.root;
    },
    async closeBundle() {
      const outputDirectory = resolve(root, "dist", ".openai");
      const hostingConfig = resolve(root, ".openai", "hosting.json");
      const outputHostingConfig = resolve(outputDirectory, "hosting.json");
      const drizzleSource = resolve(root, "drizzle");

      await rm(outputDirectory, { recursive: true, force: true });
      await mkdir(outputDirectory, { recursive: true });

      if (await exists(hostingConfig)) {
        const parsed = JSON.parse(await readFile(hostingConfig, "utf8")) as unknown;
        await writeFile(outputHostingConfig, `${JSON.stringify(parsed, null, 2)}\n`, "utf8");
      } else {
        await writeFile(
          outputHostingConfig,
          `${JSON.stringify(UNBOUND_HOSTING_CONFIG, null, 2)}\n`,
          "utf8",
        );
      }
      if (await exists(drizzleSource)) {
        await cp(drizzleSource, resolve(outputDirectory, "drizzle"), {
          recursive: true,
        });
      }
    },
  };
}
