import type { MetadataRoute } from "next";
import { getAllArticles, getAllCases } from "@/lib/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

const staticPaths = [
  "/",
  "/cases",
  "/articles",
  "/taxonomy",
  "/methodology",
  "/about",
  "/privacy",
  "/terms",
  "/removal-request",
  "/disclosures"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticPaths.map((pathname) => ({
    url: new URL(pathname, siteUrl).toString()
  }));
  const caseEntries = getAllCases().map((caseItem) => ({
    url: new URL(`/cases/${caseItem.slug}`, siteUrl).toString(),
    lastModified: caseItem.date
  }));
  const articleEntries = getAllArticles().map((article) => ({
    url: new URL(`/articles/${article.slug}`, siteUrl).toString(),
    lastModified: article.date
  }));

  return [...staticEntries, ...caseEntries, ...articleEntries];
}
