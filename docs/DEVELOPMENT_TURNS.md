# Turn-Based Development Plan

このページは、検証可能な出口条件で開発を区切る正本です。AI補助草稿は許可しますが、一次資料、主張範囲、反証、AI補助開示、case単位の人間判断を必須とします。

## ターン一覧

| Turn | 焦点 | 現在状態 | 出口条件 | 次に開けること |
|---|---|---|---|---|
| Turn 0 | Resume baseline | 完了 | remote同期、依存復旧、lint/test/build/route/auditの再確認 | 既知の健全な基盤から変更できる |
| Turn 1 | Authority and dirty-diff integration | 完了 | 既存差分を監査・保全し、現行編集方針と境界を正本へ統合 | AI補助と人間gateを両立できる |
| Turn 2 | Publication Engine v2 | 完了 | schema、build-time registry、fail-closed公開判定、広告適格判定が必須導線で動く | case候補を安全にコンパイルできる |
| Turn 3 | First evidence-backed case review | 完了 | OpenAI caseのlocal review、人間の明示承認、source/build公開適格化、非一般化境界を記録 | 単独case gateを閉じられる |
| Turn 4 | Evidence-backed mini corpus and Observatory UI | 完了 | 3件の一次資料case、一括決定記録、filter/reset、related rules、production route/sitemap/browser証跡を検証 | owner-only hosting compatibilityへ進める |
| Turn 5 | Owner-only Sites compatibility | owner gate | ownerが公開先、domain、設定、外部状態変更の可否を決定し、専用branchで互換性を証明 | live release候補を作れる |
| Turn 6 | Public editorial MVP | 未開始 | exact deployed artifact、canonical URL、case routes、訂正・削除導線、mobile/console/rollbackがliveで成立 | 編集運用を開始できる |
| Turn 7 | Advertising eligibility probe | 未開始 | owner管理のpublisher設定とpolicy/privacy確認後、適格detailだけで技術probe | 広告導入可否を判断できる |
| Turn 8 | Recurring observation loop | 未開始 | 収集、草稿、レビュー、公開、再検証、訂正、retirementの周期と担当を定義 | 継続的な観測所運用へ移行できる |

## Turn 4 完了状態

2026-07-19のproject owner/editorによるcase単位の明示判断を、`samples/_review/turn4-publication-acceptance/editorial-decision-record.*`へ記録しました。

| Slug | 決定 | 現状態 | 根拠境界 |
|---|---|---|---|
| `002-gpt-4o-sycophancy-rollback` | approve | `draft: false` / `approved` / human true | OpenAI公式2文書、発行主体1、独立再現なし、`single_source` |
| `003-new-bing-long-session-context-confusion` | `context_loss`説明修正後approve | `draft: false` / `approved` / human true | Microsoft公式2文書、発行主体1、独立再現なし、`single_source` |
| `004-github-copilot-insecure-code-replication` | approve | `draft: false` / `approved` / human true | 独立研究2件、公開追試あり、LRO再実行なし、`multi_source` |

production registryの公開case数は3、公開article数は0です。template、fixture、legacy candidateは404で、sitemapと一覧に現れません。`publication-eligible`はsource/build上の判定であり、Sites配備やpublic URLの受入を意味しません。

Observatory UIはexact metadata filter、静的local reviewでも動作するReset、決定的related-case ruleを持ちます。関連は002と003が`case_kind: documented_regression`で相互に結ばれ、004は一致がないため0件です。意味類似や因果を推測しません。

## 次の最遠目標

次の主目標は **Turn 5 owner-only Sites compatibility** です。ただし現在のTurn 4作業にはSites操作、deploy、domain、実広告を含めません。

Turn 5を開始できる条件:

1. Turn 4が`main`へfast-forward-only統合され、local `main`と`origin/main`が0/0である。
2. ownerが対象hosting、canonical URL/domain、外部状態変更の可否を明示する。
3. 更新後の`main`から専用の`codex/` branchを作る。
4. secretをrepoへ保存しない構成とrollback条件を先に定義する。
5. compatibility証跡とactual deployment/release決定を別gateにする。

その後の条件付き最遠経路:

- Turn 6: ownerがreleaseを明示したexact artifactだけをlive受入し、URL、canonical、robots/sitemap、3 detail、訂正・削除、mobile、console、rollbackを確認する。
- Turn 7: public editorial MVPとpolicy/account readinessの後だけ、適格detailに限定した広告技術probeを行う。
- Turn 8: evidence refresh、human review、publication、correction、retirementの反復運用を定義する。

有料レポート、個別契約、監査サービス、決済、会員機能は提案・実装しません。将来の収益化は、owner承認下のCodex Sites公開と、その後の広告適格性を前提にします。

## 継続guardrail

- `content/_fixtures`、template、legacy candidateを公開しない。
- document count、source-origin count、independent reproductionを混同しない。
- local/build/browser proofをlive deployment proofとして扱わない。
- 実publisher ID、広告script、Sites設定、domain変更をowner gate前に追加しない。
- PRやmerge commitを作らず、統合が必要なlaneでは`--ff-only`を使う。
