"use client"

import { SectionReveal } from "@/components/landing/section-reveal"

const DELIVERABLES = [
  "Spotify Canvas 규격 (9:16 vertical) 지원",
  "TikTok / Reels / Shorts 최적화",
  "고화질 루프 비디오 (MP4 export)",
  "숏폼 바이럴을 위한 최적의 치트키",
] as const

const TESTIMONIALS = [
  {
    quote: "인디 뮤지션 2,400명이 매주 새 앨범 커버에 사용 중입니다",
    author: "maestro stats",
  },
  {
    quote: "캔버스 하나만 올렸는데 스트리밍 체류 시간이 확 늘었어요.",
    author: "bedroom producer · 서울",
  },
  {
    quote: "숏폼 업로드 전에 10초면 비주얼이 나옵니다. 진짜 치트키.",
    author: "content creator · 부산",
  },
] as const

export function LandingSocialProof() {
  return (
    <section
      id="pricing"
      className="landing-social-proof-section relative box-border flex min-h-[100dvh] min-h-[100svh] scroll-mt-24 items-center border-b border-white/5 px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-14">
        <SectionReveal>
          <h2 className="landing-sp-heading font-semibold tracking-tight text-zinc-100">
            제공 사양
          </h2>
          <ul className="mt-8 space-y-5 sm:mt-10 sm:space-y-6">
            {DELIVERABLES.map((item) => (
              <li
                key={item}
                className="landing-sp-list-item flex gap-3 text-zinc-400"
              >
                <span className="text-maestro-500/90" aria-hidden>
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <h2 className="landing-sp-heading font-semibold tracking-tight text-zinc-100">
            크리에이터 후기
          </h2>
          <div className="mt-8 space-y-4 sm:mt-10 sm:space-y-5">
            {TESTIMONIALS.map((t, i) => (
              <blockquote
                key={t.author}
                className={
                  i === 0
                    ? "border border-maestro-500/30 bg-maestro-950/20 px-5 py-4 sm:px-6 sm:py-5"
                    : "border border-zinc-800 bg-zinc-950/50 px-5 py-4 sm:px-6 sm:py-5"
                }
              >
                <p className="landing-sp-quote leading-relaxed text-zinc-300">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="landing-sp-attribution mt-2 text-zinc-600">
                  — {t.author}
                </footer>
              </blockquote>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}