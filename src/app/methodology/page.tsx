import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumb } from "@/components/Breadcrumb";
import { MarkdownBody } from "@/components/MarkdownBody";
import { getStaticContentPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Methodology",
  description: "LROの編集・検証方法の雛形。"
};

export default function MethodologyPage() {
  const page = getStaticContentPage("methodology");

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <Breadcrumb items={[{ label: "Methodology" }]} />
      <h1 className="mt-8 text-3xl font-semibold tracking-normal text-ink">{page.title}</h1>
      {page.summary ? <p className="mt-4 text-base leading-7 text-smoke">{page.summary}</p> : null}
      <AdSlot slot="top" />
      <div className="mt-8 space-y-8">
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-2xl font-semibold tracking-normal text-ink">{section.heading}</h2>
            <div className="mt-4">
              <MarkdownBody source={section.content} />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
