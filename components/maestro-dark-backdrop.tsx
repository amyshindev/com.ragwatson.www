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
        className="pointer-events-none fixed inset-0 -z-10 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 80%, rgba(0,255,200,0.12) 0%, transparent 40%), radial-gradient(circle at 80% 20%, rgba(180,0,255,0.1) 0%, transparent 35%)",
        }}
        aria-hidden
      />
      <LandingGrain />
    </>
  )
}
