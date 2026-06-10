"use client"

import Link from "next/link"
import { Loader2, Send } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { chatWithSmithCaptain } from "@/lib/titanic-api"

type ChatMessage = {
  role: "user" | "assistant"
  text: string
}

const SMITH_GREETING =
  "안녕하십니까. 타이타닉호 선장 에드워드 스미스입니다. 항해, 승객, 또는 이 배에 대해 궁금한 점을 물어보십시오."

export default function TitanicSmithChatPage() {
  const [chatInput, setChatInput] = useState("")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: "assistant", text: SMITH_GREETING },
  ])
  const [chatSending, setChatSending] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages, chatSending])

  const sendSmithMessage = async () => {
    const text = chatInput.trim()
    if (!text || chatSending) return

    setChatInput("")
    setChatMessages((prev) => [...prev, { role: "user", text }])
    setChatSending(true)

    try {
      const reply = await chatWithSmithCaptain(text)
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", text: reply || "…" },
      ])
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            err instanceof Error
              ? err.message
              : "선장과의 대화 중 오류가 발생했습니다.",
        },
      ])
    } finally {
      setChatSending(false)
    }
  }

  return (
    <div className="relative -mt-20 min-h-screen overflow-x-hidden">
      <div
        className="fixed inset-0 scale-105 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/titanic-ship-bg.png)",
          filter: "grayscale(1) brightness(0.32) contrast(1.12)",
        }}
        aria-hidden
      />
      <div
        className="fixed inset-0 bg-gradient-to-b from-black/82 via-zinc-950/88 to-black/92"
        aria-hidden
      />

      <div className="relative z-10 mt-20 w-full px-4 py-8 pb-16 text-white md:px-6">
        <div className="mx-auto flex w-full max-w-6xl gap-6">
          <aside className="sticky top-24 hidden h-fit w-52 rounded-xl border border-white/10 bg-zinc-950/45 p-3 backdrop-blur md:block">
            <p className="mb-2 text-xs font-semibold tracking-wide text-white/50">섹션</p>
            <nav className="space-y-1">
              <Link
                href="/titanic"
                className="block rounded-md px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white/90"
              >
                1. 데이터 수집
              </Link>
              <Link
                href="/titanic/preview"
                className="block rounded-md px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white/90"
              >
                2. 캐릭터 자기소개
              </Link>
              <Link
                href="/titanic/smith"
                className="block rounded-md px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white/90"
              >
                3. 스미스 선장과 대화
              </Link>
            </nav>
          </aside>

          <div className="w-full space-y-8">
            <div className="mx-auto w-full max-w-4xl">
              <h1
                className="text-2xl font-bold tracking-tight text-white drop-shadow md:text-3xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                타이타닉 모델 분석
              </h1>
            </div>

            <Card className="mx-auto w-full max-w-4xl border border-blue-400/25 bg-zinc-950/35 text-white shadow-2xl shadow-black/25 backdrop-blur-xl ring-1 ring-blue-400/15 supports-[backdrop-filter]:bg-zinc-950/25">
              <CardContent className="space-y-4 pt-6">
                <div>
                  <h2
                    className="text-xl font-semibold tracking-tight text-white md:text-2xl"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    3. 스미스 선장과 대화
                  </h2>
                  <p className="mt-2 text-sm text-blue-100/75">
                    타이타닉호 선장 에드워드 스미스와 대화합니다.
                  </p>
                </div>

                <div className="max-h-80 space-y-3 overflow-y-auto rounded-xl border border-white/10 bg-black/25 px-4 py-3">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={cn(
                        "max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed",
                        msg.role === "user"
                          ? "ml-auto border border-blue-400/30 bg-blue-500/20 text-blue-50"
                          : "mr-auto border border-white/15 bg-white/[0.06] text-white/90",
                      )}
                    >
                      {msg.role === "assistant" && (
                        <p className="mb-1 text-xs font-medium text-blue-200/80">
                          Captain Smith
                        </p>
                      )}
                      {msg.text}
                    </div>
                  ))}
                  {chatSending && (
                    <div className="mr-auto flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2 text-sm text-blue-100/80">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      선장이 답변을 준비하고 있습니다…
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <div className="flex gap-2">
                  <Textarea
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        void sendSmithMessage()
                      }
                    }}
                    disabled={chatSending}
                    placeholder="선장에게 메시지를 입력하세요…"
                    className="min-h-[72px] resize-none border-white/15 bg-white/[0.04] text-white placeholder:text-blue-100/45 focus-visible:ring-blue-400/40"
                    rows={2}
                  />
                  <Button
                    type="button"
                    className="h-auto shrink-0 self-end bg-[#2563eb] px-4 text-white hover:bg-[#1d4ed8]"
                    disabled={chatSending || !chatInput.trim()}
                    onClick={() => void sendSmithMessage()}
                  >
                    {chatSending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
