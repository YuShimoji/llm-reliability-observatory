import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Removal Request",
  description: "掲載内容の修正・削除依頼に関する案内。"
};

export default function RemovalRequestPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <Breadcrumb items={[{ label: "Removal request" }]} />
      <h1 className="mt-8 text-3xl font-semibold tracking-normal text-ink">Removal request</h1>
      <div className="mt-6 space-y-5 text-base leading-8 text-smoke">
        <p>
          掲載内容に誤り、公開上の懸念、権利上の問題がある場合の連絡導線を置くためのページです。
        </p>
        <p>
          MVP1では送信フォームを実装しません。連絡先を公開する場合は、運用者が確認した方法だけを追記します。
        </p>
      </div>
    </div>
  );
}
