# Turn 4 Editorial Decision Record

Decision date: 2026-07-19

Authority: project owner/editorによる明示承認。個人名、メールアドレス、署名は記録しません。

Scope: sourceとbuild上のpublication eligibility。Sites配備、公開URL、domain、実広告は含みません。

## Decisions

| Slug | Decision | Classification / severity / verification | Evidence and reproduction | State transition |
|---|---|---|---|---|
| `002-gpt-4o-sycophancy-rollback` | approve | `sycophancy` / `sev2` / `single_source` | OpenAI公式2文書、発行主体1、独立再現なし | draft/pending/human false → public-eligible approved/human true |
| `003-new-bing-long-session-context-confusion` | context_loss説明修正後approve | `context_loss` / `sev1` / `single_source` | Microsoft公式2文書、発行主体1、独立再現なし | draft/pending/human false → public-eligible approved/human true |
| `004-github-copilot-insecure-code-replication` | approve | `coding_accident` / `sev2` / `multi_source` | 独立研究2件、公開targeted replicationあり、LRO再実行なし | draft/pending/human false → public-eligible approved/human true |

## Applied corrections

- `context_loss`を「長い会話などで文脈利用が不安定になり、重要条件の脱落、精度低下、意図しない応答調を生じる」分類として整合しました。
- New Bing本文では、Microsoftが`context_loss`という語を使用していないこと、直接記録したのは長い会話による混乱・精度低下・意図しないtoneであることを明示しました。
- 3件のAI開示を、人間editorがsource、主張範囲、分類、severity、verification、反証、AI開示を確認した事実へ更新しました。

## Preserved limitations

- 002: 発生率、全利用者、現在モデルへの一般化を行いません。独立再現はありません。
- 003: model version非開示、短い会話や現在のBingへ一般化しません。LRO独立再現はありません。
- 004: 原研究の割合を現在版や実repositoryへ一般化しません。LRO自身は再実行していません。

編集承認はsourceの永続的な正しさ、vendor全体の評価、現在版の品質保証を意味しません。
