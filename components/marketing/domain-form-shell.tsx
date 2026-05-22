import Link from "next/link"
import type { ReactNode } from "react"

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
    <div className="mx-auto max-w-2xl px-4 py-12 text-zinc-300 md:py-16">
      <header className="mb-8">
        <h1
          className="text-3xl font-semibold tracking-tight text-zinc-100"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h1>
        {lead ? (
          <p className="mt-4 leading-relaxed text-zinc-500">{lead}</p>
        ) : null}
      </header>
      <div className="border border-white/10 bg-zinc-950/70 p-6 shadow-xl shadow-black/20 backdrop-blur-xl md:p-8">
        {children}
      </div>
      <Link
        href={backHref}
        className="mt-8 inline-block text-sm font-medium text-maestro-500/90 hover:text-maestro-400 hover:underline"
      >
        ← {backLabel}
      </Link>
    </div>
  )
}
