# Case Publication Guide

このメモは、人間が最初の公開case/articleを追加するときの作業手順です。公開本文、実在事例の要約、policy本文は人間が書きます。

## まず決めること

| 決めること | 目安 |
|---|---|
| caseかarticleか | MVPの核を確認するならcaseを先に追加する。 |
| 公開してよい情報か | 個人情報、秘密情報、長文ログ、スクリーンショット依存がない形に編集する。 |
| 検証状態 | `verification_status` を過大にしない。不確実なら `unverified_signal` のままにする。 |
| 深刻度 | 暫定なら低めに置き、根拠が固まってから上げる。 |
| disclosure | 利害関係があればfrontmatterに書く。なければ `null`。 |

## caseを1件追加する手順

1. `content/cases/001-template-case.mdx` を複製し、新しい連番slugのファイル名にする。
2. frontmatterの `title`、`slug`、`date`、分類、検証状態、概要を人間が埋める。
3. 本文の各見出しに、人間が編集済みの公開可能な内容を書く。
4. 公開してよい状態になったら `draft: false` にする。
5. `npm run lint:editorial`、`npm test`、`npm run build` を実行する。
6. `npm run build` 後に `npx next start -p 3100` で表示確認する。

## articleを1件追加する手順

1. `content/articles/001-template-article.mdx` を複製し、新しい連番slugのファイル名にする。
2. frontmatterの `title`、`slug`、`date`、`kind`、`summary`、関連リンクを人間が埋める。
3. 本文を人間が書く。
4. 公開してよい状態になったら `draft: false` にする。
5. `npm run lint:editorial`、`npm test`、`npm run build` を実行する。

## 表示確認の観点

| 確認面 | 見ること |
|---|---|
| `/cases` | 公開caseだけが出る。draftとfixtureは出ない。 |
| `/cases/[slug]` | h1が1つ、本文見出しがh2、AdSlotとDisclosureが意図どおり。 |
| `/articles` | 公開articleだけが出る。draftは出ない。 |
| `/articles/[slug]` | summary、本文、Disclosure、AdSlotが意図どおり。 |
| `/sitemap.xml` | 公開slugだけが入る。draftとfixtureは入らない。 |

## 触らないもの

MVP1では、投稿フォーム、管理画面、認証、DB、API、メール、決済、コメント、投票、ランキング、AdSense JavaScriptは追加しない。

## よくある詰まり

`next dev` はこの環境で `Starting...` のまま進まないことがある。表示確認は、当面次の順で行う。

```bash
npm run build
npx next start -p 3100
```
