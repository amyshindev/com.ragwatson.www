# -*- coding: utf-8 -*-
"""Restore UTF-8 corrupted by bulk cyan->maestro replace."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

FILES: dict[str, str] = {}

FILES["app/login/page.tsx"] = '''"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
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
import { setAuthUser } from "@/lib/auth-session"

export default function LoginPage() {
  const router = useRouter()

  return (
    <MaestroAuthLayout cardTitle="로그인" lead="계정에 로그인하세요">
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
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault()
          const data = new FormData(e.currentTarget)
          const email = String(data.get("email") ?? "").trim()
          const password = String(data.get("password") ?? "")

          if (!email || !password) {
            alert("이메일과 비밀번호를 입력해 주세요.")
            return
          }

          try {
            const res = await fetch("/api/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            })
            const json = (await res.json()) as {
              ok?: boolean
              message?: string
              error?: string
              user?: {
                id?: number
                email?: string
                username?: string
                nickname?: string
                role?: string
              }
            }
            if (!res.ok) {
              throw new Error(json.error ?? `요청 실패 (${res.status})`)
            }
            const user = json.user
            if (
              user?.id != null &&
              user.email &&
              user.username &&
              user.nickname &&
              user.role
            ) {
              setAuthUser({
                id: user.id,
                email: user.email,
                username: user.username,
                nickname: user.nickname,
                role: user.role,
              })
            }
            alert(
              [
                json.message ?? "로그인되었습니다.",
                "",
                user?.email ? `이메일: ${user.email}` : "",
                user?.username ? `아이디: ${user.username}` : "",
                user?.nickname ? `닉네임: ${user.nickname}` : "",
                user?.role ? `역할: ${user.role}` : "",
              ]
                .filter(Boolean)
                .join("\\n"),
            )
            router.push("/")
          } catch (err) {
            alert(
              err instanceof Error
                ? err.message
                : "로그인 요청에 실패했습니다.",
            )
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
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="비밀번호"
          className={authInputClassName}
        />
        <GlitchButton type="submit" className="w-full">
          이메일로 로그인
        </GlitchButton>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-400">
        계정이 없으신가요?{" "}
        <Link
          href="/signup"
          className="font-medium text-maestro-500/90 hover:text-maestro-400 hover:underline"
        >
          회원가입
        </Link>
      </p>
    </MaestroAuthLayout>
  )
}
'''

FILES["components/marketing/marketing-placeholder.tsx"] = '''import Link from "next/link"

type MarketingPlaceholderProps = {
  title: string
  lead?: string
  /** 기본 `/` 스튜디오 톤 하위 페이지 등에 재사용 */
  backHref?: string
  backLabel?: string
}

export function MarketingPlaceholder({
  title,
  lead = "콘텐츠를 준비 중입니다.",
  backHref = "/",
  backLabel = "홈으로",
}: MarketingPlaceholderProps) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 text-zinc-300">
      <h1
        className="text-3xl font-semibold tracking-tight text-zinc-100"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h1>
      <p className="mt-4 leading-relaxed text-zinc-500">{lead}</p>
      <Link
        href={backHref}
        className="mt-8 inline-block text-sm font-medium text-maestro-500/90 hover:text-maestro-400 hover:underline"
      >
        ← {backLabel}
      </Link>
    </div>
  )
}
'''

FILES["components/marketing/domain-form-shell.tsx"] = '''import Link from "next/link"
import type { ReactNode } from "react"

type DomainFormShellProps = {
  title: string
  lead?: string
  backHref?: string
  backLabel?: string
  children: ReactNode
}

export function DomainFormShell({
  title,
  lead,
  backHref = "/",
  backLabel = "홈으로",
  children,
}: DomainFormShellProps) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 text-zinc-300 md:py-16">
      <header className="mb-8">
        <h1
          className="text-3xl font-semibold tracking-tight text-zinc-100"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {title}
        </h1>
        {lead ? (
          <p className="mt-4 leading-relaxed text-zinc-500">{lead}</p>
        ) : null}
      </header>
      <div className="border border-white/10 bg-zinc-950/70 p-6 shadow-xl shadow-black/20 backdrop-blur-xl md:p-8">
        {children}
      </div>
      <Link
        href={backHref}
        className="mt-8 inline-block text-sm font-medium text-maestro-500/90 hover:text-maestro-400 hover:underline"
      >
        ← {backLabel}
      </Link>
    </div>
  )
}
'''

for rel, content in FILES.items():
    path = ROOT / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8", newline="\n")
    print("wrote", rel)
