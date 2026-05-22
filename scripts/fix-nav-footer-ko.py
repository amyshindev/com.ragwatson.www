# -*- coding: utf-8 -*-
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

(ROOT / "components/site-header.tsx").write_text(
    '''"use client"

import { ChevronDown, Music } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SeoulWeather } from "@/components/seoul-weather"
import { clearAuthUser, useAuthSession } from "@/lib/auth-session"
import { cn } from "@/lib/utils"

const navLinkButtonClass =
  "rounded-full bg-transparent px-3 py-2 text-xs font-bold shadow-none hover:bg-transparent sm:px-4 sm:text-sm"

const TRANSPARENT_NAV_PATHS = [
  "/",
  "/login",
  "/signup",
  "/titanic",
  "/gallery",
  "/studio",
  "/studio/analytics",
  "/studio/workspace",
  "/magazine",
  "/faq",
  "/licensing",
  "/terms",
  "/privacy",
  "/library",
  "/billing",
  "/account",
  "/features",
  "/pricing",
] as const

export function SiteHeader() {
  const pathname = usePathname()
  const { isLoggedIn } = useAuthSession()
  const isHomeLanding = pathname === "/"
  const isAdminPath = pathname.startsWith("/admin")
  const isTransparentNav =
    isAdminPath ||
    TRANSPARENT_NAV_PATHS.includes(
      pathname as (typeof TRANSPARENT_NAV_PATHS)[number],
    )
  const isDarkHeader = isTransparentNav

  const navLinkClass = cn(
    navLinkButtonClass,
    isDarkHeader
      ? "text-zinc-200 hover:text-maestro-400"
      : "text-slate-800 hover:text-[#2563eb]",
  )

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        isHomeLanding
          ? "border-transparent bg-transparent shadow-none backdrop-blur-none"
          : isTransparentNav
            ? "border-transparent bg-transparent shadow-none backdrop-blur-none"
            : "border-b border-white/60 bg-white/55 shadow-sm shadow-slate-900/[0.06] backdrop-blur-xl",
      )}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-2xl border shadow-sm backdrop-blur-md",
                isHomeLanding
                  ? "border-transparent bg-transparent shadow-none backdrop-blur-none"
                  : isDarkHeader
                    ? "border-zinc-700 bg-zinc-900/50"
                    : "border-white/70 bg-white/50",
              )}
            >
              <Music
                className={cn(
                  "h-5 w-5",
                  isDarkHeader ? "text-maestro-400" : "text-[#1d4ed8]",
                )}
              />
            </div>
            <span
              className={cn(
                "text-xl font-bold tracking-tight",
                isDarkHeader ? "text-zinc-100" : "text-slate-900",
              )}
              style={{ fontFamily: "var(--font-heading)" }}
            >
              maestro
            </span>
          </Link>

          <div className="flex flex-wrap items-center justify-end gap-x-2 gap-y-2 sm:gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className={cn(navLinkClass, "gap-1")}
                  aria-haspopup="menu"
                  aria-label="수업용 메뉴"
                >
                  수업용
                  <ChevronDown className="h-4 w-4 opacity-70" aria-hidden />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-[10rem] border-zinc-800 bg-zinc-950 text-zinc-100"
              >
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer focus:bg-zinc-800 focus:text-maestro-300"
                >
                  <Link href="/titanic">타이타닉</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <SeoulWeather light={isDarkHeader} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className={cn(navLinkClass, "gap-1")}
                  aria-haspopup="menu"
                  aria-label="둘러보기 메뉴"
                >
                  둘러보기
                  <ChevronDown className="h-4 w-4 opacity-70" aria-hidden />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-[10rem] border-zinc-800 bg-zinc-950 text-zinc-100"
              >
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer focus:bg-zinc-800 focus:text-maestro-300"
                >
                  <Link href="/gallery">갤러리</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer focus:bg-zinc-800 focus:text-maestro-300"
                >
                  <Link href="/magazine">매거진</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button asChild variant="ghost" className={navLinkClass}>
              <Link href="/features">기술 소개</Link>
            </Button>
            <Button asChild variant="ghost" className={navLinkClass}>
              <Link href="/pricing">멤버십</Link>
            </Button>
            <Button asChild variant="ghost" className={navLinkClass}>
              <Link href="/faq">FAQ</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-none border-maestro-500/45 bg-maestro-950/25 px-3 py-2 text-xs font-bold text-maestro-300 shadow-none hover:border-maestro-400/70 hover:bg-maestro-950/40 hover:text-maestro-200 sm:px-4 sm:text-sm"
            >
              <Link href="/studio">스튜디오로 가기</Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className={navLinkClass}
                  aria-label="계정 메뉴"
                  aria-haspopup="menu"
                >
                  계정
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-[12rem] border-zinc-800 bg-zinc-950 text-zinc-100"
              >
                {!isLoggedIn ? (
                  <>
                    <DropdownMenuItem
                      asChild
                      className="cursor-pointer focus:bg-zinc-800 focus:text-maestro-300"
                    >
                      <Link href="/login">로그인</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      asChild
                      className="cursor-pointer focus:bg-zinc-800 focus:text-maestro-300"
                    >
                      <Link href="/signup">회원가입</Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem
                      asChild
                      className="cursor-pointer focus:bg-zinc-800 focus:text-maestro-300"
                    >
                      <Link href="/billing">구독 관리</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      asChild
                      className="cursor-pointer focus:bg-zinc-800 focus:text-maestro-300"
                    >
                      <Link href="/account">계정 설정</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-zinc-800" />
                    <DropdownMenuItem
                      variant="destructive"
                      className="cursor-pointer text-red-400/90 focus:bg-red-950/40 focus:text-red-300"
                      onSelect={() => {
                        clearAuthUser()
                      }}
                    >
                      로그아웃
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
''',
    encoding="utf-8",
    newline="\n",
)

(ROOT / "components/landing/landing-site-footer.tsx").write_text(
    '''import type { SVGProps } from "react"
import Link from "next/link"
import { Music } from "lucide-react"

const footerLinkClass =
  "text-sm text-zinc-500 transition-colors hover:text-maestro-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maestro-500/40"

const socialIconClass =
  "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 text-zinc-500 transition-colors hover:border-maestro-500/40 hover:text-maestro-400"

function DiscordGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden
      {...props}
    >
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.891.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" />
    </svg>
  )
}

export function LandingSiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a] px-6 pb-12 pt-14 text-zinc-400">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="max-w-lg space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-zinc-100"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900/50">
                <Music className="h-5 w-5 text-maestro-400" strokeWidth={1.25} />
              </span>
              <span className="text-xl font-bold tracking-tight">maestro</span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-500">
              장르를 이해하는 AI가 만드는 스포티파이·숏폼 최적화 아티스틱 비주얼.
            </p>
            <p className="text-xs text-zinc-600">
              베타 서비스 운영 중 · 문의: support@maestro.example
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:gap-8 lg:max-w-md lg:items-end">
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={socialIconClass}
                aria-label="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://discord.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={socialIconClass}
                aria-label="Discord"
              >
                <DiscordGlyph />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={socialIconClass}
                aria-label="YouTube"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>

            <nav
              aria-label="법적 고지 및 사이트맵"
              className="flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-1 sm:gap-y-2 lg:justify-end"
            >
              <Link href="/licensing" className={footerLinkClass}>
                저작권 및 라이선스
              </Link>
              <span className="hidden text-zinc-700 sm:inline" aria-hidden>
                &nbsp;·&nbsp;
              </span>
              <Link href="/terms" className={footerLinkClass}>
                이용약관
              </Link>
              <span className="hidden text-zinc-700 sm:inline" aria-hidden>
                &nbsp;·&nbsp;
              </span>
              <Link href="/privacy" className={footerLinkClass}>
                개인정보처리방침
              </Link>
            </nav>
          </div>
        </div>

        <p className="mt-12 border-t border-white/5 pt-8 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} maestro. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
''',
    encoding="utf-8",
    newline="\n",
)

print("ok: site-header.tsx, landing-site-footer.tsx")
