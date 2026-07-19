# Case Publication Guide

この手順はPublication Engine v2でcaseを草稿、レビュー、承認するための運用契約です。AI補助草稿を利用できますが、一次資料、限定条件、反証、AI開示、人間承認を省略できません。

## 必須metadata

- `case_kind`: `documented_regression` / `observed_output` / `reproduction_test`
- `review_status`: `pending` / `approved`
- `last_verified_at`: `YYYY-MM-DD`
- `source_links[]`: `label`, `url`, `source_type`, `accessed_at`
- `ai_assistance`: `used`, `disclosure`, `human_reviewed`
- `draft`: boolean。欠落は公開不可。

case本文には「状況」「期待していた回答」「実際の回答または要約」「誤りと判断した根拠」「再現条件」「分類根拠」「反証考察」「編集後記」「出典・参考リンク」の9見出しが必要です。

## 草稿から承認まで

1. `content/cases/001-template-case.mdx`を参照し、新しいslugのcaseを作る。fixtureの文面は使わない。
2. 実在sourceを読み、sourceが直接支える範囲だけを本文へ書く。
3. AI補助を使った場合は`ai_assistance`へ用途と未レビュー状態を記録する。
4. 草稿は`draft: true` / `review_status: pending`のままにする。
5. `npm run content:compile`と`npm run build`を実行する。
6. build後、`npm run review:generate -- --slug=<slug>`、`npm run review:serve`でlocal-only HTMLを確認する。このreview serverはproduction routeではない。
7. 人間editorがsource、限定、反証、分類、severity、AI開示を承認または差し戻す。
8. 公開判断時だけ`draft: false` / `review_status: approved` / `ai_assistance.human_reviewed: true`へ同時に変更する。
9. compiler、lint、tests、build、production route、sitemap、visual、consoleを再確認する。

## 複数caseの一括レビュー

複数のpending draftは、公開状態を変えずにlocal-onlyで比較できます。既にcase単位の判断を得たeligible caseも、決定実装後の回帰確認として同じ一括surfaceを再生成できます。

```powershell
npm run review:generate-corpus
npm run review:serve -- --root=samples/_review/turn4-mini-corpus
```

`corpus-evidence-matrix.md`、各MDX、全source、`corpus-review.html`、`corpus-readback.md`を読み、各caseへ`approve`、`revise`、`reject`のいずれかを記録します。一括レビュー画面の表示成功は承認ではありません。複数caseを同時に`approved`へ移す場合も、caseごとの判断理由を残し、3つのpublication fieldを同時に変更してから全検証を再実行します。

## Fail-closed gate

次のいずれかがあるcaseは公開されません。公開意図（`draft: false`かつ`approved`）がある場合はcompileを失敗させます。

- schema不正、draft欠落、pending
- source 0件、URL不正、`example.com`
- 必須見出し欠落または空本文
- `TODO`や空の必須metadata
- fixture内のcase

一覧、直接detail、related cases、sitemapは同じgenerated registryの`publication.eligible`だけを参照します。draft preview用production routeは作りません。

## 検証コマンド

```powershell
npm ls --depth=0
npm run content:compile
npm run lint:editorial
npm test
npm run build
npm audit --audit-level=low
```

production確認はbuild後に`.\node_modules\.bin\next.cmd start -p 3100`で行います。広告枠は公開済みでsubstantiveなcase/article detailだけが適格です。home、空一覧、policy、draft、review、404には出しません。

## 範囲外

投稿、管理画面、認証、DB、API、メール、決済、コメント、投票、ランキング、実AdSenseコード、Sitesデプロイ、公開アクセス変更、有料レポート、個別契約、監査サービス、会員機能はこの手順に含めません。
