"use client"

import { useCallback, useState } from "react"
import { motion } from "framer-motion"

export function LandingHero() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 })

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const x = (e.clientX - window.innerWidth / 2) * 0.02
    const y = (e.clientY - window.innerHeight / 2) * 0.02
    setParallax({ x, y })
  }, [])

  return (
    <section
      className="relative box-border flex min-h-[100dvh] min-h-[100svh] items-center justify-center px-6 py-24"
      onMouseMove={onMouseMove}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <motion.div
          className="landing-hero-mesh landing-scanlines absolute inset-0"
          style={{
            transform: `translate(${parallax.x}px, ${parallax.y}px)`,
            transition: "transform 0.15s ease-out",
          }}
        />
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, rgba(0,255,200,0.12) 0%, transparent 40%), radial-gradient(circle at 80% 20%, rgba(180,0,255,0.1) 0%, transparent 35%)",
            transform: `translate(${parallax.x * 1.5}px, ${parallax.y * 1.5}px)`,
          }}
        />
      </div>

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-full max-w-4xl">
          <h1 className="landing-hero-title font-semibold tracking-tight text-zinc-100">
            눈으로 듣는 당신의 음악.
          </h1>
          <p className="landing-hero-subtitle mt-5 tracking-wide text-zinc-400 sm:mt-6">
            Your sound. Interpreted. Visualized.
          </p>
          <p className="landing-hero-desc mx-auto mt-6 max-w-2xl leading-relaxed text-zinc-500 sm:mt-8">
            장르를 이해하는 AI 에이전트가 만드는 스포티파이·숏폼 최적화 아티스틱 비주얼.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
