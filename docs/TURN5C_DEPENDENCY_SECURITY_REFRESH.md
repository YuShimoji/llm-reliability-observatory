# Turn 5BC Binding and Dependency Security Closure

Updated: 2026-07-25

## Outcome and authority

`codex/lro-turn5c-security-refresh` combines the previously local Turn 5C dependency refresh with the missing Turn 5B binding, clean-clone canonical, and fail-closed artifact contracts.

- Compatibility base: `59433dc7135d5878128d8f3efe82dd7d9b8fe5a5`.
- Protected `origin/main`: `db3b56391c49534d4b703d59486263fcb5b7d4e0`.
- Protected compatibility branch: `59433dc7135d5878128d8f3efe82dd7d9b8fe5a5`.
- Target outcome: the exact remote commit on `origin/codex/lro-turn5c-security-refresh`.
- Allowed external effect: one normal branch push after all gates pass.
- Excluded effects: PR, merge, tag, release, Sites version/deployment/access/environment change, and public release.

The tracked Site binding contains the exact opaque identity returned by the authenticated Sites management path. This document intentionally records only boolean identity checks and never records the identity value.

## Existing local delta audit

The reported six-path local delta was present and owned by this maintenance lane:

- `package.json`;
- `package-lock.json`;
- `docs/HANDOFF.md`;
- `docs/DEVELOPMENT_TURNS.md`;
- `docs/PROJECT_OVERVIEW.md`;
- this document.

The dependency intent matched the report: Next.js and `eslint-config-next` 16.2.11, Cloudflare Vite plugin 1.47.0, and Wrangler 4.114.0. The lockfile changes are explained by those manifest changes, including the normal `workerd` platform optional packages and Miniflare Sharp 0.35.2 subtree. There is no forced audit fix, canary, RC, prerelease, Sharp override, patch-package, or unrelated application/content/UI change.

The closure adds only hosting/canonical/build/runtime-test surfaces required by this mission. Content, taxonomy, generated registry semantics, application UI/CSS/components, source links, review evidence, and editorial decisions remain unchanged.

## Existing Site identity

The existing Site was re-fetched through the authenticated read-only management path:

| Check | Result |
|---|---|
| unique exact match | true |
| title `LLM Reliability Observatory` | true |
| slug `llm-reliability-observatory` | true |
| current URL `https://llm-reliability-observatory.thankyoukass.chatgpt.site` | true |
| status active | true |
| latest version 2 | true |
| access mode custom | true |
| owner-inclusive allowed user count 1 | true |
| non-owner user count 0 | true |
| workspace / tenant / resolved group count 0 | true |

No Site mutation was used to obtain this evidence.

## Binding, canonical, and fail-closed contracts

- `.openai/hosting.json` tracks only the exact nonempty `project_id`; D1/R2 are unused and omitted.
- Source and artifact manifests must be equal.
- Manifest validation rejects missing or empty identity, invalid JSON, unexpected fields, and credential/secret-like fields without logging the identity value.
- Production build validation runs before bundling and rejects a missing source manifest. The previous null/unbound artifact path is removed.
- `.env.production` is tracked and is the single production canonical authority.
- `NEXT_PUBLIC_SITE_URL` remains overridable by process/local environment; `.env.local` stays ignored.
- `src/lib/site-url.ts` validates a credential-free HTTPS origin and is shared by metadata, robots, and sitemap.
- A clean clone requires no untracked file or process-level canonical value.
- The artifact canonical, robots sitemap reference, and sitemap URLs resolve to the exact current Sites URL and contain no `example.com`.

## Dependency state and Sharp disposition

Fresh registry and dependency measurements on 2026-07-25:

- `npm view next version`: 16.2.11.
- `npm view next@latest version`: 16.2.11.
- Next.js resolves optional Sharp 0.34.5.
- Miniflare resolves Sharp 0.35.2.
- `npm audit --json`: 2 high, 0 critical, 2 total.
- Both reported package findings are the same path: Next.js -> Sharp `<0.35.0`.
- Advisory: GHSA-f88m-g3jw-g9cj, npm advisory source 1124066.

There is no supported stable Next.js release with the required Sharp fix at this measurement point. `npm audit fix --force`, a prerelease framework, and a Sharp-only override are rejected.

The current branch classifies this advisory as `DEBT_NONBLOCKING` only for the exact LRO artifact and later revisions that retain the same runtime/image contract:

- application/build source imports Sharp 0 times;
- `next/image` application imports 0;
- `ImageResponse` uses 0;
- upload, remote-image fetch, user image decode, GIF/TIFF/VIPS processing endpoints 0;
- the unused Vinext optimizer implementation was removed from the Worker entry;
- `/_vinext/image` is explicitly blocked at the public Worker boundary and artifact-tested as 404;
- the production Worker artifact contains no Sharp/libvips/native image binary;
- build inputs are tracked, reviewed repository inputs; content compilation performs no external image fetch.

The exception does not claim that Sharp 0.34.5 is patched. It separates package inventory from exploitability of this exact artifact.

Exception boundary:

- scope: the exact `codex/lro-turn5c-security-refresh` artifact and later revisions preserving the same runtime/image contract;
- expires: 2026-08-08;
- public release authority: none;
- propagation to other repositories: prohibited.

Recheck triggers:

- a patched stable Next.js release;
- `next/image` or `ImageResponse` introduction;
- image optimizer route introduction;
- upload, remote image fetch, or user image decode introduction;
- Sharp/libvips/native image code appearing in the artifact;
- deployment/runtime architecture change;
- expiry on 2026-08-08.

Any trigger or failed reachability condition immediately returns the advisory to `BLOCK_SAFETY`.

## Gate contract correction

| rule | previous | replacement | reason | affected consumers | migration | rollback |
|---|---|---|---|---|---|---|
| dependency security acceptance | raw `npm audit --audit-level=low` count 0 was the only accepted result | audit 0, or a single exact advisory with proven non-reachability, artifact non-inclusion, expiry, and recheck triggers | separate package inventory signal from runtime exploitability | Turn 5C, Turn 6 local candidate, release preflight | register only the Sharp exception above; no other advisory is automatically allowed | update to patched stable Next.js, or revoke the exception immediately when reachability appears |

`npm audit` remains red and must be reported as red. The exception permits Turn 6 local candidate development; it does not permit public release.

## Validation evidence

Environment: Node 24.13.0, npm 11.6.2.

| Check | Result |
|---|---|
| `npm ci --include=optional` | pass; 537 packages installed; Windows Workerd optional binary restored |
| `npm ls --depth=0` | exit 0; intended top-level versions; known optional WASM extraneous label remains |
| content compile twice | 3 public cases, 1 blocked candidate, 0 public articles; digest `4ea9f26ba88d`; second run unchanged |
| registry SHA-256 twice | `826c9e9b190bcf3e0fcb4ba1e3f82fd4647213c698eb2369b42c59f74cab4da3` |
| editorial lint / generic lint / typecheck | pass / pass / pass |
| source tests | 25 pass, 0 fail |
| review images | 26 pass, 0 fail |
| Vinext production build | pass with no process-level `NEXT_PUBLIC_SITE_URL` and no `.env.local` |
| Worker artifact tests | 5 pass, 0 fail |
| public / blocked content routes | 7 return 200 / 8 return 404 |
| source links / real advertising | 6 safe external links / 0 real ad code |
| image optimizer public route | 404 |
| hosting binding | source present, artifact present, exact equality, nonempty identity, unexpected/secret fields 0 |
| dependency audit | exit 1; high 2, critical 0; only Next.js/Sharp advisory path |

The repository-local validation is source/build evidence. It does not change or revalidate a deployed Sites version.

## Residual ownership

| Residual | Purpose | Effect | Requirements | State | Owner | Next move |
|---|---|---|---|---|---|---|
| Supervisor acceptance and main integration decision | decide whether the remote branch may enter canonical source | may change GitHub main only under new authority | exact remote commit, branch parity 0/0, review of exception and protected boundaries | owner/supervisor gate | Supervisor / project owner | inspect the pushed exact commit; issue separate integration authority if accepted |
| Turn 6 local candidate | build the public-editorial-release candidate without changing live access | prepares a reviewable local artifact only | this branch accepted; runtime/image contract retained; exception unexpired | enabled after branch acceptance | Implementation AI | begin locally only; keep public release closed |
| Sharp stable remediation | remove the exception | restores audit 0 on supported stable dependencies | patched stable Next.js and full revalidation | upstream pending | Implementation AI | recheck on release or trigger |
| Turn 6 public release | decide whether owner-only operation becomes public | changes exposure and live release authority | explicit owner decision, fresh exact-artifact/access evidence, valid security state | closed owner gate | Project owner/editor | keep access owner-only until separately authorized |

Paid reports, individual contracts, audit services, payments, and membership remain outside the product lane. Advertising remains a separate post-public-MVP gate.
