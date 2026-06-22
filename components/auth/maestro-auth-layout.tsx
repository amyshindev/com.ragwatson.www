"use client"

import { Music } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"
import { MaestroDarkBackdrop } from "@/components/maestro-dark-backdrop"
import {
  surfaceLink,
  surfaceMuted,
  surfacePanel,
  surfaceTitle,
} from "@/lib/theme-surface"
import { cn } from "@/lib/utils"

export const authInputClassName =
  "rounded-none border-gray-300 bg-white py-6 text-gray-900 shadow-none placeholder:text-gray-400 focus-visible:border-blue-500/50 focus-visible:ring-blue-500/20 dark:border-zinc-700 dark:bg-black/40 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus-visible:border-maestro-500/50 dark:focus-visible:ring-maestro-500/20"

export const authOAuthButtonClassName =
  "inline-flex w-full items-center justify-center gap-2 rounded-none border border-gray-300 bg-white px-4 py-6 text-sm font-medium text-gray-700 shadow-none transition-colors hover:border-gray-400 hover:bg-gray-50 hover:text-gray-900 dark:border-zinc-700 dark:bg-transparent dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-white/5 dark:hover:text-zinc-100"

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
    <div className="relative -mt-20 min-h-screen overflow-hidden bg-gray-50 text-gray-700 dark:bg-[#0a0a0a] dark:text-zinc-300">
      <div className="hidden dark:block">
        <MaestroDarkBackdrop />
      </div>

      <main className="relative flex min-h-[100dvh] items-center justify-center px-4 py-16 sm:px-6 sm:py-24">
        <div className="w-full max-w-md">
          <div className="mb-6 flex flex-col items-center text-center sm:mb-8">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900/50 sm:mb-5 sm:h-20 sm:w-20">
              <Music
                className="h-8 w-8 text-blue-600 dark:text-maestro-400 sm:h-10 sm:w-10"
                strokeWidth={1.25}
              />
            </div>
            <h1
              className={cn(
                "text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl",
                surfaceTitle,
              )}
              style={{ fontFamily: "var(--font-heading)" }}
            >
              maestro
            </h1>
          </div>

          <p className={cn("mb-5 text-center text-sm", surfaceMuted)}>{lead}</p>

          <div className={cn("p-5 sm:p-8", surfacePanel)}>
            <h2
              className={cn(
                "mb-5 text-center text-lg font-semibold sm:mb-6 sm:text-xl",
                surfaceTitle,
              )}
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {cardTitle}
            </h2>
            {children}
          </div>

          <p className={cn("mt-6 text-center text-xs", surfaceMuted)}>
            현재 베타 서비스 중입니다. 등록된 베타 계정만 이용 가능합니다.
          </p>

          <div className={cn("mt-4 flex items-center justify-center gap-2 text-xs", surfaceMuted)}>
            <Link href="/terms" className={surfaceLink}>
              이용약관
            </Link>
            <span className="text-gray-300 dark:text-zinc-700" aria-hidden>
              {" "}
              &middot;{" "}
            </span>
            <Link href="/privacy" className={surfaceLink}>
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
      <div className="h-px flex-1 bg-gray-200 dark:bg-zinc-800" />
      <span className={cn("text-sm", surfaceMuted)}>또는</span>
      <div className="h-px flex-1 bg-gray-200 dark:bg-zinc-800" />
    </div>
  )
}
