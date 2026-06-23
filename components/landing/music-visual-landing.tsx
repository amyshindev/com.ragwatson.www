"use client"

import { LandingFinalCta } from "@/components/landing/landing-final-cta"
import { LandingGenreShowcase } from "@/components/landing/landing-genre-showcase"
import { LandingGrain } from "@/components/landing/landing-grain"
import { LandingHero } from "@/components/landing/landing-hero"
import { LandingHowItWorks } from "@/components/landing/landing-how-it-works"
import { LandingSocialProof } from "@/components/landing/landing-social-proof"

function LandingFixedPrompt() {
  const scrollToFinalCta = () => {
    document.getElementById("landing-final-cta")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <div className="fixed bottom-5 left-4 right-24 z-[55] max-w-none sm:inset-x-4 sm:bottom-6 sm:mx-auto sm:max-w-lg">
      <button
        type="button"
        onClick={scrollToFinalCta}
        className="group flex w-full items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white/90 px-4 py-4 text-left text-[15px] font-medium text-gray-900 shadow-xl shadow-gray-300/30 backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-blue-200/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:border-white/15 dark:bg-zinc-950/85 dark:text-zinc-100 dark:shadow-black/50 dark:hover:border-white/30 dark:hover:bg-zinc-900/90 dark:hover:shadow-blue-500/20 dark:focus-visible:ring-offset-black sm:gap-4 sm:px-6 sm:text-lg"
      >
        <span>지금 바로 당신의 음악을 눈앞에서.</span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm text-white transition group-hover:bg-blue-500 sm:h-9 sm:w-9 sm:text-base">
          ↓
        </span>
      </button>
    </div>
  )
}

export function MusicVisualLanding() {
  return (
    <div className="music-visual-landing relative -mt-20 bg-[#e4edf5] text-gray-800 dark:bg-[#0a0a0a] dark:text-zinc-300">
      <LandingGrain />
      <LandingHero />
      <LandingGenreShowcase />
      <LandingHowItWorks />
      <LandingSocialProof />
      <LandingFinalCta />
      <LandingFixedPrompt />
    </div>
  )
}
