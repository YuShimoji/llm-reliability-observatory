import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "About",
  description: "LLM Reliability Observatoryの目的とMVP1の公開範囲。"
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <Breadcrumb items={[{ label: "About" }]} />
      <h1 className="mt-8 text-3xl font-semibold tracking-normal text-ink">About</h1>
      <div className="mt-6 space-y-5 text-base leading-8 text-smoke">
        <p>
          LLM Reliability Observatoryは、生成AIやLLMの出力に関する事故・失敗・誤案内を、
          公開できる形に編集して記録するための静的ケースブックです。
        </p>
        <p>
          MVP1では、事例投稿やユーザー登録は扱いません。人間が確認し、公開可能と判断した本文だけを
          `content` 配下のMDXとして追加する前提です。
        </p>
      </div>
    </div>
  );
}
