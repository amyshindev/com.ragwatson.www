"use client"

import { Music, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e1432] via-[#2a1f4e] to-[#1e1432]" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#4A3AFF]/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#FFD6FF]/20 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span>돌아가기</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Signup Form */}
      <main className="relative flex min-h-screen items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center text-center mb-10">
            {/* Logo */}
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10">
              <Music className="h-10 w-10 text-primary" />
            </div>
            <h1 
              className="text-3xl md:text-4xl font-extrabold text-foreground mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              maestro
            </h1>
            <p className="text-muted-foreground">
              your personal soundtrack
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8">
            <h2 className="text-xl font-semibold text-foreground mb-6 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
              계정 만들기
            </h2>

            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <Button 
                variant="outline" 
                className="w-full border-white/20 bg-white/5 hover:bg-white/10 text-foreground py-6 gap-3"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google로 계속하기
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-white/20 bg-white/5 hover:bg-white/10 text-foreground py-6 gap-3"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Apple로 계속하기
              </Button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-sm text-muted-foreground">또는</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Email Form */}
            <form className="space-y-4">
              <div>
                <Input 
                  type="email" 
                  placeholder="이메일 주소"
                  className="bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground py-6"
                />
              </div>
              <div>
                <Input 
                  type="password" 
                  placeholder="비밀번호"
                  className="bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground py-6"
                />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6">
                이메일로 가입하기
              </Button>
            </form>

            {/* Login Link */}
            <p className="mt-6 text-center text-sm text-muted-foreground">
              이미 계정이 있으신가요?{" "}
              <Link href="/login" className="text-primary hover:underline">
                로그인
              </Link>
            </p>
          </div>

          {/* Beta Notice */}
          <p className="mt-6 text-center text-xs text-muted-foreground/70">
            현재 베타 서비스 중입니다. 등록된 베타 계정만 이용 가능합니다.
          </p>

          {/* Terms */}
          <div className="mt-4 flex items-center justify-center gap-4 text-xs">
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
