"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Loop video: place `public/hero-visual-loop.mp4` (or .webm).
 * Falls back to CSS motion if the file is missing.
 */
export function HeroVisualBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onCanPlay = () => setVideoReady(true)
    const onError = () => setVideoReady(false)
    v.addEventListener("canplay", onCanPlay)
    v.addEventListener("error", onError)
    v.play().catch(() => setVideoReady(false))
    return () => {
      v.removeEventListener("canplay", onCanPlay)
      v.removeEventListener("error", onError)
    }
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className={`hero-visual-fallback absolute inset-0 transition-opacity duration-700 ${
          videoReady ? "opacity-0" : "opacity-100"
        }`}
      />

      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/hero-visual-loop.webm" type="video/webm" />
        <source src="/hero-visual-loop.mp4" type="video/mp4" />
      </video>

      <div className="hero-visual-overlay absolute inset-0" />
      <div className="hero-visual-glitch absolute inset-0" />
      <div className="hero-visual-scanlines absolute inset-0" />
    </div>
  )
}
