import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  surfaceBody,
  surfaceEyebrow,
} from "@/lib/theme-surface"

const mailNav = [
  { href: "/mail/contacts", label: "주소록" },
  { href: "/automata", label: "메일 발송" },
] as const

export function MailShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6">
      <div className="flex flex-col gap-8 md:flex-row md:gap-10">
        <aside className="md:w-52 md:shrink-0">
          <p className={surfaceEyebrow}>메일관리</p>
          <nav className="mt-3 space-y-1">
            {mailNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm font-medium transition",
                  surfaceBody,
                  "hover:bg-gray-100 dark:hover:bg-white/5",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </main>
  )
}
