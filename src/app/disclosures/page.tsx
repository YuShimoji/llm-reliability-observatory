import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Disclosures",
  description: "掲載記事と広告枠に関する開示。"
};

export default function DisclosuresPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <Breadcrumb items={[{ label: "Disclosures" }]} />
      <h1 className="mt-8 text-3xl font-semibold tracking-normal text-ink">Disclosures</h1>
      <div className="mt-6 space-y-5 text-base leading-8 text-smoke">
        <p>
          MVP1ではAdSense JavaScript本体を読み込まず、広告枠のプレースホルダだけを実装します。
        </p>
        <p>
          個別の事例や記事に利害関係の開示が必要な場合は、frontmatterの `disclosure` に人間が記録します。
        </p>
      </div>
    </div>
  );
}
