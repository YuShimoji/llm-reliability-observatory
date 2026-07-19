import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseDetail } from "@/components/CaseDetail";
import { getAllCases, getCaseBySlug } from "@/lib/content";
import { describeCaseRelation, getRelatedCases } from "@/lib/case-explorer";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCases().map((caseItem) => ({ slug: caseItem.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseItem = getCaseBySlug(slug);
  if (!caseItem) return { title: "Case not found" };
  return { title: caseItem.title, description: caseItem.public_summary };
}

export default async function CaseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const caseItem = getCaseBySlug(slug);
  if (!caseItem) notFound();

  const related = getRelatedCases(getAllCases(), caseItem);

  return (
    <CaseDetail
      caseItem={caseItem}
      relatedCases={related}
      relatedCaseLabelForCase={(candidate) => describeCaseRelation(caseItem, candidate)}
    />
  );
}
