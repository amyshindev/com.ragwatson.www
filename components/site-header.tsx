"use client"

import { ChevronDown, Menu, Music } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
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
import { ThemeToggle } from "@/components/theme-toggle"
import { clearAuthUser, useAuthSession } from "@/lib/auth-session"
import { cn } from "@/lib/utils"

const navLinkButtonClass =
  "shrink-0 whitespace-nowrap rounded-full bg-transparent px-2.5 py-2 text-xs font-bold shadow-none hover:bg-transparent sm:px-4 sm:text-sm"

const TRANSPARENT_NAV_PATHS = [
  "/",
  "/login",
  "/signup",
  "/titanic",
  "/titanic/preview",
  "/siliconvalley",
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
  "/konceit",
] as const

function pathHasDarkSurface(pathname: string): boolean {
  return (
    pathname.startsWith("/titanic") || pathname.startsWith("/siliconvalley")
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()
  const [themeMounted, setThemeMounted] = useState(false)
  const { isLoggedIn } = useAuthSession()

  useEffect(() => setThemeMounted(true), [])

  const isDarkTheme = themeMounted && resolvedTheme === "dark"
  const useLightHeaderText = isDarkTheme || pathHasDarkSurface(pathname)
  const isHomeLanding = pathname === "/"
  const isAdminPath = pathname.startsWith("/admin")
  const isTitanicPath = pathname.startsWith("/titanic")
  const isSiliconValleyPath = pathname.startsWith("/siliconvalley")
  const isTransparentNav =
    isAdminPath ||
    isTitanicPath ||
    isSiliconValleyPath ||
    TRANSPARENT_NAV_PATHS.includes(
      pathname as (typeof TRANSPARENT_NAV_PATHS)[number],
    )
  const isAdminDashboard =
    pathname.startsWith("/admin") && pathname !== "/admin/login"

  const navLinkClass = cn(
    navLinkButtonClass,
    useLightHeaderText
      ? "text-zinc-200 hover:text-maestro-400"
      : "text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400",
  )

  const menuContentClass = cn(
    "min-w-[10rem]",
    useLightHeaderText
      ? "border-zinc-800 bg-zinc-950 text-zinc-100"
      : "border-border bg-popover text-popover-foreground",
  )

  const menuItemClass = cn(
    "cursor-pointer",
    useLightHeaderText
      ? "focus:bg-zinc-800 focus:text-maestro-300"
      : "focus:bg-accent focus:text-accent-foreground",
  )

  const menuSubTriggerClass = cn(
    "cursor-pointer [&>svg]:order-first [&>svg]:!ml-0 [&>svg]:rotate-180",
    useLightHeaderText
      ? "focus:bg-zinc-800 focus:text-maestro-300 data-[state=open]:bg-zinc-800 data-[state=open]:text-maestro-300"
      : "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
  )

  const menuSeparatorClass = useLightHeaderText ? "bg-zinc-800" : "bg-border"

  const studioButtonClass =
    "shrink-0 whitespace-nowrap rounded-none border border-blue-600/40 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 shadow-none hover:border-blue-500 hover:bg-blue-100 hover:text-blue-800 dark:border-maestro-500/45 dark:bg-maestro-950/25 dark:text-maestro-300 dark:hover:border-maestro-400/70 dark:hover:bg-maestro-950/40 dark:hover:text-maestro-200 sm:px-4 sm:text-sm"

  if (isAdminDashboard) {
    return null
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        isHomeLanding
          ? "border-transparent bg-transparent shadow-none backdrop-blur-none"
          : isTransparentNav
            ? "border-transparent bg-transparent shadow-none backdrop-blur-none"
            : "border-b border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-[#0a0a0a]",
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
                  : useLightHeaderText
                    ? "border-zinc-700 bg-zinc-900/50"
                    : "border-gray-200 bg-white dark:border-zinc-700 dark:bg-zinc-900/50",
              )}
            >
              <Music
                className={cn(
                  "h-5 w-5",
                  useLightHeaderText ? "text-maestro-400" : "text-blue-600 dark:text-blue-400",
                )}
              />
            </div>
            <span
              className={cn(
                "text-xl font-bold tracking-tight",
                useLightHeaderText ? "text-zinc-100" : "text-gray-900 dark:text-gray-100",
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
              <DropdownMenuContent align="end" className={menuContentClass}>
                <DropdownMenuItem asChild className={menuItemClass}>
                  <Link href="/titanic">타이타닉</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className={menuItemClass}>
                  <Link href="/siliconvalley">실리콘밸리</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="shrink-0">
              <SeoulWeather light={useLightHeaderText} />
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
              <DropdownMenuContent align="end" className={menuContentClass}>
                <DropdownMenuItem asChild className={menuItemClass}>
                  <Link href="/gallery">갤러리</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className={menuItemClass}>
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
            <Button asChild variant="outline" className={studioButtonClass}>
              <Link href="/studio">스튜디오로 가기</Link>
            </Button>
            <ThemeToggle />
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
                className={cn(menuContentClass, "min-w-[12rem]")}
              >
                {!isLoggedIn ? (
                  <>
                    <DropdownMenuItem asChild className={menuItemClass}>
                      <Link href="/login">로그인</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className={menuItemClass}>
                      <Link href="/signup">회원가입</Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild className={menuItemClass}>
                      <Link href="/billing">구독 관리</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className={menuItemClass}>
                      <Link href="/account">계정 설정</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className={menuSeparatorClass} />
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
              className={cn(studioButtonClass, "px-2.5 text-[11px] sm:px-3")}
            >
              <Link href="/studio">스튜디오로 가기</Link>
            </Button>

            <ThemeToggle />

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
                className={cn(menuContentClass, "min-w-[12rem]")}
              >
                {!isLoggedIn ? (
                  <>
                    <DropdownMenuItem asChild className={menuItemClass}>
                      <Link href="/login">로그인</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className={menuItemClass}>
                      <Link href="/signup">회원가입</Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild className={menuItemClass}>
                      <Link href="/billing">구독 관리</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className={menuItemClass}>
                      <Link href="/account">계정 설정</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className={menuSeparatorClass} />
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
                    useLightHeaderText
                      ? "text-zinc-200 hover:bg-white/10 hover:text-maestro-300"
                      : "text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-white/10",
                  )}
                  aria-label="전체 메뉴"
                  aria-haspopup="menu"
                >
                  <Menu className="h-5 w-5" aria-hidden />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className={cn(menuContentClass, "min-w-[13rem] p-2")}
              >
                <div className="px-1 pb-2">
                  <SeoulWeather light={useLightHeaderText} />
                </div>
                <DropdownMenuSeparator className={menuSeparatorClass} />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className={menuSubTriggerClass}>
                    Lesson
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent
                    sideOffset={8}
                    className={menuContentClass}
                  >
                    <DropdownMenuItem asChild className={menuItemClass}>
                      <Link href="/titanic">타이타닉</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className={menuItemClass}>
                      <Link href="/siliconvalley">실리콘밸리</Link>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className={menuSubTriggerClass}>
                    둘러보기
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent
                    sideOffset={8}
                    className={menuContentClass}
                  >
                    <DropdownMenuItem asChild className={menuItemClass}>
                      <Link href="/gallery">갤러리</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className={menuItemClass}>
                      <Link href="/magazine">매거진</Link>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator className={menuSeparatorClass} />
                <DropdownMenuItem asChild className={menuItemClass}>
                  <Link href="/pricing">멤버십</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className={menuItemClass}>
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
