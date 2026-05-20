"use client"

import { LandingFinalCta } from "@/components/landing/landing-final-cta"
import { LandingGenreShowcase } from "@/components/landing/landing-genre-showcase"
import { LandingGrain } from "@/components/landing/landing-grain"
import { LandingHero } from "@/components/landing/landing-hero"
import { LandingHowItWorks } from "@/components/landing/landing-how-it-works"
import { LandingSocialProof } from "@/components/landing/landing-social-proof"

export function MusicVisualLanding() {
  return (
    <div className="music-visual-landing relative -mt-20 bg-[#0a0a0a] text-zinc-300">
      <LandingGrain />
      <LandingHero />
      <LandingGenreShowcase />
      <LandingHowItWorks />
      <LandingSocialProof />
      <LandingFinalCta />
    </div>
  )
}
