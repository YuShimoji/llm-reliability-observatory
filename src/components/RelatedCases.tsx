import React from "react";
import Link from "next/link";
import type { CaseRecord } from "@/types/case";

export function RelatedCases({
  cases,
  hrefForCase = (caseItem) => `/cases/${caseItem.slug}`,
  relationLabelForCase
}: {
  cases: CaseRecord[];
  hrefForCase?: (caseItem: CaseRecord) => string;
  relationLabelForCase?: (caseItem: CaseRecord) => string;
}) {
  return (
    <section className="border-t border-ink/10 pt-8">
      <h2 className="text-2xl font-semibold tracking-normal text-ink">関連事例</h2>
      {cases.length > 0 ? (
        <ul className="mt-4 grid gap-3">
          {cases.map((caseItem) => (
            <li key={caseItem.slug}>
              <Link
                href={hrefForCase(caseItem)}
                className="block border border-ink/10 bg-white/65 p-4 text-sm font-medium text-ink hover:border-moss/45"
              >
                <span>{caseItem.title}</span>
                {relationLabelForCase ? (
                  <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.08em] text-moss">
                    {relationLabelForCase(caseItem)}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm leading-6 text-smoke">関連する公開事例はまだありません。</p>
      )}
    </section>
  );
}
