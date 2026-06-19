"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "/siliconvalley", label: "1. 홈" },
  { href: "/admin", label: "2. 어드민 대시보드" },
] as const

export function SvLessonAside() {
  const pathname = usePathname()

  return (
    <aside className="sticky top-24 hidden h-fit w-52 rounded-xl border border-emerald-400/20 bg-zinc-950/45 p-3 backdrop-blur md:block">
      <p className="mb-2 text-xs font-semibold tracking-wide text-emerald-200/75">
        섹션
      </p>
      <nav className="space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-md px-3 py-2 text-sm transition",
                active
                  ? "bg-white/10 text-white"
                  : "text-white/85 hover:bg-white/10 hover:text-white",
              )}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
