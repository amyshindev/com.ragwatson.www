"use client"

import { KonceitHero } from "@/components/konceit/konceit-hero"
import { LandingGrain } from "@/components/landing/landing-grain"

export default function KonceitPage() {
  return (
    <div className="music-visual-landing relative -mt-20 bg-[#e4edf5] text-gray-800 dark:bg-[#0a0a0a] dark:text-zinc-300">
      <LandingGrain />
      <KonceitHero />
    </div>
  )
}
