import Link from "next/link"

import {
  surfaceBody,
  surfaceLink,
  surfaceMuted,
  surfaceTitle,
} from "@/lib/theme-surface"
import { cn } from "@/lib/utils"

type MarketingPlaceholderProps = {
  title: string
  lead?: string
  /** 기본 `/` 스튜디오 톤 하위 페이지 등에 재사용 */
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
    <div className={cn("mx-auto max-w-2xl px-4 py-12", surfaceBody)}>
      <h1
        className={cn("text-3xl font-semibold tracking-tight", surfaceTitle)}
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h1>
      <p className={cn("mt-4 leading-relaxed", surfaceMuted)}>{lead}</p>
      <Link href={backHref} className={cn("mt-8 inline-block text-sm", surfaceLink)}>
        ← {backLabel}
      </Link>
    </div>
  )
}
