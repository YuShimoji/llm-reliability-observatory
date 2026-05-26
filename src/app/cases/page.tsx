import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CaseCard } from "@/components/CaseCard";
import { getAllCases } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cases",
  description: "公開済みケースの一覧。"
};

export default function CasesPage() {
  const cases = getAllCases();

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <Breadcrumb items={[{ label: "Cases" }]} />
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-normal text-ink">Cases</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-smoke">
            人間が本文を確認し、公開対象にした事例だけを表示します。
          </p>
        </div>
        <p className="text-sm text-smoke">{cases.length} published</p>
      </div>
      {cases.length > 0 ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {cases.map((caseItem) => (
            <CaseCard key={caseItem.slug} caseItem={caseItem} />
          ))}
        </div>
      ) : (
        <div className="mt-8 border border-ink/10 bg-white/65 p-6 text-sm leading-7 text-smoke">
          公開済みの事例はまだありません。`content/cases` の本文を人間が執筆し、
          `draft: false` にしたものだけがここに表示されます。
        </div>
      )}
    </div>
  );
}
