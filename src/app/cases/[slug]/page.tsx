import { Fragment } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CaseMetaBar } from "@/components/CaseMetaBar";
import { Disclosure } from "@/components/Disclosure";
import { MarkdownBody } from "@/components/MarkdownBody";
import { RelatedCases } from "@/components/RelatedCases";
import { getAllCases, getCaseBySlug } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const orderedHeadings = [
  "状況",
  "期待していた回答",
  "実際の回答または要約",
  "誤りと判断した根拠",
  "再現条件",
  "分類根拠",
  "反証考察",
  "編集後記",
  "出典・参考リンク"
];

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCases().map((caseItem) => ({ slug: caseItem.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseItem = getCaseBySlug(slug);

  if (!caseItem) {
    return { title: "Case not found" };
  }

  return {
    title: caseItem.title,
    description: caseItem.public_summary
  };
}

export default async function CaseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const caseItem = getCaseBySlug(slug);

  if (!caseItem) {
    notFound();
  }

  const sectionByHeading = new Map(caseItem.sections.map((section) => [section.heading, section.content]));
  const related = getAllCases()
    .filter(
      (item) =>
        item.slug !== caseItem.slug &&
        item.primary_failure_category === caseItem.primary_failure_category
    )
    .slice(0, 3);

  return (
    <article className="mx-auto max-w-4xl px-5 py-10">
      <Breadcrumb items={[{ href: "/cases", label: "Cases" }, { label: caseItem.title }]} />
      <h1 className="mt-8 text-3xl font-semibold tracking-normal text-ink sm:text-4xl">
        {caseItem.title}
      </h1>
      <div className="mt-6">
        <CaseMetaBar caseItem={caseItem} />
      </div>
      <p className="mt-6 text-lg leading-8 text-smoke">{caseItem.public_summary}</p>
      <AdSlot slot="top" />

      <div className="mt-10 space-y-10">
        {orderedHeadings.map((heading) => (
          <Fragment key={heading}>
            <section>
              <h2 className="text-2xl font-semibold tracking-normal text-ink">{heading}</h2>
              <div className="mt-4">
                <MarkdownBody source={sectionByHeading.get(heading) ?? "TODO"} />
              </div>
            </section>
            {heading === "再現条件" && caseItem.body.length > 800 ? <AdSlot slot="mid" /> : null}
          </Fragment>
        ))}
        <RelatedCases cases={related} />
        <AdSlot slot="bottom" />
        <Disclosure value={caseItem.disclosure} />
      </div>

      <div className="mt-10">
        <Breadcrumb items={[{ href: "/cases", label: "Cases" }, { label: caseItem.title }]} />
      </div>
    </article>
  );
}
