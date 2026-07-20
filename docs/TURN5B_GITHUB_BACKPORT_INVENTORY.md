# Turn 5B GitHub Backport Inventory

Updated: 2026-07-21

## Fixed inputs and boundary

- GitHub base: `main` at `db3b56391c49534d4b703d59486263fcb5b7d4e0`, fetched and verified at `HEAD...origin/main = 0/0`.
- Deployed Sites source reference: `12e31329714e455731fc89606754dc8c70e6c3a0`.
- GitHub branch: `codex/lro-turn5-sites-compatibility`.
- Only the dedicated branch may be pushed. Do not merge or push `main`, create a PR, redeploy Sites, change access, add a custom domain, or add real advertising in Turn 5B.
- Application/content/taxonomy/generated-registry/components/source links/review evidence/public-case files remain byte-equivalent to the GitHub base.

## Source delta and treatment

| Path | Treatment |
|---|---|
| `.env.example` | Track only `NEXT_PUBLIC_SITE_URL=`. |
| `.gitignore` | Preserve existing ignores; add Vinext, Wrangler, Sites output, work, and all local env files except the example. |
| `.openai/hosting.json` | Do not track the bound Sites project metadata. An absent file means an explicit unbound build and emits a null marker into the artifact. |
| `build/sites-vite-plugin.ts` | Package a local binding when present; otherwise package `{ project_id: null, d1: null, r2: null }`. |
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
- `dist/server/index.js` must be ESM with a default callable `fetch`; `dist/.openai/hosting.json` must explicitly report bound or unbound state.

## Revalidation

```powershell
npm install
npm ls --depth=0
npm run content:compile
npm run content:compile
npm run lint:editorial
npm test
npm run review:verify-images
npm run lint
npx --no-install tsc --noEmit
npm audit --audit-level=low
$env:NEXT_PUBLIC_SITE_URL = 'https://llm-reliability-observatory.thankyoukass.chatgpt.site'
npm run build
npm run test:artifact
Remove-Item Env:NEXT_PUBLIC_SITE_URL
git diff --check
```

Acceptance requires: unchanged second registry output, 3 public cases / 0 public articles, 25 source tests, 26 valid review images, audit 0, generic lint and typecheck green, 3 artifact tests, exact canonical without `example.com`, 7 public routes at 200, 8 blocked routes at 404, 6 safe source links, real ad code 0, and no credential/PII leak.

## Another-terminal resume

```powershell
Set-Location 'C:\Users\thank\Storage\Media Contents Projects\llm-reliability-observatory'
git fetch --prune origin
git switch codex/lro-turn5-sites-compatibility
git pull --ff-only origin codex/lro-turn5-sites-compatibility
git rev-list --left-right --count HEAD...origin/codex/lro-turn5-sites-compatibility
npm ci
npm ls --depth=0
```

Then read `docs/HANDOFF.md`, this inventory, and `docs/TURN5_SITES_COMPATIBILITY.md`. Do not create `.openai/hosting.json` unless the owner explicitly authorizes binding this GitHub checkout to the existing private Site. The first owner-owned next decision is whether to accept a public editorial MVP; until then, keep access owner-only and all Turn 6-8 gates closed.
