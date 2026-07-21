"use client";

import React, { useMemo, useState } from "react";
import { CaseCard } from "@/components/CaseCard";
import {
  EMPTY_CASE_FILTERS,
  filterCases,
  getCaseFilterOptions,
  type CaseFilters
} from "@/lib/case-explorer";
import type { CaseRecord } from "@/types/case";

type CaseExplorerProps = {
  cases: CaseRecord[];
  reviewMode?: boolean;
  staticResetControl?: boolean;
};

const selectClassName =
  "mt-2 w-full border border-ink/15 bg-white px-3 py-2 text-sm text-ink focus:border-moss focus:outline-none";

export function CaseExplorer({
  cases,
  reviewMode = false,
  staticResetControl = false
}: CaseExplorerProps) {
  const [filters, setFilters] = useState<CaseFilters>(EMPTY_CASE_FILTERS);
  const options = useMemo(() => getCaseFilterOptions(cases), [cases]);
  const visibleCases = useMemo(() => filterCases(cases, filters), [cases, filters]);
  const filtersActive = Object.values(filters).some(Boolean);

  function updateFilter(key: keyof CaseFilters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <section data-case-explorer="true">
      <div className="grid gap-3 border border-ink/10 bg-white/55 p-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="text-xs font-semibold uppercase tracking-[0.1em] text-smoke">
          Failure category
          <select
            className={selectClassName}
            value={filters.category}
            onChange={(event) => updateFilter("category", event.target.value)}
            data-case-filter="category"
          >
            <option value="">All categories</option>
            {options.categories.map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </label>
        <label className="text-xs font-semibold uppercase tracking-[0.1em] text-smoke">
          Vendor
          <select
            className={selectClassName}
            value={filters.vendor}
            onChange={(event) => updateFilter("vendor", event.target.value)}
            data-case-filter="vendor"
          >
            <option value="">All vendors</option>
            {options.vendors.map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </label>
        <label className="text-xs font-semibold uppercase tracking-[0.1em] text-smoke">
          Verification
          <select
            className={selectClassName}
            value={filters.verificationStatus}
            onChange={(event) => updateFilter("verificationStatus", event.target.value)}
            data-case-filter="verificationStatus"
          >
            <option value="">All verification states</option>
            {options.verificationStatuses.map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </label>
        <label className="text-xs font-semibold uppercase tracking-[0.1em] text-smoke">
          Case kind
          <select
            className={selectClassName}
            value={filters.caseKind}
            onChange={(event) => updateFilter("caseKind", event.target.value)}
            data-case-filter="caseKind"
          >
            <option value="">All case kinds</option>
            {options.caseKinds.map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-smoke">
        <p data-case-result-count="true">{visibleCases.length} of {cases.length} cases</p>
        <p>This curated collection is not a statistical sample.</p>
        {filtersActive || staticResetControl ? (
          <button
            type="button"
            className="border border-ink/15 bg-white px-3 py-1.5 text-xs font-semibold text-ink hover:border-moss"
            onClick={() => setFilters(EMPTY_CASE_FILTERS)}
            data-case-filter-reset="true"
          >
            Reset filters
          </button>
        ) : null}
      </div>

      {visibleCases.length > 0 ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2" data-case-filter-results="true">
          {visibleCases.map((caseItem) => (
            <div
              key={caseItem.slug}
              data-case-filter-item="true"
              data-category={caseItem.primary_failure_category}
              data-vendor={caseItem.model_vendor}
              data-verification-status={caseItem.verification_status}
              data-case-kind={caseItem.case_kind}
            >
              <CaseCard
                caseItem={caseItem}
                href={reviewMode ? `#case-${caseItem.slug}` : `/cases/${caseItem.slug}`}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 border border-ink/10 bg-white/65 p-5 text-sm text-smoke">
          選択した条件に一致するケースはありません。
        </div>
      )}
    </section>
  );
}
