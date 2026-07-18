import React from "react";
import Link from "next/link";
import { SeverityBadge } from "@/components/SeverityBadge";
import { VerificationBadge } from "@/components/VerificationBadge";
import type { CaseRecord } from "@/types/case";

export function CaseCard({
  caseItem,
  href = `/cases/${caseItem.slug}`
}: {
  caseItem: CaseRecord;
  href?: string | null;
}) {
  return (
    <article className="border border-ink/10 bg-white/70 p-5 shadow-sm">
      <div className="flex flex-wrap gap-2">
        <SeverityBadge severity={caseItem.severity} />
        <VerificationBadge status={caseItem.verification_status} />
      </div>
      <h2 className="mt-4 text-xl font-semibold tracking-normal text-ink">
        {href ? (
          <Link href={href} className="hover:text-rust">
            {caseItem.title}
          </Link>
        ) : (
          caseItem.title
        )}
      </h2>
      <p className="mt-3 text-sm leading-6 text-smoke">{caseItem.public_summary}</p>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-moss">
        {caseItem.case_kind.replaceAll("_", " ")}
      </p>
      <p className="mt-4 text-xs text-smoke">
        {caseItem.model_vendor} / {caseItem.model_product} / {caseItem.date}
      </p>
    </article>
  );
}
