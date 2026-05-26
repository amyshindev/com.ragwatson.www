"use client"

import { ChevronDown, Menu, Music } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SeoulWeather } from "@/components/seoul-weather"
import { clearAuthUser, useAuthSession } from "@/lib/auth-session"
import { cn } from "@/lib/utils"

const navLinkButtonClass =
  "shrink-0 whitespace-nowrap rounded-full bg-transparent px-2.5 py-2 text-xs font-bold shadow-none hover:bg-transparent sm:px-4 sm:text-sm"

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
  "/studio/library",
  "/billing",
  "/account",
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
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
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

          <div className="site-header-desktop-nav hidden min-w-0 flex-1 items-center gap-1 overflow-x-auto whitespace-nowrap [scrollbar-width:none] lg:flex lg:justify-end lg:gap-3 [&::-webkit-scrollbar]:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className={cn(navLinkClass, "gap-1")}
                  aria-haspopup="menu"
                  aria-label="Lesson 메뉴"
                >
                  Lesson
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
            <div className="shrink-0">
              <SeoulWeather light={isDarkHeader} />
            </div>
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
              <Link href="/pricing">멤버십</Link>
            </Button>
            <Button asChild variant="ghost" className={navLinkClass}>
              <Link href="/faq">FAQ</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="shrink-0 whitespace-nowrap rounded-none border-maestro-500/45 bg-maestro-950/25 px-3 py-2 text-xs font-bold text-maestro-300 shadow-none hover:border-maestro-400/70 hover:bg-maestro-950/40 hover:text-maestro-200 sm:px-4 sm:text-sm"
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

          <div className="site-header-mobile-actions flex shrink-0 items-center gap-1 lg:hidden">
            <Button
              asChild
              variant="outline"
              className="shrink-0 whitespace-nowrap rounded-none border-maestro-500/45 bg-maestro-950/25 px-2.5 py-2 text-[11px] font-bold text-maestro-300 shadow-none hover:border-maestro-400/70 hover:bg-maestro-950/40 hover:text-maestro-200"
            >
              <Link href="/studio">스튜디오로 가기</Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className={cn(navLinkClass, "px-2")}
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-9 w-9 shrink-0 rounded-full",
                    isDarkHeader
                      ? "text-zinc-200 hover:bg-white/10 hover:text-maestro-300"
                      : "text-slate-800 hover:bg-slate-100",
                  )}
                  aria-label="전체 메뉴"
                  aria-haspopup="menu"
                >
                  <Menu className="h-5 w-5" aria-hidden />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-[13rem] border-zinc-800 bg-zinc-950 p-2 text-zinc-100"
              >
                <div className="px-1 pb-2">
                  <SeoulWeather light />
                </div>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="cursor-pointer focus:bg-zinc-800 focus:text-maestro-300 data-[state=open]:bg-zinc-800 data-[state=open]:text-maestro-300 [&>svg]:order-first [&>svg]:!ml-0 [&>svg]:rotate-180">
                    Lesson
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent
                    sideOffset={8}
                    className="min-w-[10rem] border-zinc-800 bg-zinc-950 text-zinc-100"
                  >
                    <DropdownMenuItem
                      asChild
                      className="cursor-pointer focus:bg-zinc-800 focus:text-maestro-300"
                    >
                      <Link href="/titanic">타이타닉</Link>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="cursor-pointer focus:bg-zinc-800 focus:text-maestro-300 data-[state=open]:bg-zinc-800 data-[state=open]:text-maestro-300 [&>svg]:order-first [&>svg]:!ml-0 [&>svg]:rotate-180">
                    둘러보기
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent
                    sideOffset={8}
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
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer focus:bg-zinc-800 focus:text-maestro-300"
                >
                  <Link href="/pricing">멤버십</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer focus:bg-zinc-800 focus:text-maestro-300"
                >
                  <Link href="/faq">FAQ</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
