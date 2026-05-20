"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GoogleIcon } from "@/components/google-icon"
import { GlitchButton } from "@/components/landing/glitch-button"
import {
  AuthDivider,
  MaestroAuthLayout,
  authInputClassName,
  authOAuthButtonClassName,
} from "@/components/auth/maestro-auth-layout"
import { cn } from "@/lib/utils"

export default function SignupPage() {
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(
    null,
  )
  const [submitting, setSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <MaestroAuthLayout cardTitle="계정 만들기" lead="새 계정을 만드세요">
      <div className="mb-6 space-y-3">
        <Button type="button" variant="outline" className={authOAuthButtonClassName}>
          <GoogleIcon />
          Google로 계속하기
        </Button>
        <Button type="button" variant="outline" className={authOAuthButtonClassName}>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          Apple로 계속하기
        </Button>
      </div>

      <AuthDivider />

      <form
        ref={formRef}
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault()
          const form = formRef.current
          if (!form) return

          const data = new FormData(form)
          const email = String(data.get("email") ?? "").trim()
          const username = String(data.get("username") ?? "").trim()
          const nickname = String(data.get("nickname") ?? "").trim()
          const password = String(data.get("password") ?? "")

          if (!email || !username || !nickname || !password) {
            setMessage({ type: "err", text: "모든 항목을 입력해 주세요." })
            return
          }

          setSubmitting(true)
          setMessage(null)
          try {
            const res = await fetch("/api/signup", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email,
                username,
                nickname,
                password,
              }),
            })
            const json = (await res.json()) as {
              ok?: boolean
              message?: string
              error?: string
            }
            if (!res.ok) {
              throw new Error(json.error ?? `요청 실패 (${res.status})`)
            }
            setMessage({
              type: "ok",
              text: json.message ?? "회원가입이 완료되었습니다.",
            })
            form.reset()
          } catch (err) {
            setMessage({
              type: "err",
              text:
                err instanceof Error
                  ? err.message
                  : "회원가입 요청에 실패했습니다.",
            })
          } finally {
            setSubmitting(false)
          }
        }}
      >
        <Input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="이메일 주소"
          className={authInputClassName}
        />
        <Input
          type="text"
          name="username"
          autoComplete="username"
          placeholder="아이디"
          className={authInputClassName}
        />
        <Input
          type="text"
          name="nickname"
          autoComplete="nickname"
          placeholder="닉네임"
          className={authInputClassName}
        />
        <Input
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="비밀번호"
          className={authInputClassName}
        />
        {message && (
          <p
            className={cn(
              "rounded-none border px-3 py-2 text-sm",
              message.type === "ok"
                ? "border-cyan-500/30 bg-cyan-950/40 text-cyan-200"
                : "border-red-500/30 bg-red-950/40 text-red-300",
            )}
            role="status"
          >
            {message.text}
          </p>
        )}
        <GlitchButton
          type="submit"
          className="w-full disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? "가입 처리 중…" : "이메일로 가입하기"}
        </GlitchButton>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-400">
        이미 계정이 있으신가요?{" "}
        <Link
          href="/login"
          className="font-medium text-cyan-500/90 hover:text-cyan-400 hover:underline"
        >
          로그인
        </Link>
      </p>
    </MaestroAuthLayout>
  )
}
