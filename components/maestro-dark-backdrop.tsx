"use client"

import { LandingGrain } from "@/components/landing/landing-grain"

export function MaestroDarkBackdrop() {
  return (
    <>
      <div
        className="landing-hero-mesh landing-scanlines pointer-events-none fixed inset-0 -z-10"
        aria-hidden
      />
      <div
        className="landing-hero-parallax-glow pointer-events-none fixed inset-0 -z-10"
        aria-hidden
      />
      <LandingGrain />
    </>
  )
}
