import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Privacy",
  description: "LLM Reliability Observatoryのプライバシー方針。"
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <Breadcrumb items={[{ label: "Privacy" }]} />
      <h1 className="mt-8 text-3xl font-semibold tracking-normal text-ink">Privacy</h1>
      <div className="mt-6 space-y-5 text-base leading-8 text-smoke">
        <p>
          MVP1は静的サイトとして構成されており、投稿フォーム、会員登録、コメント、決済、メール送信を提供しません。
        </p>
        <p>
          将来の計測、広告、問い合わせ導線を追加する場合は、取得する情報と利用目的をこのページで更新します。
        </p>
      </div>
    </div>
  );
}
