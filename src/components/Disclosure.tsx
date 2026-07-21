import React from "react";

export function Disclosure({ value }: { value: string | null }) {
  return (
    <section className="border-t border-ink/10 pt-6 text-sm leading-7 text-smoke">
      <h2 className="text-xl font-semibold tracking-normal text-ink">Disclosure</h2>
      <p className="mt-3">
        {value ?? "このケースに固有の利害関係、スポンサーシップ、アフィリエイト関係はありません。"}
      </p>
    </section>
  );
}
