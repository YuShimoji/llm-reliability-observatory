import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumb } from "@/components/Breadcrumb";
import { MarkdownBody } from "@/components/MarkdownBody";
import { getStaticContentPage } from "@/lib/content";
import {
  failure_categories,
  severity_levels,
  surface_options,
  task_categories,
  verification_statuses,
  type TaxonomyOption
} from "@/lib/taxonomy";

export const metadata: Metadata = {
  title: "Taxonomy",
  description: "LROの暫定分類コード。"
};

const groups: Array<{ title: string; items: TaxonomyOption[] }> = [
  { title: "Failure categories", items: failure_categories },
  { title: "Severity levels", items: severity_levels },
  { title: "Verification statuses", items: verification_statuses },
  { title: "Task categories", items: task_categories },
  { title: "Surface options", items: surface_options }
];

export default function TaxonomyPage() {
  const page = getStaticContentPage("taxonomy");

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <Breadcrumb items={[{ label: "Taxonomy" }]} />
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
        {groups.map((group) => (
          <section key={group.title}>
            <h2 className="text-2xl font-semibold tracking-normal text-ink">{group.title}</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {group.items.map((item) => (
                <div key={item.code} className="border border-ink/10 bg-white/68 p-4">
                  <p className="font-semibold text-ink">{item.label}</p>
                  <p className="mt-1 font-mono text-xs text-rust">{item.code}</p>
                  <p className="mt-3 text-sm leading-6 text-smoke">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
