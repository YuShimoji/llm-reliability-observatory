import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CaseExplorer } from "@/components/CaseExplorer";
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
            schema、一次資料、必須セクション、review approvalを満たす事例だけを表示します。
          </p>
        </div>
        <p className="text-sm text-smoke">{cases.length} published</p>
      </div>
      {cases.length > 0 ? (
        <div className="mt-8">
          <CaseExplorer cases={cases} />
        </div>
      ) : (
        <div className="mt-8 border border-ink/10 bg-white/65 p-6 text-sm leading-7 text-smoke">
          公開基準を満たしたケースは現在0件です。下書きと未承認記録はここには表示されません。
        </div>
      )}
    </div>
  );
}
