"use client"

import { Music } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SeoulWeather } from "@/components/seoul-weather"

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/60 bg-white/55 shadow-sm shadow-slate-900/[0.06] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/70 bg-white/50 shadow-sm backdrop-blur-md">
              <Music className="h-5 w-5 text-[#1d4ed8]" />
            </div>
            <span
              className="text-xl font-bold tracking-tight text-slate-900"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              maestro
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <SeoulWeather />
            <Button
              asChild
              variant="ghost"
              className="font-medium text-slate-700 hover:bg-white/50 hover:text-slate-900"
            >
              <Link href="/titanic">타이타닉</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-slate-200/90 bg-white/40 font-medium text-slate-800 shadow-sm backdrop-blur-sm hover:bg-white/70"
            >
              <Link href="/login">로그인</Link>
            </Button>
            <Button
              asChild
              className="rounded-full bg-[#2563eb] px-4 font-medium text-white shadow-md shadow-blue-500/25 hover:bg-[#1d4ed8] sm:px-6"
            >
              <Link href="/signup">회원가입</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
