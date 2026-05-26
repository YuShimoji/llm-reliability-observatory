import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Disclosure } from "@/components/Disclosure";
import { MarkdownBody } from "@/components/MarkdownBody";
import { getAllArticles, getArticleBySlug } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Article not found" };
  }

  return {
    title: article.title,
    description: article.summary
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-5 py-10">
      <Breadcrumb items={[{ href: "/articles", label: "Articles" }, { label: article.title }]} />
      <p className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-rust">
        {article.kind}
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-normal text-ink sm:text-4xl">
        {article.title}
      </h1>
      <p className="mt-6 text-lg leading-8 text-smoke">{article.summary}</p>
      <AdSlot slot="top" />
      <div className="mt-10 space-y-10">
        {article.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-2xl font-semibold tracking-normal text-ink">{section.heading}</h2>
            <div className="mt-4">
              <MarkdownBody source={section.content} />
            </div>
          </section>
        ))}
        <AdSlot slot="bottom" />
        <Disclosure value={article.disclosure} />
      </div>
      <div className="mt-10">
        <Breadcrumb items={[{ href: "/articles", label: "Articles" }, { label: article.title }]} />
      </div>
    </article>
  );
}
