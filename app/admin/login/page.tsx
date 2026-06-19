"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"
import { Input } from "@/components/ui/input"
import { GlitchButton } from "@/components/landing/glitch-button"
import {
  MaestroAuthLayout,
  authInputClassName,
} from "@/components/auth/maestro-auth-layout"
import { isAdminUser } from "@/lib/admin-auth"
import { setAuthUser } from "@/lib/auth-session"

function AdminLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const nextPath = searchParams.get("next") || "/admin"
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  return (
    <MaestroAuthLayout
      cardTitle="관리자 로그인"
      lead="관리자(role: admin) 계정만 운영 페이지에 접근할 수 있습니다."
    >
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault()
          const form = e.currentTarget
          const data = new FormData(form)
          const email = String(data.get("email") ?? "").trim()
          const password = String(data.get("password") ?? "")

          if (!email || !password) {
            setError("이메일과 비밀번호를 입력해 주세요.")
            return
          }

          setSubmitting(true)
          setError(null)

          try {
            const res = await fetch("/api/admin/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            })
            const json = (await res.json()) as {
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
              user?.id == null ||
              !user.email ||
              !user.username ||
              !user.nickname ||
              !user.role
            ) {
              throw new Error("로그인 응답이 올바르지 않습니다.")
            }

            const sessionUser = {
              id: user.id,
              email: user.email,
              username: user.username,
              nickname: user.nickname,
              role: user.role,
            }

            if (!isAdminUser(sessionUser)) {
              setError("관리자 권한이 없는 계정입니다.")
              return
            }

            setAuthUser(sessionUser)
            router.replace(
              nextPath.startsWith("/admin") ? nextPath : "/admin",
            )
          } catch (err) {
            setError(
              err instanceof Error
                ? err.message
                : "로그인 요청에 실패했습니다.",
            )
          } finally {
            setSubmitting(false)
          }
        }}
      >
        {error && (
          <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300" role="status">
            {error}
          </p>
        )}
        <Input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="관리자 이메일"
          className={authInputClassName}
          required
        />
        <Input
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="비밀번호"
          className={authInputClassName}
          required
        />
        <GlitchButton type="submit" className="w-full" disabled={submitting}>
          {submitting ? "로그인 중…" : "관리자 로그인"}
        </GlitchButton>
      </form>

      <p className="mt-4 text-center text-xs text-zinc-500">
        로컬 개발 기본 계정: admin@example.com / admin1234
      </p>

      <p className="mt-6 text-center text-xs text-zinc-500">
        일반 회원은{" "}
        <Link
          href="/login"
          className="text-maestro-500/90 hover:text-maestro-400 hover:underline"
        >
          서비스 로그인
        </Link>
        을 이용하세요. 이 URL은 GNB에 노출되지 않습니다.
      </p>
    </MaestroAuthLayout>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-sm text-zinc-500">
          로딩 중…
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  )
}
