import Link from "next/link";

const navItems = [
  { href: "/cases", label: "Cases" },
  { href: "/articles", label: "Articles" },
  { href: "/taxonomy", label: "Taxonomy" },
  { href: "/methodology", label: "Methodology" },
  { href: "/about", label: "About" }
];

export function Header() {
  return (
    <header className="border-b border-ink/10 bg-paper/92 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="group inline-flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded border border-ink/20 bg-ink text-sm font-semibold text-paper">
            LRO
          </span>
          <span>
            <span className="block text-base font-semibold tracking-normal text-ink">
              LLM Reliability Observatory
            </span>
            <span className="block text-xs text-smoke">生成AI信頼性観測所</span>
          </span>
        </Link>
        <nav aria-label="Primary navigation" className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded border border-transparent px-3 py-2 text-sm font-medium text-smoke transition hover:border-ink/15 hover:bg-white/55 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
