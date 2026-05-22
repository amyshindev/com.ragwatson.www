"use client"

import { cn } from "@/lib/utils"

type GlitchButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost"
}

export function GlitchButton({
  className,
  variant = "primary",
  children,
  ...props
}: GlitchButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "glitch-btn text-sm font-semibold tracking-tight transition-colors sm:text-base",
        variant === "primary" &&
          "rounded-none border border-zinc-600 bg-[#0a0a0a] px-6 py-3.5 text-zinc-100 hover:border-maestro-400/60 hover:text-white",
        variant === "ghost" &&
          "rounded-none border border-zinc-700 bg-transparent px-6 py-3.5 text-zinc-400 hover:border-zinc-500 hover:text-zinc-100",
        className,
      )}
      {...props}
    >
      <span className="glitch-btn-text relative inline-block">{children}</span>
    </button>
  )
}
