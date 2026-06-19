import type { ReactNode } from "react"

import { SvLessonAside } from "@/components/siliconvalley/sv-lesson-aside"

type SvPageShellProps = {
  children: ReactNode
}

export function SvPageShell({ children }: SvPageShellProps) {
  return (
    <div className="relative -mt-20 min-h-screen overflow-x-hidden">
      <div
        className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/40 via-zinc-950 to-black"
        aria-hidden
      />
      <div
        className="fixed inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.85)_100%)]"
        aria-hidden
      />

      <div className="relative z-10 mt-20 w-full px-4 py-8 pb-16 text-white md:px-6">
        <div className="mx-auto flex w-full max-w-6xl gap-6">
          <SvLessonAside />
          <div className="w-full space-y-8">{children}</div>
        </div>
      </div>
    </div>
  )
}
