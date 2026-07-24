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
| Turn 5 | Owner-only Sites compatibility | 完了 | owner-only policy、隔離checkout、immutable rollback、exact canonical、artifact/route/access証跡を分離して確認 | GitHub互換backportとownerのpublic-release判断へ進める |
| Turn 5BC | Binding and dependency security closure | branch成果完了 | exact Site binding、clean-clone canonical、unbound fail-closed、stable dependency refresh、期限付きSharp例外、全gate再受入 | 監修受入後にTurn 6 local candidateへ進める |
| Turn 6 | Public editorial MVP | owner gate | exact deployed artifact、canonical URL、case routes、訂正・削除導線、mobile/console/rollbackがliveで成立 | 編集運用を開始できる |
| Turn 7 | Advertising eligibility probe | 未開始 | owner管理のpublisher設定とpolicy/privacy確認後、適格detailだけで技術probe | 広告導入可否を判断できる |
| Turn 8 | Recurring observation loop | 未開始 | 収集、草稿、レビュー、公開、再検証、訂正、retirementの周期と担当を定義 | 継続的な観測所運用へ移行できる |
| Turn 9 | Evidence freshness and correction SLO | 未開始 | freshness目標、source-link health、stale state、correction SLAを計測可能にする | 既存caseの信頼性を継続管理できる |
| Turn 10 | Corpus coverage and schema evolution | 未開始 | coverage gapを定義し、case単位承認を維持した拡張とverification次元分離を行う | 観測範囲を説明可能に拡張できる |
| Turn 11 | Release provenance and resilience | 未開始 | source SHA、artifact digest、audit、access policy、rollback、a11yをrelease manifestへ固定 | 公開変更を再現・監査・復旧できる |
| Turn 12 | Observatory governance | 未開始 | 編集、taxonomy、policy、a11y、correctionの指標と定期reviewを公開可能な形で運用 | 観測所の長期信頼性を説明できる |

## Turn 5 / 5B / 5BC 状態

Turn 5は隔離checkoutでowner-only Sites Version 2まで完了し、Version 1をrollbackとして保持しています。accessはowner-inclusive user 1、non-owner user 0、workspace/tenant/resolved group 0として機械確認済みです。これはpublic releaseの承認ではありません。

Turn 5BはGitHub base `db3b56391c49534d4b703d59486263fcb5b7d4e0`から`codex/lro-turn5-sites-compatibility`へ互換層をbackportしましたが、GitHub sourceにSite bindingがなく、canonicalがuntracked environmentに依存し、null/unbound artifactを許容したためPARTIALでした。

Turn 5BCはexact existing Siteのbinding、tracked production canonical、build前fail-closed検証を追加し、Turn 5C dependency refreshと一つのbranch成果へ統合します。3公開case、content、taxonomy、Publication Engine、UI、source links、review evidenceは変更していません。正本は`docs/TURN5_SITES_COMPATIBILITY.md`、`docs/TURN5B_GITHUB_BACKPORT_INVENTORY.md`、`docs/TURN5C_DEPENDENCY_SECURITY_REFRESH.md`です。

## Turn 5C dependency security state

2026-07-25のfresh auditでhigh 5件を検出し、Next.js 16.2.11、eslint config 16.2.11、Cloudflare Vite plugin 1.47.0、Wrangler 4.114.0へ明示更新しました。残るhigh 2件は現行stable Next.jsが解決するoptional Sharp 0.34.5の同一advisory pathです。auditはredのまま記録します。

Workerの未使用image optimizerをpublic境界で404に閉じ、Sharp import、upload/decode/remote-image route、artifact内Sharp/libvips/native binaryが0であることを検証しました。GHSA-f88m-g3jw-g9cjはexact artifactに限る`DEBT_NONBLOCKING`で、2026-08-08に失効します。runtime/image contract変更時は即時`BLOCK_SAFETY`へ戻します。これはTurn 6 local candidateを許可する技術分類であり、public release authorityではありません。

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

直近の主目標は **Turn 5BC remote branchのSupervisor acceptanceとmain統合判断** です。受入後は **Turn 6 local candidate** を開始できます。GitHub branch、owner-only deployment、source/build公開適格性のどれからもpublic releaseを推論しません。

条件付き最遠経路:

- Turn 5BC: exact remote commitを監修し、別権限がある場合だけ`main`統合を判断する。patched stable Next.js公開時は例外をaudit 0へ置換する。
- Turn 6 local: recorded exception内でpublic-editorial-release candidateをローカル実装・検証する。
- Turn 6 release: owner判断とfresh security/access evidenceが成立したexact artifactだけをlive受入し、access policy、URL、canonical、robots/sitemap、3 detail、訂正・削除、mobile、console、rollbackを確認する。
- Turn 7: public editorial MVPとpolicy/account readinessの後だけ、適格detailに限定した広告技術probeを行う。
- Turn 8: evidence refresh、human review、publication、correction、retirementの反復運用を定義する。
- Turn 9: freshness、link health、stale state、correction SLAを計測し、古いcaseを黙って残さない。
- Turn 10: coverage gapを根拠にcorpusを拡張し、document count、source-origin count、independent reproductionを別fieldへ移行する。
- Turn 11: source SHA、artifact digest、audit、access、rollback、a11yをrelease manifestで一体監査する。
- Turn 12: editorial/taxonomy/policy/a11y/correction指標を定期reviewし、長期運用の説明責任を確立する。

有料レポート、個別契約、監査サービス、決済、会員機能は提案・実装しません。将来の収益化は、owner承認下のCodex Sites公開と、その後の広告適格性を前提にします。

## 継続guardrail

- `content/_fixtures`、template、legacy candidateを公開しない。
- document count、source-origin count、independent reproductionを混同しない。
- local/build/browser proofをlive deployment proofとして扱わない。
- tracked Site identityは`.openai/hosting.json`だけに保持し、docs/log/reportへ値を転記しない。
- public access、実publisher ID、広告script、custom domainをowner gate前に追加しない。
- PRやmerge commitを作らず、統合が必要なlaneでは`--ff-only`を使う。
