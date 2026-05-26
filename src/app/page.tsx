import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";

const entryLinks = [
  {
    href: "/cases",
    label: "ケースを読む",
    text: "公開準備が済んだ事例だけを一覧化します。"
  },
  {
    href: "/taxonomy",
    label: "分類を見る",
    text: "事故類型、検証状態、深刻度を暫定コードで確認できます。"
  },
  {
    href: "/methodology",
    label: "編集方法を見る",
    text: "検証・反証・公開判断の書式を今後整えます。"
  }
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
      <section className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rust">
            Static casebook MVP
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-normal text-ink sm:text-5xl">
            生成AIの出力事故を、公開可能な形で観測する。
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-smoke">
            LROは、LLMのハルシネーション、引用の問題、文脈崩壊、存在しない機能案内、
            AIコーディング事故などを、編集済みケースブックとして整理するサイトです。
          </p>
        </div>
        <div className="border-l-4 border-rust bg-white/62 p-6 shadow-sm">
          <p className="text-sm font-semibold text-ink">MVP1の範囲</p>
          <p className="mt-3 text-sm leading-7 text-smoke">
            現時点では投稿、認証、DB、管理画面、ランキング、AdSense本体を持たない静的サイトです。
            実在事例の本文は、人間が後で執筆します。
          </p>
        </div>
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        {entryLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="border border-ink/10 bg-white/68 p-5 transition hover:-translate-y-0.5 hover:border-moss/45 hover:shadow-sm"
          >
            <span className="text-base font-semibold text-ink">{item.label}</span>
            <span className="mt-3 block text-sm leading-6 text-smoke">{item.text}</span>
          </Link>
        ))}
      </section>
      <AdSlot slot="top" />
    </div>
  );
}
