"use client";

import { usePathname } from "next/navigation";
import { isAdAllowedPath } from "@/lib/ad-allowlist";

type AdSlotProps = {
  slot: "top" | "mid" | "bottom";
};

export function AdSlot({ slot }: AdSlotProps) {
  const pathname = usePathname();

  if (!pathname || !isAdAllowedPath(pathname)) {
    return null;
  }

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
