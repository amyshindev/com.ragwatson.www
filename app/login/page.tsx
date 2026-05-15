"use client"

import { Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { MaestroLightBackdrop } from "@/components/maestro-light-backdrop"

export default function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden text-slate-900">
      <MaestroLightBackdrop />

      <main className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-[24px] border border-white/70 bg-white/50 shadow-lg shadow-slate-900/5 backdrop-blur-xl">
              <Music className="h-10 w-10 text-[#1d4ed8]" />
            </div>
            <h1
              className="mb-1 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              maestro
            </h1>
            <p className="text-slate-500">your personal soundtrack</p>
          </div>

          <p className="mb-5 text-center text-sm text-slate-500">계정에 로그인하세요</p>

          <div className="rounded-[28px] border border-white/70 bg-white/50 p-8 shadow-xl shadow-slate-900/10 backdrop-blur-xl">
            <h2
              className="mb-6 text-center text-xl font-semibold text-slate-900"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              로그인
            </h2>

            <div className="mb-6 space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full rounded-full border-white/80 bg-white/45 py-6 text-slate-800 shadow-sm backdrop-blur-sm hover:bg-white/75"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google로 계속하기
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full rounded-full border-white/80 bg-white/45 py-6 text-slate-800 shadow-sm backdrop-blur-sm hover:bg-white/75"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Apple로 계속하기
              </Button>
            </div>

            <div className="mb-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200/80" />
              <span className="text-sm text-slate-500">또는</span>
              <div className="h-px flex-1 bg-slate-200/80" />
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              <div>
                <Input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="이메일 주소"
                  className="rounded-2xl border-slate-200/90 bg-white/60 py-6 text-slate-900 placeholder:text-slate-400 backdrop-blur-sm"
                />
              </div>
              <div>
                <Input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="비밀번호"
                  className="rounded-2xl border-slate-200/90 bg-white/60 py-6 text-slate-900 placeholder:text-slate-400 backdrop-blur-sm"
                />
              </div>
              <Button
                type="submit"
                className="w-full rounded-full bg-[#2563eb] py-6 font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-[#1d4ed8]"
              >
                이메일로 로그인
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              계정이 없으신가요?{" "}
              <Link href="/signup" className="font-medium text-[#2563eb] hover:underline">
                회원가입
              </Link>
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-slate-600">
            등록된 베타 계정만 이용할 수 있습니다.
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-600">
            <Link href="/terms" className="font-medium text-[#2563eb] hover:underline">
              이용약관
            </Link>
            <span className="text-slate-400">·</span>
            <Link href="/privacy" className="font-medium text-[#2563eb] hover:underline">
              개인정보처리방침
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
