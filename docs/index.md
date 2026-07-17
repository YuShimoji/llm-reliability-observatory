# Local Documentation View

このページは、リポジトリ内の Markdown 文書をブラウザでまとめて閲覧し、Chrome / Edge / DeepL 拡張などのページ翻訳で一時的に読解確認しやすくするための入口です。文書同士が重なる場合の正本順位は `Project Handoff` の `Document Authority` を参照します。

既存文書の本文、制約、用語、判断基準をここで翻訳・要約・再構成するものではありません。翻訳結果はブラウザ側の一時表示として扱い、翻訳版の恒久ファイルは作りません。

## 主要導線

- `Project Overview` で、実装済み範囲、進行中の作業、次に見るべき正本文書を確認します。
- `Codex Sites 収益化再分析` で、Sites 公開可否、収益化方向、content contract の問題、再開順序を確認します。
- `Turn-Based Development Plan` で、日付ではなく開発ターン単位の区切りと進捗を確認します。
- `Screenshot Index` で、ルート監査時のスクリーンショットと配置場所を確認します。
- 左側のツリーペインから、Overview / Specs / Runtime State / Development Notes / Artifacts を切り替えて確認します。
- 分類は閲覧用の仮置きです。意味づけの確信が低い文書は、今後 Misc または Unclassified に移して確認できます。
- ルートの `README.md` は、閲覧用 wrapper から元ファイルを読み込んで表示します。

## Windows PowerShell での起動

```powershell
python -m pip install mkdocs-material
python -m mkdocs serve -a 127.0.0.1:8000
```

起動後、ブラウザで次を開きます。

```text
http://127.0.0.1:8000/
```

## ブラウザ翻訳での確認

`http://127.0.0.1:8000/` を Chrome または Edge で開き、ブラウザ標準翻訳または DeepL 拡張のページ翻訳を有効にします。左側のツリーペインで各 Markdown を移動しながら、翻訳は一時的な読解補助として確認します。

原文の厳密確認が必要な箇所では、翻訳を解除して元の Markdown 表示に戻してください。
