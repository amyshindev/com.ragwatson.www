"use client"

import { Music } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#1e1432]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-xl border border-white/10">
              <Music className="h-5 w-5 text-primary" />
            </div>
            <span
              className="text-xl font-bold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              maestro
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              asChild
              variant="ghost"
              className="text-foreground hover:bg-white/10 font-medium"
            >
              <Link href="/titanic">타이타닉</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-foreground font-medium"
            >
              <Link href="/login">로그인</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4 sm:px-6">
              <Link href="/signup">회원가입</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
