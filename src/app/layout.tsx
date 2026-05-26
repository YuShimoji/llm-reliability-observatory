import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LLM Reliability Observatory",
    template: "%s | LLM Reliability Observatory"
  },
  description: "生成AIとLLMの出力事故を編集済みケースブックとして整理する静的MVP。",
  applicationName: "LLM Reliability Observatory",
  openGraph: {
    title: "LLM Reliability Observatory",
    description: "生成AIとLLMの出力事故を編集済みケースブックとして整理する静的MVP。",
    siteName: "LLM Reliability Observatory",
    type: "website",
    url: siteUrl
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
