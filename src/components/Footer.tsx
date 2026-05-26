import Link from "next/link";

const footerLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/removal-request", label: "Removal request" },
  { href: "/disclosures", label: "Disclosures" }
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-ink/10 bg-white/45">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-ink">LLM Reliability Observatory</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-smoke">
            静的な編集ケースブックとして、公開可能な事例だけを慎重に整理するMVPです。
          </p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-2">
          {footerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded px-3 py-2 text-sm text-smoke transition hover:bg-ink/5 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
