import React from "react";

type AdSlotProps = {
  slot: "top" | "mid" | "bottom";
  eligible: boolean;
};

export function AdSlot({ slot, eligible }: AdSlotProps) {
  if (!eligible) return null;

  return (
    <div
      aria-label={`Advertisement placeholder: ${slot}`}
      className="my-8 border border-dashed border-moss/35 bg-white/55 px-4 py-5 text-center text-xs font-semibold uppercase tracking-[0.16em] text-smoke"
      data-ad-placeholder="true"
      data-ad-slot={slot}
    >
      Ad placeholder / {slot}
    </div>
  );
}
