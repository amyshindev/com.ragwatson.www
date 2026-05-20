"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MessageCircle, X } from "lucide-react"
import { GeminiChatPanel } from "@/components/gemini-chat-panel"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function GeminiChatWidget() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.button
            type="button"
            className="fixed inset-0 z-[58] bg-black/45 backdrop-blur-[1px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            aria-label="채팅 닫기"
          />
        ) : null}
      </AnimatePresence>

      <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        <AnimatePresence>
          {open ? (
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="maestro AI 채팅"
              initial={{ opacity: 0, y: 20, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.92 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "bottom right" }}
              className="w-[min(calc(100vw-2.5rem),26rem)] overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/95 shadow-2xl shadow-black/60 backdrop-blur-xl sm:w-[28rem]"
            >
              <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wide text-zinc-500">
                    AI Assistant
                  </p>
                  <h2 className="text-sm font-semibold text-zinc-100">
                    maestro와 대화하기
                  </h2>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-zinc-400 hover:bg-white/10 hover:text-zinc-100"
                  onClick={() => setOpen(false)}
                  aria-label="닫기"
                >
                  <X className="h-4 w-4" />
                </Button>
              </header>
              <div className="max-h-[min(70vh,32rem)] overflow-y-auto border-t border-white/5 bg-[#111114] p-2">
                <GeminiChatPanel className="max-w-none" embedded />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <Button
          type="button"
          size="icon"
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "h-14 w-14 rounded-full shadow-lg transition-transform",
            open
              ? "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
              : "bg-[#2563eb] text-white shadow-blue-500/40 hover:bg-[#1d4ed8] hover:scale-105",
          )}
          aria-label={open ? "채팅 닫기" : "AI 채팅 열기"}
          aria-expanded={open}
        >
          {open ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </Button>
      </div>
    </>
  )
}
