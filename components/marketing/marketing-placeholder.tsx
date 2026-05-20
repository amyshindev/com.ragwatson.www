import Link from "next/link"

type MarketingPlaceholderProps = {
  title: string
  lead?: string
  /** 기본 `/` — 스튜디오 하위 페이지 등에서 허브로 돌아갈 때 사용 */
  backHref?: string
  backLabel?: string
}

export function MarketingPlaceholder({
  title,
  lead = "콘텐츠를 준비 중입니다.",
  backHref = "/",
  backLabel = "홈으로",
}: MarketingPlaceholderProps) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 text-zinc-300">
      <h1
        className="text-3xl font-semibold tracking-tight text-zinc-100"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h1>
      <p className="mt-4 leading-relaxed text-zinc-500">{lead}</p>
      <Link
        href={backHref}
        className="mt-8 inline-block text-sm font-medium text-cyan-500/90 hover:text-cyan-400 hover:underline"
      >
        ← {backLabel}
      </Link>
    </div>
  )
}
