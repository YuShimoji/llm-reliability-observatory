import React from "react";
import type { SourceLink } from "@/types/case";

export function SourceLinks({ links }: { links: SourceLink[] }) {
  return (
    <ol className="grid gap-3" data-source-links="true">
      {links.map((link) => (
        <li key={link.url} className="border border-ink/10 bg-white/70 p-4">
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ink underline decoration-rust/40 underline-offset-4 hover:text-rust"
          >
            {link.label}
          </a>
          <p className="mt-2 text-xs text-smoke">
            {link.source_type} · accessed {link.accessed_at}
          </p>
        </li>
      ))}
    </ol>
  );
}
