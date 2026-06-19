"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  RefreshCw,
  Search,
  Settings,
  Users,
  X,
  Zap,
} from "lucide-react"
import { useEffect, useState, type ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const MAIN_NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/siliconvalley", label: "Lesson", icon: Home },
] as const

const SECONDARY_NAV = [
  { href: "/siliconvalley", label: "Characters", icon: Users },
  { href: "/admin", label: "Integrations", icon: Zap },
] as const

const BOTTOM_NAV = [
  { href: "/admin", label: "Home", icon: LayoutDashboard },
  { href: "/siliconvalley", label: "Lesson", icon: Home },
] as const

type SvAdminShellProps = {
  children: ReactNode
  onRefresh?: () => void
  refreshing?: boolean
  lastRefreshed?: string | null
}

function NavLink({
  href,
  label,
  icon: Icon,
  active,
  onNavigate,
  className,
}: {
  href: string
  label: string
  icon: typeof LayoutDashboard
  active?: boolean
  onNavigate?: () => void
  className?: string
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "relative flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition active:scale-[0.98]",
        active
          ? "bg-indigo-500/15 text-indigo-300"
          : "text-zinc-500 hover:bg-zinc-800/80 hover:text-zinc-200",
        className,
      )}
    >
      {active && (
        <span className="absolute -left-5 top-1/2 hidden h-8 w-1 -translate-y-1/2 rounded-r-full bg-indigo-500 md:block" />
      )}
      <Icon className="h-5 w-5 shrink-0" />
      {label}
    </Link>
  )
}

export function SvAdminShell({
  children,
  onRefresh,
  refreshing,
  lastRefreshed,
}: SvAdminShellProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [menuOpen])

  return (
    <div className="fixed inset-0 z-[60] flex min-h-[100dvh] flex-col bg-[#0a0a0a] text-zinc-200 md:static md:z-auto md:min-h-screen">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 shrink-0 border-b border-zinc-800/80 bg-[#0a0a0a]/95 px-3 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur-md md:hidden">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 shadow-sm ring-1 ring-zinc-800"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5 text-zinc-400" />
          </button>
          <Link href="/admin" className="flex min-w-0 flex-1 items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-xs font-bold text-white">
              PP
            </div>
            <div className="min-w-0">
              <p
                className="truncate text-sm font-semibold text-zinc-100"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Pied Piper
              </p>
              {lastRefreshed && (
                <p className="truncate text-[10px] text-zinc-500">
                  Updated {lastRefreshed}
                </p>
              )}
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setSearchOpen((open) => !open)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 shadow-sm ring-1 ring-zinc-800"
            aria-label="Toggle search"
            aria-expanded={searchOpen}
          >
            <Search className="h-5 w-5 text-zinc-400" />
          </button>
          {onRefresh && (
            <button
              type="button"
              disabled={refreshing}
              onClick={onRefresh}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 shadow-sm ring-1 ring-zinc-800 disabled:opacity-60"
              aria-label="Refresh"
            >
              <RefreshCw
                className={cn("h-5 w-5 text-zinc-400", refreshing && "animate-spin")}
              />
            </button>
          )}
        </div>
        {searchOpen && (
          <div className="relative mt-3">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input
              placeholder="Search characters, endpoints…"
              className="h-11 rounded-2xl border-zinc-800 bg-zinc-900 pl-11 text-zinc-100 shadow-sm ring-1 ring-zinc-800 placeholder:text-zinc-500"
              autoFocus
            />
          </div>
        )}
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 flex w-[min(100vw-3rem,18rem)] flex-col border-r border-zinc-800 bg-zinc-950 px-4 pb-5 pt-[max(1rem,env(safe-area-inset-top))] shadow-2xl md:hidden">
            <div className="mb-6 flex items-center justify-between">
              <Link
                href="/admin"
                className="flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white">
                  PP
                </div>
                <span className="text-base font-semibold text-zinc-100">Pied Piper</span>
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 ring-1 ring-zinc-800"
                aria-label="Close menu"
              >
                <X className="h-5 w-5 text-zinc-400" />
              </button>
            </div>
            <nav className="space-y-1">
              {MAIN_NAV.map((item) => (
                <NavLink
                  key={item.href}
                  {...item}
                  active={pathname === item.href}
                  onNavigate={() => setMenuOpen(false)}
                />
              ))}
            </nav>
            <p className="mb-2 mt-6 px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-600">
              Modules
            </p>
            <nav className="space-y-1">
              {SECONDARY_NAV.map((item) => (
                <NavLink
                  key={item.label}
                  {...item}
                  onNavigate={() => setMenuOpen(false)}
                />
              ))}
            </nav>
            <div className="mt-auto space-y-1 border-t border-zinc-800 pt-4">
              <NavLink href="/admin" label="Settings" icon={Settings} onNavigate={() => setMenuOpen(false)} />
              <NavLink href="/" label="Exit admin" icon={LogOut} onNavigate={() => setMenuOpen(false)} />
            </div>
          </aside>
        </>
      )}

      <div className="flex min-h-0 flex-1 md:min-h-screen">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 flex-col border-r border-zinc-800/80 bg-zinc-950/95 px-5 py-8 shadow-[4px_0_24px_rgba(0,0,0,0.4)] backdrop-blur md:flex lg:w-72 lg:px-6">
          <Link href="/admin" className="mb-10 flex items-center gap-2 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-lg shadow-indigo-500/20">
              PP
            </div>
            <span
              className="text-lg font-semibold tracking-tight text-zinc-100"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Pied Piper
            </span>
          </Link>
          <nav className="space-y-1">
            {MAIN_NAV.map((item) => (
              <NavLink key={item.href} {...item} active={pathname === item.href} />
            ))}
          </nav>
          <p className="mb-2 mt-8 px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-600">
            Modules
          </p>
          <nav className="space-y-1">
            {SECONDARY_NAV.map((item) => (
              <NavLink key={item.label} {...item} />
            ))}
          </nav>
          <div className="mt-auto space-y-1 border-t border-zinc-800 pt-6">
            <NavLink href="/admin" label="Settings" icon={Settings} />
            <NavLink href="/" label="Exit admin" icon={LogOut} />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Desktop top bar */}
          <header className="sticky top-0 z-20 hidden items-center gap-4 border-b border-zinc-800/80 bg-[#0a0a0a]/90 px-6 py-4 backdrop-blur-md md:flex lg:px-8">
            <div className="relative min-w-[200px] flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                placeholder="Search characters, endpoints, intents…"
                className="h-11 rounded-full border-zinc-800 bg-zinc-900 pl-11 text-zinc-100 shadow-sm ring-1 ring-zinc-800 placeholder:text-zinc-500"
              />
            </div>
            <div className="flex items-center gap-3">
              {lastRefreshed && (
                <span className="text-xs text-zinc-500">Updated {lastRefreshed}</span>
              )}
              {onRefresh && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={refreshing}
                  onClick={onRefresh}
                  className="rounded-full border-zinc-700 bg-zinc-900 text-zinc-300 shadow-sm hover:bg-zinc-800"
                >
                  Refresh
                </Button>
              )}
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 shadow-sm ring-1 ring-zinc-800"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4 text-zinc-400" />
              </button>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-xs font-bold text-white shadow-md">
                RH
              </div>
            </div>
          </header>

          <main className="mx-auto flex-1 overflow-y-auto overscroll-y-contain px-3 py-3 pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] [-webkit-overflow-scrolling:touch] md:px-8 md:py-8 md:pb-8 lg:max-w-[1440px] lg:px-10">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-[61] border-t border-zinc-800/80 bg-zinc-950/95 px-1 pb-[max(0.25rem,env(safe-area-inset-bottom))] pt-1 backdrop-blur-md md:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-3">
          {BOTTOM_NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 text-[10px] font-medium transition active:scale-95",
                  active ? "text-indigo-400" : "text-zinc-500",
                )}
              >
                <Icon className={cn("h-5 w-5", active && "stroke-[2.5]")} />
                {label}
              </Link>
            )
          })}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-xl py-1.5 text-[10px] font-medium text-zinc-500 active:scale-95"
          >
            <Menu className="h-5 w-5" />
            Menu
          </button>
        </div>
      </nav>
    </div>
  )
}
