import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { getAllArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Articles",
  description: "公開済み記事の一覧。"
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <Breadcrumb items={[{ label: "Articles" }]} />
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-normal text-ink">Articles</h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-smoke">
            解説記事は、人間が公開対象にしたMDXだけを表示します。
          </p>
        </div>
        <p className="text-sm text-smoke">{articles.length} published</p>
      </div>
      {articles.length > 0 ? (
        <div className="mt-8 grid gap-4">
          {articles.map((article) => (
            <article key={article.slug} className="border border-ink/10 bg-white/70 p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rust">
                {article.kind}
              </p>
              <h2 className="mt-3 text-xl font-semibold tracking-normal text-ink">
                <Link href={`/articles/${article.slug}`} className="hover:text-rust">
                  {article.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm leading-6 text-smoke">{article.summary}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-8 border border-ink/10 bg-white/65 p-6 text-sm leading-7 text-smoke">
          公開済みの記事はまだありません。`content/articles` の本文を人間が執筆し、
          `draft: false` にしたものだけがここに表示されます。
        </div>
      )}
    </div>
  );
}
