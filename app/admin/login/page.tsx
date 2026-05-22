"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"
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

  return (
    <MaestroAuthLayout
      cardTitle="관리자 로그인"
      lead="관리자(role: admin) 계정만 운영 페이지에 접근할 수 있습니다."
    >
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
              alert("관리자 권한이 없는 계정입니다.")
              return
            }

            setAuthUser(sessionUser)
            router.replace(
              nextPath.startsWith("/admin") ? nextPath : "/admin",
            )
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
        <GlitchButton type="submit" className="w-full">
          관리자 로그인
        </GlitchButton>
      </form>

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
