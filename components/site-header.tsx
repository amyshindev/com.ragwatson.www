"use client"

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
import { cn } from "@/lib/utils"

const navLinkButtonClass =
  "rounded-full bg-transparent px-3 py-2 text-xs font-bold shadow-none hover:bg-transparent sm:px-4 sm:text-sm"

const TRANSPARENT_NAV_PATHS = [
  "/",
  "/login",
  "/signup",
  "/titanic",
  "/explore",
  "/studio",
  "/studio/analytics",
  "/studio/workspace",
  "/artists",
  "/faq",
  "/licensing",
  "/terms",
  "/privacy",
  "/library",
  "/billing",
  "/account",
  "/features",
  "/pricing",
  "/admin/gallery-register",
  "/admin/magazine-register",
  "/admin/faq-register",
] as const

export function SiteHeader() {
  const pathname = usePathname()
  const isHomeLanding = pathname === "/"
  const isTransparentNav = TRANSPARENT_NAV_PATHS.includes(
    pathname as (typeof TRANSPARENT_NAV_PATHS)[number],
  )
  const isDarkHeader = isTransparentNav

  const navLinkClass = cn(
    navLinkButtonClass,
    isDarkHeader
      ? "text-zinc-200 hover:text-cyan-400"
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
                  isDarkHeader ? "text-cyan-400" : "text-[#1d4ed8]",
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
                  aria-label="관리자 메뉴"
                >
                  관리자
                  <ChevronDown className="h-4 w-4 opacity-70" aria-hidden />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-[11rem] border-zinc-800 bg-zinc-950 text-zinc-100"
              >
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer focus:bg-zinc-800 focus:text-cyan-300"
                >
                  <Link href="/admin/gallery-register">갤러리 등록</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer focus:bg-zinc-800 focus:text-cyan-300"
                >
                  <Link href="/admin/magazine-register">매거진 등록</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer focus:bg-zinc-800 focus:text-cyan-300"
                >
                  <Link href="/admin/faq-register">FAQ 등록</Link>
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
                >
                  둘러보기
                  <ChevronDown className="h-4 w-4 opacity-70" aria-hidden />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-[10rem] border-zinc-800 bg-zinc-950 text-zinc-100"
              >
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-zinc-800 focus:text-cyan-300">
                  <Link href="/explore">갤러리</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer focus:bg-zinc-800 focus:text-cyan-300">
                  <Link href="/artists">매거진</Link>
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
            <Button asChild variant="outline" className="rounded-none border-cyan-500/45 bg-cyan-950/25 px-3 py-2 text-xs font-bold text-cyan-300 shadow-none hover:border-cyan-400/70 hover:bg-cyan-950/40 hover:text-cyan-200 sm:px-4 sm:text-sm">
              <Link href="/studio">스튜디오로 가기</Link>
            </Button>
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
                  className="cursor-pointer focus:bg-zinc-800 focus:text-cyan-300"
                >
                  <Link href="/titanic">타이타닉</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer focus:bg-zinc-800 focus:text-cyan-300"
                >
                  <Link href="/login">로그인</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer focus:bg-zinc-800 focus:text-cyan-300"
                >
                  <Link href="/signup">회원가입</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer focus:bg-zinc-800 focus:text-cyan-300"
                >
                  <Link href="/billing">구독 관리</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer focus:bg-zinc-800 focus:text-cyan-300"
                >
                  <Link href="/account">계정 설정</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem
                  variant="destructive"
                  className="cursor-pointer text-red-400/90 focus:bg-red-950/40 focus:text-red-300"
                  onSelect={() => {
                    window.alert(
                      "로그아웃은 세션 연결 후 제공됩니다.",
                    )
                  }}
                >
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
