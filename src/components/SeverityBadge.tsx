import type { CaseSeverity } from "@/types/case";

const severityLabels: Record<CaseSeverity, string> = {
  sev0: "SEV0",
  sev1: "SEV1",
  sev2: "SEV2",
  sev3: "SEV3",
  sev4: "SEV4"
};

export function SeverityBadge({ severity }: { severity: CaseSeverity }) {
  return (
    <span className="inline-flex items-center rounded border border-rust/30 bg-rust/10 px-2.5 py-1 text-xs font-semibold text-rust">
      {severityLabels[severity] ?? severity}
    </span>
  );
}
