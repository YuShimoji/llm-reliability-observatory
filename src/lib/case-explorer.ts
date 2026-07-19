import type { CaseRecord } from "@/types/case";

export type CaseFilters = {
  category: string;
  vendor: string;
  verificationStatus: string;
  caseKind: string;
};

export const EMPTY_CASE_FILTERS: CaseFilters = {
  category: "",
  vendor: "",
  verificationStatus: "",
  caseKind: ""
};

export function filterCases(cases: CaseRecord[], filters: CaseFilters) {
  return cases.filter(
    (caseItem) =>
      (!filters.category || caseItem.primary_failure_category === filters.category) &&
      (!filters.vendor || caseItem.model_vendor === filters.vendor) &&
      (!filters.verificationStatus ||
        caseItem.verification_status === filters.verificationStatus) &&
      (!filters.caseKind || caseItem.case_kind === filters.caseKind)
  );
}

function uniqueSorted(values: string[]) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right, "ja"));
}

export function getCaseFilterOptions(cases: CaseRecord[]) {
  return {
    categories: uniqueSorted(cases.map((caseItem) => caseItem.primary_failure_category)),
    vendors: uniqueSorted(cases.map((caseItem) => caseItem.model_vendor)),
    verificationStatuses: uniqueSorted(cases.map((caseItem) => caseItem.verification_status)),
    caseKinds: uniqueSorted(cases.map((caseItem) => caseItem.case_kind))
  };
}

export type CaseRelationReason = "category" | "vendor" | "case_kind";

export function getCaseRelationReasons(
  currentCase: CaseRecord,
  candidate: CaseRecord
): CaseRelationReason[] {
  const reasons: CaseRelationReason[] = [];
  if (candidate.primary_failure_category === currentCase.primary_failure_category) {
    reasons.push("category");
  }
  if (candidate.model_vendor === currentCase.model_vendor) reasons.push("vendor");
  if (candidate.case_kind === currentCase.case_kind) reasons.push("case_kind");
  return reasons;
}

const relationWeights: Record<CaseRelationReason, number> = {
  category: 4,
  vendor: 2,
  case_kind: 1
};

export function getRelatedCases(cases: CaseRecord[], currentCase: CaseRecord, limit = 3) {
  return cases
    .filter((candidate) => candidate.slug !== currentCase.slug)
    .map((candidate) => {
      const reasons = getCaseRelationReasons(currentCase, candidate);
      return {
        candidate,
        score: reasons.reduce((total, reason) => total + relationWeights[reason], 0)
      };
    })
    .filter(({ score }) => score > 0)
    .sort(
      (left, right) =>
        right.score - left.score ||
        right.candidate.date.localeCompare(left.candidate.date) ||
        left.candidate.slug.localeCompare(right.candidate.slug)
    )
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export function describeCaseRelation(currentCase: CaseRecord, candidate: CaseRecord) {
  const labels: Record<CaseRelationReason, string> = {
    category: `category: ${candidate.primary_failure_category}`,
    vendor: `vendor: ${candidate.model_vendor}`,
    case_kind: `kind: ${candidate.case_kind}`
  };
  return getCaseRelationReasons(currentCase, candidate).map((reason) => labels[reason]).join(" · ");
}
