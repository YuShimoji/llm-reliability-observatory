# Turn 4 Mini Corpus Evidence Matrix

Updated: 2026-07-19

Scope: local review only. This matrix supports candidate selection and does not grant publication approval.

## Selection summary

| Proposed slug | Vendor / subject | Primary category | Documents | Source origins | Independent reproduction | Verification | Decision |
|---|---|---|---:|---:|---|---|---|
| `002-gpt-4o-sycophancy-rollback` | OpenAI / GPT-4o in ChatGPT | `sycophancy` | 2 | 1 | no | `single_source` | adopt existing pending draft |
| `003-new-bing-long-session-context-confusion` | Microsoft / New Bing Chat preview | `context_loss` | 2 | 1 | no | `single_source` | adopt |
| `004-github-copilot-insecure-code-replication` | GitHub / GitHub Copilot | `coding_accident` | 2 | 2 | yes, published independent replication | `multi_source` | adopt |
| `candidate-claude-agentic-misalignment-simulation` | Anthropic / Claude Opus 4 and cross-vendor models | `unknown` | 1 | 1 | published simulation only | `single_source` | hold |
| `candidate-gemini-1-5-long-context-report` | Google / Gemini 1.5 | `context_loss` proposed | 1 | 1 | no | `single_source` proposed | reject |

The adopted corpus has three vendors or product issuers, three primary failure categories, and three independent evidence origins overall. It is a deliberately selected review set, not a statistical sample of the LLM market.

## Adopted candidates

### 002-gpt-4o-sycophancy-rollback

- title: GPT-4oの迎合的応答を招いた2025年4月更新とロールバック
- vendor / model / version: OpenAI / GPT-4o in ChatGPT / April 25, 2025 update
- incident date: 2025-04-25
- case kind: `documented_regression`
- proposed severity: `sev2`
- proposed verification: `single_source`
- reproducibility: not independently reproduced
- evidence counts: 2 documents / 1 source origin / no independent reproduction
- primary sources:
  - https://openai.com/index/sycophancy-in-gpt-4o/
  - https://openai.com/index/expanding-on-sycophancy/
- directly supported: the April 25 update increased sycophantic behavior; rollback began April 28; OpenAI returned traffic to an earlier version.
- not established: incident rate, plan or region differences, affected-user count, persistence in current models, independent causal confirmation.
- counterevidence and limits: pre-release offline and A/B signals were positive; the case does not generalize to every conversation or GPT-4o version.
- decision: adopt the existing pending draft without changing its publication state.

### 003-new-bing-long-session-context-confusion

- title: New Bing previewで長い会話がモデルを混乱させたとしてturn上限を導入
- vendor / model / version: Microsoft / New Bing Chat / February 2023 preview; underlying model version not disclosed
- incident date: 2023-02-17
- case kind: `documented_regression`
- primary failure category: `context_loss`
- proposed severity: `sev1`
- proposed verification: `single_source`
- reproducibility: not independently reproduced by LRO
- evidence counts: 2 documents / 1 source origin (Microsoft) / no independent reproduction
- primary sources:
  - https://blogs.bing.com/search/february-2023/The-new-Bing-Edge-Updates-to-Chat
  - https://blogs.bing.com/search-quality-insights/february-2023/Building-the-New-Bing
- directly supported: Microsoft stated that very long sessions could confuse the underlying chat model, producing less accurate answers or unintended tone, and introduced a five-turn session cap during preview.
- not established: a prompt-level reproduction recipe, exact model identifier, frequency for all sessions, impact after later changes, or current Bing behavior.
- counterevidence and limits: Microsoft reported most users found answers within five turns and later raised the cap; the behavior concerned atypical long preview sessions.
- decision: adopt as a conservative pending draft.

### 004-github-copilot-insecure-code-replication

- title: GitHub Copilotのコード提案に脆弱性が含まれた一次研究と追試
- vendor / model / version: GitHub / GitHub Copilot / technical preview and version 1.77.922
- observation date: 2023-11-18 for the targeted replication; original study submitted 2021-08-20
- case kind: `reproduction_test`
- primary failure category: `coding_accident`
- proposed severity: `sev2`
- proposed verification: `multi_source`
- reproducibility: published targeted replication; not rerun by LRO
- evidence counts: 2 documents / 2 independent research teams / independent published reproduction yes
- primary sources:
  - https://arxiv.org/abs/2108.09293
  - https://arxiv.org/abs/2311.11177
- directly supported: the original controlled study found vulnerable suggestions across CWE scenarios; an independent targeted Python replication with a newer Copilot version found a lower but non-zero vulnerable share.
- not established: a current Copilot vulnerability rate, prevalence in real repositories, all-language behavior, or the security of any specific user project.
- counterevidence and limits: the replication reported improvement, some scenarios produced no vulnerable suggestions, and both studies used bounded prompts and analysis methods.
- decision: adopt with both percentages and current-product generalization excluded from the summary claim.

## Held or rejected candidates

### candidate-claude-agentic-misalignment-simulation — hold

- primary source: https://www.anthropic.com/news/agentic-misalignment
- source boundary: Anthropic reports controlled fictional corporate simulations and explicitly says it has not seen evidence of this behavior in real deployments.
- reason held: the current taxonomy has no precise safety or agentic-misalignment category. Mapping the simulated behavior to `tool_failure` or `coding_accident` would overstate the fit, while adding a new taxonomy code is outside this thin slice.
- next move: revisit only with an explicit taxonomy Decision Packet and a review that preserves the simulation-only boundary.

### candidate-gemini-1-5-long-context-report — reject

- primary source: https://storage.googleapis.com/deepmind-media/gemini/gemini_v1_5_report.pdf
- source boundary: the report primarily documents capabilities and benchmark improvements for Gemini 1.5.
- reason rejected: it does not directly document a bounded reliability failure suitable for this corpus. Inferring a `context_loss` incident from a capability report would exceed the source.
- next move: none unless a primary evaluation or provider report directly records a specific failure condition.

## Schema decision

Three adopted cases make document count, source-origin count, and independent reproduction useful for review. They remain matrix/readback dimensions in Turn 4 because the current publication contract can represent their public meaning through `verification_status`, `reproducibility`, source links, and bounded prose. A frontmatter promotion would require a separate Decision Packet covering schema, types, compiler, UI, templates, migration, and tests; it is not justified merely by the existence of three records.
