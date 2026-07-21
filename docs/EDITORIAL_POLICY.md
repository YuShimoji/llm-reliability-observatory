# Editorial Policy

この文書は現在の編集運用を説明するもので、法的助言や権利判断の代替ではありません。公開前の最終判断はproject ownerまたは指名された人間editorが行います。

## 掲載基準

- 観測対象、日付、product/surface、case kind、検証状態を限定して書く。
- `source_links`に実在する資料を1件以上記録し、label、URL、source type、accessed dateを保持する。
- 9つの必須見出しで、期待、実際、根拠、再現範囲、分類、反証、編集注記、出典を分離する。
- severityとverification statusは入手できた証拠を超えない。
- AI補助を使った場合は用途、開示、人間レビュー状態をfrontmatterに残す。

## 非掲載基準

- `draft`欠落または`true`、`review_status: pending`、source 0件、必須見出し欠落、空欄、`TODO`、placeholder domain、不正URLのいずれかがある。
- fixture/templateを実在caseとして転用している。
- 個人情報、秘密情報、API key風文字列、未編集の長文ログ、裏付けのない発生率・因果・一般化を含む。
- 公開意図を示したcaseがschemaまたはpublication gateを通らない。これはcontent compile失敗として扱う。

## AI補助

AIによる構成、要約、限定表現、反証候補、校正の補助を許可します。AI生成であること自体を公開禁止理由にはしません。一方で、AIはsourceの実在、人間の承認、権利判断、法的確定、独立再現の代替にはなりません。`ai_assistance.used`、`disclosure`、`human_reviewed`を記録し、`review_status: approved`になるまでは公開しません。

## 表現方針

- 提供元資料が述べた事実、観測者が見た出力、独立再現を区別する。
- 「全利用者」「常に」「原因は」など、証拠を超える強い一般化を避ける。
- vendor/modelの総合評価やランキングへ拡張しない。
- 反証、地域差、plan差、version差、時間経過による変化を明記する。

## 修正方針

公開後に誤り、source更新、範囲の過大表現を見つけた場合は、公開を維持したまま黙って書き換えず、再検証日、修正内容、verification statusを更新します。重大な懸念がある場合は非公開化し、removal/correction導線からowner判断へ渡します。
