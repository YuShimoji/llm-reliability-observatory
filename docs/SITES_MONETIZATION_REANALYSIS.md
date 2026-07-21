# Codex Sites 収益化再分析

Updated: 2026-07-17

> **Historical record:** This analysis predates Publication Engine v2 and the accepted three-case corpus now on `origin/main`. Its statements that public case count is zero, content-contract hardening is unimplemented, or paid audits/reports are a recommended lane are superseded by `docs/HANDOFF.md`, `docs/DEVELOPMENT_TURNS.md`, and `docs/MONETIZATION_POLICY.md` as of 2026-07-20. Keep it for decision history only; it does not authorize deployment, commerce, contracts, or feature work.

この文書は、2026-07-15 から 2026-07-17 に行ったリポジトリ再分析と、Codex Sites を使った収益化判断を、別端末でも再開できる形で保持するための判断記録です。公開 case 本文、編集ポリシー本文、収益化ポリシー本文を代筆するものではありません。

## 結論

Codex Sites は公開・認知・信頼形成・利用状況の計測には使えますが、2026-07-17 時点の公式責任ガイドでは Sites が financial transactions を可能にすることを禁止しています。したがって、Sites 内での直接販売、payment-card data の処理、checkout、購入ボタン、決済 webhook を前提にした「Sites 自体の収益化」はできません。

収益につなげる場合は、Sites を無料の casebook / sample / lead-generation surface に限定し、商談、契約、請求、納品は Sites から分離した適法かつ利用規約に適合する経路で行います。外部 checkout への直接 link も financial transaction を enable すると解釈される可能性があるため、OpenAI の明示的な確認なしに Sites へ置きません。

- OpenAI Help — Understanding responsibilities for your ChatGPT Sites: <https://help.openai.com/en/articles/20001337-understanding-responsibilities-for-your-chatgpt-sites>
- OpenAI Help — ChatGPT Sites and data protection: <https://help.openai.com/en/articles/20001340-chatgpt-sites-complying-with-data-protection-laws>

この判断は、2026-07-15 時点の「外部 checkout link を使えばよい」という初期仮説を置き換えます。

現在のプロジェクトは revenue-ready な製品ではなく、生成 AI の出力事故を構造化して扱う静的ケースブックの骨格です。公開 case と article は各 0 件で、広告、決済、認証、DB、API、分析、問い合わせ CTA は未実装です。一方、vendor / model / version、severity、verification status、taxonomy、人間承認 gate、editorial lint は、有料レポートや LLM 利用監査へ発展できる土台です。

| 判断軸 | 現在地 | 判定 |
|---|---|---|
| 公開価値 | ケースと記事の表示面はあるが、公開コンテンツは 0 件 | 公開前 |
| 信頼性の土台 | draft / fixture 境界、検証状態、編集 lint、テストがある | 強み |
| 公開安全性 | 出典データ契約、runtime validation、リンク表示に不整合がある | 修理必須 |
| Sites 対応 | 通常の Next.js build で、Sites 用 manifest / vinext / Worker 層がない | 変換必要 |
| 収益導線 | AdSlot は placeholder のみ。決済・CTA がない。Sites の financial transaction は禁止 | Sites 外へ分離 |
| 事業可能性 | 日本語のタスク単位 LLM 失敗観測へ絞れば既存 incident DB と差別化できる | 検証価値あり |

## 守るべきプロダクトの焦点

広い意味の AI incident database には、無料で公開されている AI Incident Database と OECD AI Incidents and Hazards Monitor があります。一般的な「AI 事故一覧」だけでは差別化が弱いため、LRO は次へ絞るのが適切です。

> 日本語の実務利用で起きる LLM の出力事故を、タスク、surface、model/version、再現条件、原典、訂正状態の単位で追える観測所。

特に、存在しない機能案内、引用捏造、文脈崩壊、tool failure、AI coding accident、stale information といった現在の taxonomy は、実務上の確認負荷や手戻りへ直接つなげやすい点が強みです。

外部比較資料:

- AI Incident Database: <https://incidentdatabase.ai/>
- OECD AI Incidents and Hazards Monitor methodology: <https://oecd.ai/en/incidents-methodology>

## 現在の実装で先に直す問題

| 優先度 | 問題 | なぜ収益化前に必要か | 主な場所 |
|---|---|---|---|
| 最優先 | `source_links` の契約不一致 | 候補は `{label, url}` の複数行 YAML だが型は `string[]`、parser は flat な 1 行 frontmatter 値しか扱えない | `docs/PUBLIC_CASE_INPUT_TEMPLATE.md`, `src/types/case.ts`, `src/lib/content.ts` |
| 最優先 | runtime schema validation がない | parser 結果を unchecked cast しており、必須項目、taxonomy、URL、slug、日付、verification status の不正を build 前に止められない | `src/lib/content.ts` |
| 最優先 | `!item.draft` で公開判定している | `draft` の記載漏れも公開扱いになり得る。`draft === false` のみを公開対象にする必要がある | `src/lib/content.ts` |
| 高 | 原典リンクが UI に描画されない | 証拠サイトなのに読者が原典を確認できない | `src/app/cases/[slug]/page.tsx` |
| 高 | Markdown 表示が段落と単純 list に限定 | URL、引用、表、code を意味のある構造で表示できない | `src/components/MarkdownBody.tsx` |
| 高 | 欠落 section を `TODO` として表示する | 不完全な公開物を正常な記事に見せる | `src/app/cases/[slug]/page.tsx` |
| 高 | Methodology / Taxonomy の公開本文が TODO | 信頼性、検索価値、説明責任が成立しない | `content/methodology/index.mdx`, `content/taxonomy/index.mdx` |
| 高 | 訂正・削除の実連絡先がない | 評価対象 vendor や権利者からの訂正導線を運用できない | `src/app/removal-request/page.tsx` |
| 中 | public case の positive integration test がない | 最重要画面が最初の公開時に初めて実データで試される | `tests/content-publication.test.ts` |
| 中 | production URL が `example.com` fallback | sitemap、robots、OG の公開 URL が不正になる | `.env.example`, `src/app/layout.tsx`, `src/app/sitemap.ts` |

最初の公開 case 候補は `docs/PUBLIC_CASE_INPUT_TEMPLATE.md` に staged されていますが、実在する公式 URL、summary の人間承認、taxonomy mapping の確認が終わるまで公開してはいけません。上記の content contract 修理も、最初の `draft: false` 投入より先に行うのが安全です。

## Codex Sites への適合性

2026-07-17 時点の公式説明では、Sites は public beta で、互換プロジェクトの hosting、version 保存と deploy、共有範囲、D1 / R2、環境変数、認証経路を扱えます。built-in analytics で unique visitors と page views を確認できますが、Enterprise-owned Sites では analytics が現在利用できません。beta limits は plan / workspace 単位で変わり、高利用量の Site を公開維持できなくなる可能性があります。

- Sites documentation: <https://learn.chatgpt.com/docs/sites.md>
- Creating and managing ChatGPT Sites: <https://help.openai.com/en/articles/20001339>
- Managing ChatGPT Sites for a workspace: <https://help.openai.com/en/articles/20001338-managing-chatgpt-sites-for-your-workspace>

このリポジトリは標準の Next.js App Router 構成で、`.openai/hosting.json`、vinext / Vite、Cloudflare Worker entry point、Sites build plugin を持っていません。そのまま deploy するのではなく、既存 UI と routes を保ちながら build / hosting 層を Sites 標準構成へ変換する必要があります。

隔離コピーで行った方向性 probe では Worker build artifact の生成まで成功しました。ただし、この probe の設定、lockfile、artifact、実行記録は repository に保存されておらず、再現可能な project validation ではありません。本番相当 Worker での HTTP route 確認も未完了です。`src/lib/content.ts` が `node:fs`、`node:path`、`process.cwd()` に依存するため、専用の実装 turn で Sites plugin/version を固定し、MDX を build-time static manifest へ変換するか、Worker runtime で問題なく動くことを実証する必要があります。

最初の Sites version は次の形が安全です。

| 設定 | 初期判断 | 理由 |
|---|---|---|
| D1 | `null` | 公開 casebook は静的データから開始できる |
| R2 | `null` | upload は現在の product scope にない |
| 認証 | なし | 公開 case と sample report に不要 |
| 決済 | なし | Sites は financial transactions を enable してはならず、payment-card data も処理できない |
| 公開範囲 | 最初は限定共有 | Worker routes、SEO metadata、外部 link、秘密情報を確認してから公開する |

Custom domain は利用可能な plan / workspace では設定できますが、Enterprise workspace では launch 時点で利用できません。実アカウントの UI と admin policy で availability を確認します。AdSense や third-party script の実運用可否は公式説明から確定できず、financial transaction を実装する Stripe webhook は Sites の用途外です。長期基盤として確定する前に、保存した version と限定 deploy で次を検証します。

1. 全公開 route と 404 境界。
2. sitemap / robots / canonical / OG の実 URL。
3. public sharing と検索 index の扱い。
4. custom domain の plan / workspace availability。
5. built-in analytics の取得内容と保持方針。
6. third-party ad script の許可範囲。
7. 問い合わせなど End User Data を取得する場合の privacy 表示と削除対応。

## 推奨する収益化ラダー

広告を最初の主収益にしません。コンテンツ量と自然流入がない現状では単価以前に inventory value が不足し、評価対象 vendor と広告主の利益相反も未整理だからです。

| 段階 | 売るもの | 役割 | 開始 gate |
|---|---|---|---|
| 1 | LLM 利用監査 / workshop | 最短で支払意思を確認する | 検証済み case 5〜10 件、方法論、訂正窓口 |
| 2 | 有料 reliability report | ケース横断の傾向と実務対策を販売する | case 10〜20 件、無料 sample、利用条件 |
| 3 | 有料 digest | 継続需要と更新頻度を検証する | 無料購読と有料予約、継続編集能力 |
| 4 | Team SaaS | alert、検索、保存、比較を反復利用にする | 3 社程度の手作業 pilot で共通需要を確認 |
| 5 | API / data license | 組織の監視・評価 workflow へ統合する | 十分な corpus、schema version、出典再配布権、SLA |

支払意思を測るための価格仮説であり、市場相場や売上予測ではありません。

- LLM 利用監査 / workshop: 10万〜30万円 / 回。
- 有料 report: 個人 4,800〜9,800円、法人 5万〜15万円 / 版。
- Team pilot: 5万〜15万円 / 月。

初回の有料 report や監査は、Sites とは分離した営業・契約・請求経路で支払意思を確認します。Stripe Payment Links などを使う場合も、別の非 Sites surface で運用し、Sites から直接 transaction を可能にしません。自動で entitlement を付与する製品が必要になった場合、その commerce surface は Sites 以外の適合する hosting と、webhook、server-side validation、DB、認証を使います。

- Stripe Payment Links: <https://docs.stripe.com/payment-links/create?pricing-model=standard>
- Stripe Checkout fulfillment: <https://docs.stripe.com/checkout/fulfillment>
- Google low-value inventory guidance: <https://support.google.com/publisherpolicies/answer/11112688?hl=en>

スポンサーを扱う場合は、評価対象 vendor から編集判断を分離し、広告・提供・affiliate を明示します。オンライン販売、個人情報取得、計測を開始する前に、表示、返金・解約、利用目的、保存期間、問い合わせ方法を project owner が確定します。

## 推奨順序と判断 gate

| 順序 | 作業 | 完了条件 | 次に可能になること |
|---:|---|---|---|
| 1 | Content contract hardening | schema validation、`draft === false`、出典 object、clickable source、positive test | 公開事故を防ぎながら case を追加できる |
| 2 | 最初の 3〜5 case と Methodology | 人間承認済み本文、公式 source、反証、訂正導線 | 無償 discovery で読者と顧客が価値を体験できる |
| 3 | Sites compatibility branch | `origin` を唯一の source remote とし、既存 Next.js の rollback を保ったまま Worker build と HTTP route、metadata、限定共有を確認 | Sites の production go/no-go を判断できる |
| 4 | 5〜10 case と Sites 外の有料 pilot | Sites は無料 sample に限定し、別経路で10社程度へ仮説確認して監査 1 件または report 予約 5 件を得る | commerce hosting や SaaS 投資の判断材料ができる |
| 5 | 反復部分だけ product 化 | 2 社以上の更新または共通 workflow を確認 | D1 / auth / billing を追加する根拠ができる |

選択収集した case には母数がないため、当面は vendor 別「失敗率」やランキングを販売しません。「収録ケース内の傾向」と明示し、比較指標は sampling plan ができてから導入します。

## 別端末での再開手順

この handoff を review 中は、branch が `origin` に push 済みの場合だけ次の手順を使います。`git branch -r` に `origin/codex/refresh-restart-handoff` がなければ remote handoff は未完了なので、元の端末での push 完了を確認します。

```powershell
git clone https://github.com/YuShimoji/llm-reliability-observatory.git
cd llm-reliability-observatory
git fetch origin
git switch codex/refresh-restart-handoff
npm install
npm run lint:editorial
npm test
npm run build
```

branch が `main` へ merge 済みなら、`git switch main` と `git pull --ff-only origin main` を使います。

再開時の読書順:

1. `docs/HANDOFF.md` — 現在地、守る境界、直近の検証。
2. この文書 — Sites と収益化に関する判断、未確定事項、優先順位。
3. `docs/PUBLIC_CASE_INPUT_TEMPLATE.md` — 最初の公開 case 候補と人間承認待ち。
4. `docs/CASE_PUBLICATION_GUIDE.md` — 公開手順。
5. `docs/DEVELOPMENT_TURNS.md` — turn 単位の作業地図。

次の実装 turn は、原則として Content contract hardening から開始します。依存追加、Sites build 層への変換、認証、DB、決済、API 契約は、それぞれ scope と検証方法を決めてから着手します。

Content contract hardening で YAML/schema library を追加する場合や、`source_links` の公開 contract を変更する場合も、依存追加または content/API contract change として実装前に scope を確定します。

## 残る不確実性

- 市場需要、顧客数、流入、支払意思の実データがなく、売上予測はできません。
- Sites の custom domain は plan / workspace 依存で、Enterprise launch 時は非対応です。検索 index と third-party ad script は実 deploy と最新規約で確認が必要です。
- Sites では financial transactions を enable できないため、直接課金を product requirement にする場合は別 hosting が必要です。
- 最初の case の公式 source URL と公開文面は project owner の入力待ちです。
- Methodology、Editorial Policy、Taxonomy、Monetization Policy の最終本文は human-authored のままです。
- 事例の引用・再配布、vendor 名・商標、訂正対応、スポンサー表示、販売条件、個人情報の扱いは公開・販売前に確認が必要です。
