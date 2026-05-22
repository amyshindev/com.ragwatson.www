"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { SectionReveal } from "@/components/landing/section-reveal"
import { cn } from "@/lib/utils"

type GenreId =
  | "industrial"
  | "electronica"
  | "progressive"
  | "ambient"
  | "lofi"

const GENRES: {
  id: GenreId
  tag: string
  description: string
  visualClass: string
}[] = [
  {
    id: "industrial",
    tag: "#Industrial_Rock",
    description: "묵직하고 거친 디스토션 신스 사운드",
    visualClass: "genre-visual-industrial",
  },
  {
    id: "electronica",
    tag: "#Electronica",
    description: "정박의 테크노 비트와 청량한 패드 사운드",
    visualClass: "genre-visual-electronica",
  },
  {
    id: "progressive",
    tag: "#Progressive",
    description: "복잡한 리듬과 층이 쌓이는 프로그레시브 사운드",
    visualClass: "genre-visual-progressive",
  },
  {
    id: "ambient",
    tag: "#Ambient",
    description: "공간감 있는 드론 사운드",
    visualClass: "genre-visual-ambient",
  },
  {
    id: "lofi",
    tag: "#Lo-Fi_Hip-Hop",
    description: "느슨한 붐뱁 비트와 vinyl 크래클",
    visualClass: "genre-visual-lofi",
  },
]

export function LandingGenreShowcase() {
  const [active, setActive] = useState<GenreId>("electronica")
  const current = GENRES.find((g) => g.id === active) ?? GENRES[1]

  return (
    <section
      id="genre-showcase"
      className="relative scroll-mt-24 border-b border-white/5 px-4 py-16 sm:px-6 sm:py-20 md:py-24"
    >
      <SectionReveal className="mx-auto max-w-6xl">
        <h2 className="text-left text-4xl font-semibold tracking-tight text-zinc-100 sm:text-5xl md:text-6xl">
          장르별 미학 쇼케이스
        </h2>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
          <div className="flex flex-wrap gap-2 lg:max-w-[220px] lg:flex-col">
            {GENRES.map((genre) => (
              <button
                key={genre.id}
                type="button"
                onClick={() => setActive(genre.id)}
                className={cn(
                  "text-left text-xs transition-colors sm:text-sm",
                  active === genre.id
                    ? "text-maestro-400 underline decoration-maestro-400/80 underline-offset-4"
                    : "text-zinc-600 hover:text-zinc-400",
                )}
              >
                {genre.tag}
              </button>
            ))}
          </div>

          <div className="flex-1">
            <div className="relative mx-auto aspect-[9/16] w-full max-w-[280px] overflow-hidden border border-zinc-800 bg-black sm:max-w-[320px] md:max-w-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className={cn(
                    "genre-card-visual absolute inset-0",
                    current.visualClass,
                  )}
                />
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 pt-16">
                <p className="text-sm text-zinc-300">{current.tag}</p>
                <p className="mt-1 text-sm text-zinc-500">{current.description}</p>
              </div>
            </div>

            <p className="mt-6 text-center text-xs italic text-zinc-600 lg:text-left">
              실제 업로드 시, AI가 당신의 곡 BPM·악기·감성을 분석해 이 비주얼을 자동
              생성합니다.
            </p>
          </div>
        </div>
      </SectionReveal>
    </section>
  )
}