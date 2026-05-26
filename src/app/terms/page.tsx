import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Terms",
  description: "LLM Reliability Observatoryの利用条件。"
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <Breadcrumb items={[{ label: "Terms" }]} />
      <h1 className="mt-8 text-3xl font-semibold tracking-normal text-ink">Terms</h1>
      <div className="mt-6 space-y-5 text-base leading-8 text-smoke">
        <p>
          LROは編集済みの情報提供を目的とする静的ケースブックです。掲載内容は、個別の法務、医療、
          投資、セキュリティ助言として提供するものではありません。
        </p>
        <p>
          掲載予定の事例は、公開可能性、検証状態、反証可能性を確認したうえで人間が編集します。
        </p>
      </div>
    </div>
  );
}
