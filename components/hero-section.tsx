"use client"

import { useCallback, useRef, useState } from "react"
import { Music2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroShowcaseSection } from "@/components/hero-showcase-section"
import { cn } from "@/lib/utils"

const AUDIO_ACCEPT = "audio/*,.mp3,.wav,.flac,.m4a,.aac,.ogg"

export function HeroSection() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const pickFile = useCallback((f: File | undefined) => {
    if (!f) return
    if (!f.type.startsWith("audio/") && !/\.(mp3|wav|flac|m4a|aac|ogg)$/i.test(f.name)) {
      alert("음원 파일(mp3, wav 등)을 선택해 주세요.")
      return
    }
    setFile(f)
  }, [])

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    pickFile(e.dataTransfer.files?.[0])
  }

  return (
    <section className="relative flex min-h-[calc(100dvh-5rem)] flex-col justify-center">
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-20 pt-12 text-center">
        <div className="mb-6 w-full max-w-sm overflow-hidden shadow-lg shadow-slate-900/10 sm:max-w-md">
          <img
            src="/kandinsky-impression-iii-concert.png"
            alt="칸딘스키, Impression III (Concert), 1911"
            className="h-auto w-full object-contain"
            width={640}
            height={360}
            decoding="async"
          />
        </div>

        <h1
          className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[3.25rem]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          눈으로 듣는 당신의 음악.
        </h1>

        <p className="mt-5 max-w-2xl text-sm leading-relaxed tracking-tight text-slate-600 sm:text-base md:text-lg">
          장르를 이해하는 AI 에이전트가 만드는 스포티파이·숏폼 최적화 아티스틱 비주얼.
        </p>

        <input
          ref={inputRef}
          type="file"
          accept={AUDIO_ACCEPT}
          className="sr-only"
          onChange={(e) => {
            pickFile(e.target.files?.[0])
            e.target.value = ""
          }}
        />

        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") inputRef.current?.click()
          }}
          onClick={() => inputRef.current?.click()}
          onDragEnter={(e) => {
            e.preventDefault()
            setDragActive(true)
          }}
          onDragLeave={(e) => {
            e.preventDefault()
            setDragActive(false)
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          className={cn(
            "mt-10 w-full max-w-xl cursor-pointer rounded-2xl border-2 border-dashed px-6 py-10 transition-all backdrop-blur-md",
            dragActive
              ? "border-[#2563eb]/60 bg-sky-50/80 shadow-lg shadow-blue-500/15"
              : "border-white/80 bg-white/45 hover:border-slate-300 hover:bg-white/70",
          )}
        >
          <Upload className="mx-auto mb-3 h-10 w-10 text-[#1d4ed8]" />
          <p className="text-sm font-medium text-slate-800 sm:text-base">
            음원 파일을 드래그하거나 클릭하여 업로드
          </p>
          <p className="mt-1 text-xs text-slate-500">MP3, WAV, FLAC 등</p>
          {file && (
            <p className="mt-3 flex items-center justify-center gap-2 text-sm text-emerald-700">
              <Music2 className="h-4 w-4 shrink-0" />
              {file.name}
            </p>
          )}
        </div>

        <div className="mt-8 flex w-full justify-center">
          <Button
            type="button"
            size="lg"
            variant="outline"
            className="group h-auto min-h-12 rounded-full border-white/80 bg-white/45 px-8 py-6 font-semibold text-slate-800 shadow-md backdrop-blur-md transition-all duration-200 hover:bg-white/70"
            onClick={() => inputRef.current?.click()}
          >
            <span className="inline-block text-base transition-all duration-200 group-hover:text-lg sm:text-lg sm:group-hover:text-xl">
              원클릭으로 비주얼 뽑기
            </span>
          </Button>
        </div>

        <HeroShowcaseSection />
      </div>
    </section>
  )
}
