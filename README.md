# LLM Reliability Observatory

Evidence-bounded static casebook for the LLM Reliability Observatory / 生成AI信頼性観測所.

Publication Engine v2 compiles MDX through an explicit schema into a deterministic build-time registry. AI-assisted drafts are allowed, but sources, verification bounds, counterevidence, disclosure, and human approval are required before publication. The repository intentionally excludes submissions, authentication, database, storage, mail, payments, API routes, rankings, deployment, and real AdSense JavaScript.

## Resume work

Read these files in order before changing the project:

1. `CONTINUATION.md` for the 2026-07-21 local synchronization and verification report addressed to the supervising AI.
2. `docs/HANDOFF.md` for the current product state, guardrails, and owner-only gates.
3. `docs/DEVELOPMENT_TURNS.md` for the accepted Turn 4 boundary and the conditional Turn 5+ sequence.

`docs/SITES_MONETIZATION_REANALYSIS.md` is a dated 2026-07-17 historical analysis. Where it conflicts with the current handoff or monetization policy, the newer documents control.

## Commands

```bash
npm run dev
npm run content:compile
npm run lint:editorial
npm test
npm run build
npm run review:generate -- --slug=002-gpt-4o-sycophancy-rollback
npm run review:serve
```

On the verified Windows environment, `npm run dev -- --hostname 127.0.0.1 --port 3101` reached Ready in 10.7 seconds on 2026-07-21. Development and production servers share `.next`; run `npm run build` again before `npx next start` if `next dev` has run since the last build.
