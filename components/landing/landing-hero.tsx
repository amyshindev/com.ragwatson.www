"use client"

import { useCallback, useRef, useState } from "react"
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion"

export function LandingHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  /* 스크롤할수록 검정 그라데이션 시작점이 위로 올라감 (색상 레이어는 그대로) */
  const fadeStart = useTransform(scrollYProgress, [0, 0.4, 1], [52, 28, 0])
  const fadeMid = useTransform(scrollYProgress, [0, 0.4, 1], [78, 52, 22])
  const scrollBlackGradient = useMotionTemplate`linear-gradient(180deg, transparent 0%, transparent ${fadeStart}%, rgba(10, 10, 10, 0.5) ${fadeMid}%, #0a0a0a 100%)`

  const [parallax, setParallax] = useState({ x: 0, y: 0 })

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const x = (e.clientX - window.innerWidth / 2) * 0.02
    const y = (e.clientY - window.innerHeight / 2) * 0.02
    setParallax({ x, y })
  }, [])

  return (
    <section
      ref={sectionRef}
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
          className="landing-hero-parallax-glow absolute inset-0"
          style={{
            transform: `translate(${parallax.x * 1.5}px, ${parallax.y * 1.5}px)`,
          }}
        />
        <motion.div
          className="absolute inset-0 z-[2]"
          style={{ background: scrollBlackGradient }}
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
            Your sound. Visualized.
          </h1>
          <p className="landing-hero-desc mx-auto mt-6 max-w-2xl leading-relaxed text-white sm:mt-8">
            장르를 이해하는 AI 에이전트가 만드는 스포티파이·숏폼 최적화 아티스틱 비주얼.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
