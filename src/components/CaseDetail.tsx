import React, { Fragment } from "react";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CaseMetaBar } from "@/components/CaseMetaBar";
import { Disclosure } from "@/components/Disclosure";
import { MarkdownBody } from "@/components/MarkdownBody";
import { RelatedCases } from "@/components/RelatedCases";
import { SourceLinks } from "@/components/SourceLinks";
import { isAdEligiblePage } from "@/lib/ad-allowlist";
import { CASE_REQUIRED_HEADINGS, type CaseRecord } from "@/types/case";

type CaseDetailProps = {
  caseItem: CaseRecord;
  relatedCases: CaseRecord[];
  reviewMode?: boolean;
  showAds?: boolean;
};

export function CaseDetail({
  caseItem,
  relatedCases,
  reviewMode = false,
  showAds = true
}: CaseDetailProps) {
  const sectionByHeading = new Map(caseItem.sections.map((section) => [section.heading, section.content]));
  const adEligible =
    showAds &&
    isAdEligiblePage(`/cases/${caseItem.slug}`, {
      published: caseItem.publication.eligible,
      hasSubstantiveContent: CASE_REQUIRED_HEADINGS.every((heading) =>
        Boolean(sectionByHeading.get(heading)?.trim())
      )
    });

  return (
    <article className="mx-auto max-w-4xl px-5 py-10" data-case-slug={caseItem.slug}>
      {reviewMode ? (
        <aside className="mb-8 border-l-4 border-rust bg-rust/10 p-5 text-sm leading-7 text-ink">
          <p className="font-semibold uppercase tracking-[0.14em] text-rust">Local review only</p>
          <p className="mt-2">
            {caseItem.review_status} / draft: {String(caseItem.draft)}。この画面は診断用であり、
            公開承認またはproduction routeを意味しません。
          </p>
        </aside>
      ) : null}
      <Breadcrumb items={[{ href: "/cases", label: "Cases" }, { label: caseItem.title }]} />
      <h1 className="mt-8 text-3xl font-semibold tracking-normal text-ink sm:text-4xl">
        {caseItem.title}
      </h1>
      <div className="mt-6">
        <CaseMetaBar caseItem={caseItem} />
      </div>
      <p className="mt-6 text-lg leading-8 text-smoke">{caseItem.public_summary}</p>
      <AdSlot slot="top" eligible={adEligible} />

      <div className="mt-10 space-y-10">
        {CASE_REQUIRED_HEADINGS.map((heading) => {
          const section = sectionByHeading.get(heading);
          if (!section) return null;
          return (
            <Fragment key={heading}>
              <section data-case-section={heading}>
                <h2 className="text-2xl font-semibold tracking-normal text-ink">{heading}</h2>
                <div className="mt-4">
                  <MarkdownBody source={section} />
                  {heading === "出典・参考リンク" ? (
                    <div className="mt-5">
                      <SourceLinks links={caseItem.source_links} />
                    </div>
                  ) : null}
                </div>
              </section>
              {heading === "再現条件" && caseItem.body.length > 800 ? (
                <AdSlot slot="mid" eligible={adEligible} />
              ) : null}
            </Fragment>
          );
        })}

        <section className="border-t border-ink/10 pt-6 text-sm leading-7 text-smoke">
          <h2 className="text-xl font-semibold tracking-normal text-ink">AI assistance</h2>
          <p className="mt-3">{caseItem.ai_assistance.disclosure}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.12em] text-rust">
            Human reviewed: {String(caseItem.ai_assistance.human_reviewed)}
          </p>
        </section>
        <RelatedCases cases={relatedCases} />
        <AdSlot slot="bottom" eligible={adEligible} />
        <Disclosure value={caseItem.disclosure} />
      </div>

      <div className="mt-10">
        <Breadcrumb items={[{ href: "/cases", label: "Cases" }, { label: caseItem.title }]} />
      </div>
    </article>
  );
}
