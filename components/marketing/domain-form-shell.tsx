import Link from "next/link"
import type { ReactNode } from "react"

import {
  surfaceBody,
  surfaceLink,
  surfaceMuted,
  surfacePanel,
  surfaceTitle,
} from "@/lib/theme-surface"
import { cn } from "@/lib/utils"

type DomainFormShellProps = {
  title: string
  lead?: string
  backHref?: string
  backLabel?: string
  children: ReactNode
}

export function DomainFormShell({
  title,
  lead,
  backHref = "/",
  backLabel = "홈으로",
  children,
}: DomainFormShellProps) {
  return (
    <div className={cn("mx-auto max-w-2xl px-4 py-12 md:py-16", surfaceBody)}>
      <header className="mb-8">
        <h1
          className={cn("text-3xl font-semibold tracking-tight", surfaceTitle)}
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h1>
        {lead ? (
          <p className={cn("mt-4 leading-relaxed", surfaceMuted)}>{lead}</p>
        ) : null}
      </header>
      <div className={cn("p-6 md:p-8", surfacePanel)}>{children}</div>
      <Link href={backHref} className={cn("mt-8 inline-block text-sm", surfaceLink)}>
        ← {backLabel}
      </Link>
    </div>
  )
}
