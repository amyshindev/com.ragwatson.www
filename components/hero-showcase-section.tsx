"use client"

import { useState } from "react"
import {
  ArrowRight,
  Brain,
  FileAudio,
  Play,
  Repeat2,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

const GENRES = [
  {
    id: "industrial",
    label: "Industrial Rock",
    hint: "마우스를 올려 미리보기",
    gradient:
      "bg-gradient-to-br from-zinc-900 via-red-950/90 to-zinc-800",
  },
  {
    id: "electronica",
    label: "Electronica",
    hint: "마우스를 올려 미리보기",
    gradient:
      "bg-gradient-to-br from-violet-950 via-fuchsia-900/80 to-maestro-950",
  },
  {
    id: "citypop",
    label: "City Pop",
    hint: "마우스를 올려 미리보기",
    gradient:
      "bg-gradient-to-br from-rose-400 via-orange-300 to-sky-400",
    featured: true,
  },
  {
    id: "synthpop",
    label: "Synth Pop",
    hint: "마우스를 올려 미리보기",
    gradient:
      "bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-900",
  },
] as const

const STEPS = [
  {
    icon: FileAudio,
    title: "1. Drop Audio",
    description: "원본 파일 업로드",
  },
  {
    icon: Brain,
    title: "2. AI Analyzes Aesthetic",
    description: "AI가 무드·리듬 분석",
  },
  {
    icon: Repeat2,
    title: "3. Get Loop",
    description: "캔버스·루프용 영상 생성",
  },
] as const

export function HeroShowcaseSection() {
  const [activeGenre, setActiveGenre] = useState<string>("citypop")

  return (
    <div className="mt-14 w-full max-w-5xl space-y-12 text-left">
      <div>
        <h2
          className="text-center text-lg font-semibold text-slate-900 sm:text-xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          장르별 미학 인터페이스
        </h2>

        <div className="mt-5 -mx-2 flex gap-3 overflow-x-auto px-2 pb-2 scrollbar-thin sm:justify-center sm:overflow-visible sm:pb-0">
          {GENRES.map((genre) => {
            const isActive = activeGenre === genre.id
            const isFeatured = "featured" in genre && genre.featured

            return (
              <button
                key={genre.id}
                type="button"
                onClick={() => setActiveGenre(genre.id)}
                className={cn(
                  "group relative h-36 w-28 shrink-0 overflow-hidden text-center transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] sm:h-40 sm:w-32",
                  isActive && "ring-2 ring-[#2563eb] ring-offset-2 ring-offset-transparent",
                )}
              >
                <div
                  className={cn("absolute inset-0", genre.gradient)}
                  aria-hidden
                />
                <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/15" />
                {isFeatured && isActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/90 bg-white/10 backdrop-blur-sm">
                      <Play className="h-4 w-4 fill-white text-white" />
                    </span>
                  </div>
                )}
                <div className="relative flex h-full flex-col items-center justify-center gap-1 px-2 py-3">
                  <p className="text-sm font-bold leading-tight text-white drop-shadow-md sm:text-base">
                    {genre.label}
                  </p>
                  <p className="text-[10px] leading-snug text-white/85 sm:text-[11px]">
                    {genre.hint}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <h2
          className="text-center text-lg font-semibold text-slate-900 sm:text-xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          서비스 이용 절차
        </h2>

        <div className="mt-8 flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-4">
          {STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="flex items-center gap-4 sm:gap-4">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center text-[#38bdf8] sm:h-[4.5rem] sm:w-[4.5rem]">
                    <Icon
                      className="h-12 w-12 stroke-[1.25] sm:h-14 sm:w-14"
                      strokeWidth={1.25}
                    />
                  </div>
                  <p className="mt-2 text-sm font-medium text-slate-800 sm:text-base">
                    {step.title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">{step.description}</p>
                </div>
                {index < STEPS.length - 1 && (
                  <ArrowRight
                    className="hidden h-5 w-5 shrink-0 text-slate-400 sm:block"
                    aria-hidden
                  />
                )}
              </div>
            )
          })}
          <Sparkles
            className="hidden h-4 w-4 text-slate-400/80 sm:ml-2 sm:block"
            aria-hidden
          />
        </div>
      </div>
    </div>
  )
}
