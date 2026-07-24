# Turn 5 Sites Compatibility

Updated: 2026-07-21

2026-07-25 reconciliation: this file remains the historical Version 1/2 deployment and access evidence. The GitHub source contract advanced on `codex/lro-turn5c-security-refresh` to track the exact binding and production canonical while rejecting unbound artifacts. That source-only change did not save, deploy, alter access, or alter Sites environment state. See `docs/TURN5C_DEPENDENCY_SECURITY_REFRESH.md`.

## Authority and source boundary

- GitHub source: `YuShimoji/llm-reliability-observatory` `main` at `db3b56391c49534d4b703d59486263fcb5b7d4e0`.
- Sites compatibility source was isolated in `llm-reliability-observatory-sites-checkout`.
- Sites title / slug: `LLM Reliability Observatory` / `llm-reliability-observatory`.
- Access requirement: owner-only custom policy, no non-owner user allowlist, workspace group, or tenant group.
- Turn 5 changed private Sites state only; GitHub `main` stayed read-only and at `0/0` parity.

## Compatibility outcome

- Vinext, Vite, a Cloudflare Worker entry point, and Sites artifact packaging were proven against the exact Turn 4 corpus.
- The imported application, Publication Engine, UI, taxonomy, source links, review evidence, and public-case bytes remained equivalent to the GitHub base.
- Content compilation stayed build-time only. Runtime application code did not acquire filesystem or working-directory dependencies.
- The final artifact retained 3 public cases, 0 public articles, 1 blocked template case, 5 excluded fixtures, the blocked legacy Gemini candidate, and inert-only ad placeholders.
- Artifact tests covered callable Worker `fetch`, hosting state, 7 public routes, 8 blocked routes, sitemap boundaries, 6 safe source links, and absence of real ad code.

## Immutable deployment evidence

| Evidence | Bootstrap | Final canonical |
|---|---|---|
| GitHub source SHA | `db3b56391c49534d4b703d59486263fcb5b7d4e0` | same |
| Sites source commit | `8058c79538fcb2d661ca87bcaa24f2ff98865415` | `12e31329714e455731fc89606754dc8c70e6c3a0` |
| Local archive SHA-256 | `213ee706360ea87aaa9c637cf04abde6b96efaf4e2d4122f77009f15c264e811` | `f8b55a5a834095e15faafcb178aaacaa00c75c2bb9da81f23cf0ad74491fe317` |
| Artifact content hash | `sha256:5dab03bcc49b5b2e5cb1565bba1600a74385a07b62520b3523685707e79dccfb` | `sha256:efd9965853632b93f23a2b5ebdf787050e7943c715ee9c4a8d7464dc8301148b` |
| Saved version | Version 1 | Version 2 |
| Deployment | owner-only, succeeded | owner-only, succeeded at `https://llm-reliability-observatory.thankyoukass.chatgpt.site` |
| Canonical | bootstrap fallback | exact Sites-issued URL via non-secret `NEXT_PUBLIC_SITE_URL` |

Version 1 remains the immutable rollback target. No rollback was executed. The exact URL is non-secret but access-controlled; its production value remains in Sites environment management. GitHub tracks the value in evidence docs only, never in `.env.example` or a bound hosting file.

## Final Turn 5 verification

- Access was mechanically re-fetched as `custom`: owner-inclusive user count 1, requested non-owner users 0, workspace groups 0, tenant groups 0, resolved allowed groups 0.
- Two consecutive compiles produced content digest `4ea9f26ba88d` and registry SHA-256 `826c9e9b190bcf3e0fcb4ba1e3f82fd4647213c698eb2369b42c59f74cab4da3`.
- Dependency tree, editorial lint, 25 source tests, 26 image checks, generic lint, audit 0, Vinext build, and 3 Worker artifact tests passed.
- The 7 public routes returned 200 and all 8 blocked routes returned 404 in Worker-artifact checks.
- Stable local preview route checks had no horizontal overflow or route console errors. The first Vite dependency-optimization reload emitted one transient React `Invalid hook call`; it did not recur after stabilization. The owner-only live URL was not opened by browser automation, so live production console behavior was not claimed.
- No credential, token, personal identity, local environment value, real ad code, or oversized unintended artifact was tracked.

## Gate separation

Turn 5 proves owner-only compatibility and private deployment. It does not approve public access, a custom domain, public editorial release, real advertising, paid services, or recurring operations. Turn 5B is the GitHub compatibility backport only; its exact treatment is recorded in `docs/TURN5B_GITHUB_BACKPORT_INVENTORY.md`.
