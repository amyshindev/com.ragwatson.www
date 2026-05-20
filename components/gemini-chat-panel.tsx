"use client"

import { useRef, useState } from "react"
import { Clock, Mic, Plus, RotateCcw, SlidersHorizontal, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

type Role = "user" | "assistant"

type GeminiChatPanelProps = {
  className?: string
  /** Floating widget: tighter layout, taller message history */
  embedded?: boolean
}

export function GeminiChatPanel({
  className,
  embedded = false,
}: GeminiChatPanelProps) {
  const [input, setInput] = useState("")
  const [model, setModel] = useState("fast")
  const [messages, setMessages] = useState<{ role: Role; text: string }[]>([])
  const [sending, setSending] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function send() {
    const text = input.trim()
    if (!text || sending) return
    setInput("")
    setSending(true)
    setMessages((m) => [...m, { role: "user", text }])

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      })
      const raw = await res.text()
      let data: { reply?: string; error?: string } = {}
      if (raw) {
        try {
          data = JSON.parse(raw) as { reply?: string; error?: string }
        } catch {
          throw new Error(
            raw.slice(0, 120) || `응답을 읽을 수 없습니다. (${res.status})`,
          )
        }
      } else if (!res.ok) {
        throw new Error(`서버 오류 (${res.status})`)
      }
      if (!res.ok) {
        throw new Error(data.error ?? `채팅 요청에 실패했습니다. (${res.status})`)
      }
      setMessages((m) => [
        ...m,
        { role: "assistant", text: data.reply ?? "" },
      ])
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text:
            err instanceof Error
              ? err.message
              : "채팅 요청에 실패했습니다.",
        },
      ])
    } finally {
      setSending(false)
    }
  }

  function reset() {
    setMessages([])
    setInput("")
  }

  return (
    <div className={cn("w-full max-w-2xl", className)}>
      {messages.length > 0 && (
        <div
          className={cn(
            "mb-4 space-y-2 overflow-y-auto rounded-[24px] border border-white/60 bg-white/40 px-4 py-3 text-left shadow-inner shadow-slate-900/5 backdrop-blur-xl",
            embedded ? "max-h-36" : "max-h-44",
          )}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "rounded-2xl px-3 py-2 text-sm leading-relaxed",
                msg.role === "user"
                  ? "ml-4 border border-sky-200/80 bg-sky-100/90 text-slate-900"
                  : "mr-4 border border-white/70 bg-white/80 text-slate-800 shadow-sm",
              )}
            >
              {msg.text}
            </div>
          ))}
        </div>
      )}

      <div className="relative pt-2">
        <div className="absolute left-5 top-0 z-20 -translate-y-full pb-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-slate-600 hover:bg-white/60"
                onClick={reset}
                aria-label="다시 실행"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              sideOffset={6}
              className="border-0 bg-slate-900 text-xs text-white"
            >
              다시 실행
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="rounded-[28px] border border-white/70 bg-white/50 shadow-xl shadow-slate-900/10 ring-1 ring-white/40 backdrop-blur-xl">
          <div className="relative px-4 pt-4 sm:px-5 sm:pt-5">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  void send()
                }
              }}
              disabled={sending}
              placeholder="지금 기분을 설명해 보세요…"
              className={cn(
                "resize-none border-0 bg-transparent pr-14 text-[15px] leading-relaxed text-slate-900 shadow-none placeholder:text-slate-400 focus-visible:ring-0 md:text-[15px]",
                embedded ? "min-h-[72px]" : "min-h-[100px]",
              )}
              rows={embedded ? 2 : 3}
            />
            <Button
              type="button"
              size="icon"
              className="absolute bottom-3 right-3 h-11 w-11 rounded-full bg-[#2563eb] text-white shadow-md shadow-blue-500/30 hover:bg-[#1d4ed8]"
              onClick={() => void send()}
              disabled={sending}
              aria-label="AI로 보내기"
            >
              <Sparkles className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 border-t border-slate-200/60 px-3 py-2.5 text-xs text-slate-500 sm:px-4">
            <span>맞춤 추천</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 opacity-70" aria-hidden />
              즉시 생성
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 border-t border-slate-200/60 px-2 py-2 sm:px-3">
            <div className="flex min-w-0 items-center gap-0.5">
              <input ref={fileRef} type="file" className="sr-only" multiple />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-10 w-10 shrink-0 rounded-full text-slate-600 hover:bg-white/70"
                onClick={() => fileRef.current?.click()}
                aria-label="첨부"
              >
                <Plus className="h-5 w-5" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="h-10 shrink-0 gap-2 rounded-full px-2.5 text-slate-700 hover:bg-white/70 sm:px-3"
              >
                <SlidersHorizontal className="h-4 w-4 shrink-0" />
                <span className="text-sm font-medium">도구</span>
              </Button>
            </div>

            <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="h-10 max-w-[9.5rem] border-0 bg-white/40 text-slate-800 shadow-none backdrop-blur-sm hover:bg-white/60 focus:ring-0 sm:max-w-none">
                  <SelectValue placeholder="모델" />
                </SelectTrigger>
                <SelectContent
                  align="end"
                  className="border-slate-200/80 bg-white/95 text-slate-900 backdrop-blur-xl"
                >
                  <SelectItem value="fast">빠른 모델</SelectItem>
                  <SelectItem value="pro">정밀 모델</SelectItem>
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full text-slate-600 hover:bg-white/70"
                aria-label="음성 입력"
              >
                <Mic className="h-5 w-5" />
              </Button>
              <Button
                type="button"
                size="sm"
                className="ml-0.5 hidden rounded-full bg-[#2563eb] px-4 text-white hover:bg-[#1d4ed8] sm:inline-flex"
                onClick={() => void send()}
                disabled={sending}
              >
                {sending ? "전송 중…" : "보내기"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

