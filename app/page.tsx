"use client"

import { Music, Sparkles, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function BrandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated Curved Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e1432] via-[#2a1f4e] to-[#1e1432]" />
        
        {/* Animated Curves SVG */}
        <svg 
          className="absolute inset-0 w-full h-full opacity-40"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="curve1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
              <stop offset="50%" stopColor="#c084fc" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="curve2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ec4899" stopOpacity="0" />
              <stop offset="50%" stopColor="#f9a8d4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="curve3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
              <stop offset="50%" stopColor="#a5b4fc" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Curve 1 - Top flowing curve */}
          <path 
            d="M-100,200 Q300,100 720,250 T1540,200"
            fill="none"
            stroke="url(#curve1)"
            strokeWidth="2"
            className="animate-[flow_8s_ease-in-out_infinite]"
          />
          <path 
            d="M-100,220 Q350,120 720,270 T1540,220"
            fill="none"
            stroke="url(#curve1)"
            strokeWidth="1.5"
            className="animate-[flow_8s_ease-in-out_infinite_0.5s]"
          />
          
          {/* Curve 2 - Middle flowing curve */}
          <path 
            d="M-100,450 Q400,350 720,500 T1540,450"
            fill="none"
            stroke="url(#curve2)"
            strokeWidth="2.5"
            className="animate-[flow_10s_ease-in-out_infinite_1s]"
          />
          <path 
            d="M-100,480 Q450,380 720,530 T1540,480"
            fill="none"
            stroke="url(#curve2)"
            strokeWidth="1.5"
            className="animate-[flow_10s_ease-in-out_infinite_1.5s]"
          />
          
          {/* Curve 3 - Bottom flowing curve */}
          <path 
            d="M-100,700 Q300,600 720,750 T1540,700"
            fill="none"
            stroke="url(#curve3)"
            strokeWidth="2"
            className="animate-[flow_12s_ease-in-out_infinite_2s]"
          />
          <path 
            d="M-100,730 Q350,630 720,780 T1540,730"
            fill="none"
            stroke="url(#curve3)"
            strokeWidth="1.5"
            className="animate-[flow_12s_ease-in-out_infinite_2.5s]"
          />
        </svg>
        
        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-[#7c3aed]/15 blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-[#ec4899]/15 blur-[130px] animate-pulse" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* Hero Section */}
      <main className="relative pt-12 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center text-center">
            {/* Logo Icon */}
            <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl">
              <Music className="h-12 w-12 text-primary" />
            </div>

            {/* Title */}
            <h1 
              className="text-5xl md:text-7xl font-extrabold text-foreground mb-4 tracking-tight"
              style={{ fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}
            >
              maestro
            </h1>

            {/* Tagline */}
            <p className="text-lg md:text-xl text-muted-foreground mb-12">
              your personal soundtrack
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-20">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-6 text-lg gap-2">
                <Play className="h-5 w-5" />
                시작하기
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-foreground px-8 py-6 text-lg">
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
          <p className="text-sm text-muted-foreground/80">
            현재 베타 서비스 중입니다. 등록된 베타 계정만 이용 가능합니다.
          </p>
          <div className="mt-4 flex items-center justify-center gap-6 text-sm">
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              이용약관
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
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
    <div className="group relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 transition-all hover:bg-white/10 hover:border-white/20">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )
}
