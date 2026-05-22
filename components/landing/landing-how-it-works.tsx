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
      id="features"
      className="scroll-mt-24 border-y border-white/5 bg-[#111114] px-4 py-20 sm:px-6 md:py-28"
    >
      <div className="mx-auto max-w-6xl text-center">
        <SectionReveal>
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-100 sm:text-4xl md:text-5xl">
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
                  <div className="flex h-14 w-14 items-center justify-center text-maestro-400/90">
                    <Icon className="h-10 w-10" strokeWidth={1.25} />
                  </div>
                  <h3 className="mt-4 text-base font-medium text-zinc-200 sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500 sm:text-base">
                    {step.description}
                  </p>
                </SectionReveal>
                {index < STEPS.length - 1 && (
                  <ArrowDown
                    className="mx-auto h-5 w-5 shrink-0 text-zinc-700"
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