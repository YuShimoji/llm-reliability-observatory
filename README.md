# LLM Reliability Observatory

MVP1 static casebook skeleton for the LLM Reliability Observatory / 生成AI信頼性観測所.

This repository intentionally starts without submissions, authentication, database, storage, mail, payments, API routes, rankings, or AdSense JavaScript. Public case and article bodies are human-authored later; generated examples belong only in `content/_fixtures`.

## Resume work

Read these files in order before changing the project:

1. `docs/HANDOFF.md` for the current implementation state, guardrails, and verification record.
2. `docs/SITES_MONETIZATION_REANALYSIS.md` for the Codex Sites feasibility decision, monetization direction, known content-contract defects, and ordered next work.
3. `docs/PUBLIC_CASE_INPUT_TEMPLATE.md` for the staged first public case and the remaining human approvals.

During review of the July 2026 handoff update, use `codex/refresh-restart-handoff` after that branch appears on `origin`. Until it is pushed, the branch exists only in the originating checkout and the remote handoff is incomplete. After merge, resume from `main`.

## Commands

```bash
npm run dev
npm run lint:editorial
npm test
npm run build
```

On the currently verified Windows environment, `next dev` has previously remained at `Starting...`. For a reliable local review, run `npm run build` and then `npx next start -p 3100`. Treat `npm run dev` as an unresolved development-loop investigation rather than the verified resume path.
