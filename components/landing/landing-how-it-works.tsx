"use client"

import { Fragment } from "react"
import { ArrowDown, Brain, Clapperboard, Music } from "lucide-react"
import { SectionReveal } from "@/components/landing/section-reveal"

const STEPS = [
  {
    icon: Music,
    title: "Drop Your Sound",
    description:
      "MP3/WAV 파일이나 사운드클라우드/유튜브 링크를 넣습니다.",
  },
  {
    icon: Brain,
    title: "AI Aesthetic Analysis",
    description: "AI가 곡의 BPM, 악기 구성, 장르적 감성을 매핑합니다.",
    details: [
      "BPM, 에너지, 무드, 장르 신호를 추출해 비주얼 생성의 기준점으로 사용합니다.",
      "곡의 분위기에 맞는 색감, 움직임, 질감을 조합해 숏폼에 어울리는 화면 언어로 변환합니다.",
      "분석 결과와 프롬프트를 바탕으로 Spotify Canvas, Reels, Shorts에 맞는 루프 비주얼을 만듭니다.",
    ],
  },
  {
    icon: Clapperboard,
    title: "Get Your Artwork",
    description:
      "단 몇 초 만에 내 곡에 완벽히 녹아드는 고화질 루프 영상 완성.",
  },
] as const

export function LandingHowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 border-y border-gray-200 bg-gray-100 px-4 py-20 dark:border-white/5 dark:bg-[#111114] sm:px-6 md:py-28"
    >
      <div className="mx-auto max-w-6xl text-center">
        <SectionReveal>
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-zinc-100 sm:text-4xl md:text-5xl">
            How it works
          </h2>
        </SectionReveal>

        <div className="mt-14 flex flex-col items-center gap-6">
          {STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <Fragment key={step.title}>
                <SectionReveal
                  className="flex max-w-md flex-col items-center text-center"
                  delay={index * 0.2}
                >
                  <div className="flex h-14 w-14 items-center justify-center text-blue-600 dark:text-maestro-400/90">
                    <Icon className="h-10 w-10" strokeWidth={1.25} />
                  </div>
                  <h3 className="mt-4 text-base font-medium text-gray-800 dark:text-zinc-200 sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-zinc-500 sm:text-base">
                    {step.description}
                  </p>
                  {"details" in step ? (
                    <ul className="mt-5 space-y-2 text-left text-xs leading-relaxed text-gray-600 dark:text-zinc-500 sm:text-sm">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex gap-2">
                          <span className="text-blue-600 dark:text-maestro-500/90" aria-hidden>
                            ✓
                          </span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </SectionReveal>
                {index < STEPS.length - 1 && (
                  <ArrowDown
                    className="mx-auto h-5 w-5 shrink-0 text-gray-400 dark:text-zinc-700"
                    aria-hidden
                  />
                )}
              </Fragment>
            )
          })}
        </div>
      </div>
    </section>
  )
}