# Turn 5B GitHub Backport Inventory

Updated: 2026-07-21

## 2026-07-25 status correction

Commit `59433dc7135d5878128d8f3efe82dd7d9b8fe5a5` successfully reproduced the compatibility layer, but Turn 5B was PARTIAL as a production source contract:

- `.openai/hosting.json` was absent from tracked source;
- canonical production identity depended on untracked/process environment state;
- missing binding produced a successful artifact with `project_id: null`.

`codex/lro-turn5c-security-refresh` closes these gaps, integrates the Turn 5C dependency refresh, and supersedes the unbound production instructions below. The historical Sites deployment remains unchanged. See `docs/TURN5C_DEPENDENCY_SECURITY_REFRESH.md`.

## Fixed inputs and boundary

- GitHub base: `main` at `db3b56391c49534d4b703d59486263fcb5b7d4e0`, fetched and verified at `HEAD...origin/main = 0/0`.
- Deployed Sites source reference: `12e31329714e455731fc89606754dc8c70e6c3a0`.
- GitHub branch: `codex/lro-turn5-sites-compatibility`.
- Only the dedicated branch may be pushed. Do not merge or push `main`, create a PR, redeploy Sites, change access, add a custom domain, or add real advertising in Turn 5B.
- Application/content/taxonomy/generated-registry/components/source links/review evidence/public-case files remain byte-equivalent to the GitHub base.

## Source delta and treatment

| Path | Treatment |
|---|---|
| `.env.example` | Historical Turn 5B tracked only the key. Turn 5BC documents the override boundary. |
| `.gitignore` | Preserve local env ignores; Turn 5BC explicitly tracks non-secret `.env.production`. |
| `.openai/hosting.json` | Historical Turn 5B omitted it. Turn 5BC tracks only the authenticated exact `project_id`; the value stays out of prose/logs. |
| `build/sites-vite-plugin.ts` | Turn 5BC rejects missing/unbound/unsafe source state before bundling and packages the exact validated binding. |
| `eslint.config.mjs` | Use the Next 16 flat config. |
| `package.json` / `package-lock.json` | Apply Vinext/Vite/Worker dependencies atomically; regenerate the lock through one monitored install. |
| `tests/sites-artifact.test.mjs` | Validate callable Worker fetch, explicit hosting state, public/blocked routes, sitemap, source links, and no real ad code. |
| `tsconfig.json` | Include Vinext types and exclude generated Sites outputs while retaining `@/* -> ./src/*`. |
| `vite.config.ts` | Load an optional ignored binding and default D1/R2/project ID to null. |
| `worker/index.ts` | Provide the Cloudflare Worker fetch entry point. |
| `next-env.d.ts` | Retain the existing tracked file; do not copy the isolated checkout's deletion. |
| `docs/*` | Preserve Turn 4 authority and add Turn 5/5B evidence, state, boundaries, and resume commands. |

## Package and runtime contract

- Core compatibility versions: Vinext 0.0.50, Vite 8.1.5, Cloudflare Vite plugin 1.45.1, Wrangler 4.112.0, React 19.2.6, Next 16.2.10.
- Preserve npm, the committed lockfile, `gray-matter`, Zod, Tailwind 3, Autoprefixer, PostCSS, `tsx`, and all editorial/review scripts.
- Runtime application source must not import `node:fs` or use `process.cwd()`; optional binding reads and artifact packaging stay in build configuration only.
- `dist/server/index.js` must be ESM with a default callable `fetch`; `dist/.openai/hosting.json` must match the safe bound source manifest. Unbound production artifacts are rejected.

## Revalidation

```powershell
npm ci --include=optional
npm ls --depth=0
npm run content:compile
npm run content:compile
npm run lint:editorial
npm test
npm run review:verify-images
npm run lint
npx --no-install tsc --noEmit
npm run build
npm run test:artifact
npm audit --json
git diff --check
```

Acceptance requires: unchanged second registry output, 3 public cases / 0 public articles, 25 source tests, 26 valid review images, generic lint and typecheck green, 5 artifact tests, exact canonical without `example.com`, bound source/artifact equality, 7 public routes at 200, 8 blocked content routes at 404, image optimizer route at 404, 6 safe source links, real ad code 0, and no credential/PII leak.

Dependency acceptance is audit 0 or the single exact, non-reachable, artifact-absent, expiring exception defined in the Turn 5C document. The current accepted measurement is high 2 / critical 0 through Next.js -> Sharp 0.34.5 only; it must never be reported as audit 0.

## Another-terminal resume

```powershell
Set-Location 'C:\Users\thank\Storage\Media Contents Projects\llm-reliability-observatory'
git fetch --prune origin
git switch codex/lro-turn5c-security-refresh
git pull --ff-only origin codex/lro-turn5c-security-refresh
git rev-list --left-right --count 'HEAD...origin/codex/lro-turn5c-security-refresh'
npm ci --include=optional
npm ls --depth=0
```

Then read `docs/HANDOFF.md`, `docs/TURN5C_DEPENDENCY_SECURITY_REFRESH.md`, this inventory, and `docs/TURN5_SITES_COMPATIBILITY.md`. Keep the opaque Site identity confined to the tracked manifest. The next decision is Supervisor acceptance/main integration; Turn 6 local candidate may follow acceptance, while public release remains a separate owner gate.
