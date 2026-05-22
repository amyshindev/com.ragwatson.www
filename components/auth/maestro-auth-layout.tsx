"use client"

import { Music } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"
import { MaestroDarkBackdrop } from "@/components/maestro-dark-backdrop"

export const authInputClassName =
  "rounded-none border-zinc-700 bg-black/40 py-6 text-zinc-100 shadow-none placeholder:text-zinc-500 focus-visible:border-maestro-500/50 focus-visible:ring-maestro-500/20"

export const authOAuthButtonClassName =
  "inline-flex w-full items-center justify-center gap-2 rounded-none border border-zinc-700 bg-transparent px-4 py-6 text-sm font-medium text-zinc-300 shadow-none transition-colors hover:border-zinc-500 hover:bg-white/5 hover:text-zinc-100"

type MaestroAuthLayoutProps = {
  cardTitle: string
  lead: string
  children: ReactNode
}

export function MaestroAuthLayout({
  cardTitle,
  lead,
  children,
}: MaestroAuthLayoutProps) {
  return (
    <div className="relative -mt-20 min-h-screen overflow-hidden bg-[#0a0a0a] text-zinc-300">
      <MaestroDarkBackdrop />

      <main className="relative flex min-h-[100dvh] min-h-[100svh] items-center justify-center px-6 py-24">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900/50 shadow-sm">
              <Music className="h-10 w-10 text-maestro-400" strokeWidth={1.25} />
            </div>
            <h1
              className="text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              maestro
            </h1>
          </div>

          <p className="mb-5 text-center text-sm text-zinc-500">{lead}</p>

          <div className="border border-white/10 bg-zinc-950/60 p-8 shadow-xl shadow-black/40 backdrop-blur-xl">
            <h2
              className="mb-6 text-center text-xl font-semibold text-zinc-100"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {cardTitle}
            </h2>
            {children}
          </div>

          <p className="mt-6 text-center text-xs text-zinc-500">
            현재 베타 서비스 중입니다. 등록된 베타 계정만 이용 가능합니다.
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-zinc-500">
            <Link
              href="/terms"
              className="text-maestro-500/90 hover:text-maestro-400 hover:underline"
            >
              이용약관
            </Link>
            <span className="text-zinc-700" aria-hidden>
              {" "}
              &middot;{" "}
            </span>
            <Link
              href="/privacy"
              className="text-maestro-500/90 hover:text-maestro-400 hover:underline"
            >
              개인정보처리방침
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export function AuthDivider() {
  return (
    <div className="mb-6 flex items-center gap-4">
      <div className="h-px flex-1 bg-zinc-800" />
      <span className="text-sm text-zinc-500">또는</span>
      <div className="h-px flex-1 bg-zinc-800" />
    </div>
  )
}
