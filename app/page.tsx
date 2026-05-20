"use client"

import { GeminiChatWidget } from "@/components/gemini-chat-widget"
import { LandingSiteFooter } from "@/components/landing/landing-site-footer"
import { MusicVisualLanding } from "@/components/landing/music-visual-landing"

export default function HomePage() {
  return (
    <>
      <MusicVisualLanding />
      <GeminiChatWidget />
      <LandingSiteFooter />
    </>
  )
}
