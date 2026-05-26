import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1 className="text-3xl font-semibold tracking-normal text-ink">Not found</h1>
      <p className="mt-4 text-base leading-7 text-smoke">
        指定されたページは見つかりません。公開対象外のdraftコンテンツである可能性があります。
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded border border-ink/15 bg-white/70 px-4 py-2 text-sm font-semibold text-ink hover:border-moss/45"
      >
        Homeへ戻る
      </Link>
    </div>
  );
}
