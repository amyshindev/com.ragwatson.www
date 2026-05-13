"use client"

import { Music, Sparkles, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function BrandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#ddd6fe] via-[#c4b5fd] to-[#ddd6fe]">
      {/* Animated Curves SVG */}
      <svg 
        className="fixed inset-0 w-full h-full z-0"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="curve1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
            <stop offset="50%" stopColor="#5b21b6" stopOpacity="1" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="curve2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#db2777" stopOpacity="0" />
            <stop offset="50%" stopColor="#be185d" stopOpacity="1" />
            <stop offset="100%" stopColor="#db2777" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="curve3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0" />
            <stop offset="50%" stopColor="#4338ca" stopOpacity="1" />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Curve 1 - Top flowing curve */}
        <path 
          d="M-100,200 Q300,100 720,250 T1540,200"
          fill="none"
          stroke="url(#curve1)"
          strokeWidth="3"
          className="animate-curve1"
        />
        <path 
          d="M-100,240 Q350,140 720,290 T1540,240"
          fill="none"
          stroke="url(#curve1)"
          strokeWidth="2"
          opacity="0.6"
          className="animate-curve1-delay"
        />
        
        {/* Curve 2 - Middle flowing curve */}
        <path 
          d="M-100,450 Q400,350 720,500 T1540,450"
          fill="none"
          stroke="url(#curve2)"
          strokeWidth="4"
          className="animate-curve2"
        />
        <path 
          d="M-100,490 Q450,390 720,540 T1540,490"
          fill="none"
          stroke="url(#curve2)"
          strokeWidth="2"
          opacity="0.6"
          className="animate-curve2-delay"
        />
        
        {/* Curve 3 - Bottom flowing curve */}
        <path 
          d="M-100,700 Q300,600 720,750 T1540,700"
          fill="none"
          stroke="url(#curve3)"
          strokeWidth="3"
          className="animate-curve3"
        />
        <path 
          d="M-100,740 Q350,640 720,790 T1540,740"
          fill="none"
          stroke="url(#curve3)"
          strokeWidth="2"
          opacity="0.6"
          className="animate-curve3-delay"
        />
      </svg>
      
      {/* Subtle glow effects */}
      <div className="fixed top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-[#5b21b6]/15 blur-[120px] z-0" />
      <div className="fixed bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-[#be185d]/15 blur-[100px] z-0" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1e1b4b] shadow-lg">
                <Music className="h-5 w-5 text-[#c4b5fd]" />
              </div>
              <span className="text-xl font-bold text-[#1e1b4b]" style={{ fontFamily: 'var(--font-heading)' }}>
                maestro
              </span>
            </Link>

            {/* Sign Up Button */}
            <Link href="/signup">
              <Button className="bg-[#5b21b6] hover:bg-[#4c1d95] text-white font-medium px-6 shadow-lg">
                회원가입
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center text-center">
            {/* Logo Icon */}
            <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-[#1e1b4b] shadow-2xl">
              <Music className="h-12 w-12 text-[#c4b5fd]" />
            </div>

            {/* Title */}
            <h1 
              className="text-5xl md:text-7xl font-extrabold text-[#1e1b4b] mb-4 tracking-tight"
              style={{ fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}
            >
              maestro
            </h1>

            {/* Tagline */}
            <p className="text-lg md:text-xl text-[#4c1d95] mb-12">
              your personal soundtrack
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-20">
              <Button size="lg" className="bg-[#5b21b6] hover:bg-[#4c1d95] text-white font-medium px-8 py-6 text-lg gap-2 shadow-lg">
                <Play className="h-5 w-5" />
                시작하기
              </Button>
              <Button size="lg" variant="outline" className="border-[#5b21b6] bg-white/50 backdrop-blur-sm hover:bg-white/80 text-[#5b21b6] px-8 py-6 text-lg shadow-lg">
                더 알아보기
              </Button>
            </div>

            {/* Features */}
            <div className="w-full max-w-md">
              <FeatureCard 
                icon={<Sparkles className="h-6 w-6" />}
                title="AI 추천"
                description="당신의 취향을 학습하여 완벽한 플레이리스트를 만들어 드립니다"
              />
            </div>
          </div>
        </div>

        {/* Beta Notice */}
        <div className="mt-20 text-center">
          <p className="text-sm text-[#5b21b6]/70">
            현재 베타 서비스 중입니다. 등록된 베타 계정만 이용 가능합니다.
          </p>
          <div className="mt-4 flex items-center justify-center gap-6 text-sm">
            <Link href="/terms" className="text-[#5b21b6]/70 hover:text-[#5b21b6] transition-colors">
              이용약관
            </Link>
            <Link href="/privacy" className="text-[#5b21b6]/70 hover:text-[#5b21b6] transition-colors">
              개인정보처리방침
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode
  title: string
  description: string 
}) {
  return (
    <div className="group relative rounded-2xl bg-white/60 backdrop-blur-xl border border-white/80 p-6 transition-all hover:bg-white/80 shadow-lg">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#5b21b6]/20 text-[#5b21b6]">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-[#1e1b4b] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
        {title}
      </h3>
      <p className="text-sm text-[#4c1d95] leading-relaxed">
        {description}
      </p>
    </div>
  )
}
