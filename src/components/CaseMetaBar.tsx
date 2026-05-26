import { SeverityBadge } from "@/components/SeverityBadge";
import { VerificationBadge } from "@/components/VerificationBadge";
import type { CaseRecord } from "@/types/case";

const labels: Array<[string, keyof CaseRecord]> = [
  ["Vendor", "model_vendor"],
  ["Product", "model_product"],
  ["Version", "model_version"],
  ["Surface", "surface"],
  ["Date", "date"]
];

export function CaseMetaBar({ caseItem }: { caseItem: CaseRecord }) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-y border-ink/10 py-3">
      {labels.map(([label, key]) => (
        <span key={key} className="rounded bg-white/70 px-3 py-1.5 text-xs text-smoke">
          <span className="font-semibold text-ink">{label}:</span> {String(caseItem[key])}
        </span>
      ))}
      <SeverityBadge severity={caseItem.severity} />
      <VerificationBadge status={caseItem.verification_status} />
    </div>
  );
}
