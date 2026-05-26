import type { VerificationStatus } from "@/types/case";

const statusLabels: Record<VerificationStatus, string> = {
  unverified_signal: "Unverified",
  single_source: "Single source",
  multi_source: "Multi source",
  reproduced: "Reproduced",
  corrected: "Corrected"
};

export function VerificationBadge({ status }: { status: VerificationStatus }) {
  return (
    <span className="inline-flex items-center rounded border border-moss/30 bg-moss/10 px-2.5 py-1 text-xs font-semibold text-moss">
      {statusLabels[status] ?? status}
    </span>
  );
}
