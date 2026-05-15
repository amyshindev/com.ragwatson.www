"use client"

import { Music, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { GeminiChatPanel } from "@/components/gemini-chat-panel"
import { MaestroLightBackdrop } from "@/components/maestro-light-backdrop"

export default function BrandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden text-slate-900">
      <MaestroLightBackdrop />

      <main className="relative pt-12 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              For you
            </p>

            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/70 bg-white/50 shadow-lg shadow-slate-900/5 backdrop-blur-xl">
              <Music className="h-12 w-12 text-[#1d4ed8]" />
            </div>

            <h1
              className="mb-3 text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl"
              style={{ fontFamily: "var(--font-heading)", lineHeight: 1.1 }}
            >
              maestro
            </h1>

            <p className="mb-2 max-w-md text-lg font-medium text-slate-800 md:text-xl">
              Emotional Intelligence.
            </p>
            <p className="mb-10 max-w-lg text-base text-slate-500 md:text-lg">
              Soundtrack your current state of mind.
            </p>

            <div className="mb-16 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button
                size="lg"
                className="rounded-full bg-[#2563eb] px-8 py-6 text-lg font-semibold text-white shadow-lg shadow-blue-500/30 hover:bg-[#1d4ed8]"
              >
                <Play className="h-5 w-5" />
                시작하기
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white/70 bg-white/45 px-8 py-6 text-lg font-medium text-slate-800 shadow-md backdrop-blur-md hover:bg-white/70"
              >
                더 알아보기
              </Button>
            </div>

            <div className="w-full max-w-2xl">
              <GeminiChatPanel />
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-sm text-slate-600">
            현재 베타 서비스 중입니다. 등록된 베타 계정만 이용 가능합니다.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-600">
            <Link
              href="/terms"
              className="font-medium text-[#2563eb] hover:text-[#1d4ed8] hover:underline"
            >
              이용약관
            </Link>
            <span className="text-slate-400">·</span>
            <Link
              href="/privacy"
              className="font-medium text-[#2563eb] hover:text-[#1d4ed8] hover:underline"
            >
              개인정보처리방침
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
