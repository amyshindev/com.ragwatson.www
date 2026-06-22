"use client"

import { SectionReveal } from "@/components/landing/section-reveal"
import { GlitchButton } from "@/components/landing/glitch-button"
import { LandingUploadZone } from "@/components/landing/landing-upload-zone"

export function LandingFinalCta() {
  return (
    <section
      id="landing-final-cta"
      className="landing-final-cta-section relative box-border flex min-h-[100dvh] min-h-[100svh] w-full items-center justify-center border-t border-gray-200 bg-gray-50 px-4 py-16 dark:border-white/5 dark:bg-[#0a0a0a] sm:px-6 sm:py-20"
    >
      <SectionReveal className="flex w-full max-w-5xl flex-col items-center text-center">
        <h2 className="landing-final-cta-title font-semibold tracking-tight text-gray-900 dark:text-zinc-100">
          지금 바로 당신의 음악을 눈앞에서.
        </h2>
        <p className="landing-final-cta-subtitle mt-5 w-full text-gray-600 dark:text-zinc-500 sm:mt-6">
          무료로 시작하세요. 카드 없이.
        </p>
        <LandingUploadZone imposing className="mt-10 w-full max-w-2xl sm:mt-12" />
        <GlitchButton
          variant="ghost"
          className="landing-final-cta-button mt-10 w-full max-w-md text-base sm:mt-12 sm:w-auto sm:px-12 sm:text-lg"
          onClick={() => {
            document.getElementById("landing-upload")?.click()
          }}
        >
          원클릭으로 비주얼 뽑기
        </GlitchButton>
      </SectionReveal>
    </section>
  )
}
