"use client"

export function LandingGrain() {
  return (
  <>
      <div className="landing-grain" aria-hidden />
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden>
        <filter id="landing-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.7"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
      </svg>
    </>
  )
}
