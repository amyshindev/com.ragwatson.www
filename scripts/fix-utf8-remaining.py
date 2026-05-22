# -*- coding: utf-8 -*-
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

FILES: dict[str, str] = {}

FILES["components/auth/maestro-auth-layout.tsx"] = '''"use client"

import { Music } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"
import { MaestroDarkBackdrop } from "@/components/maestro-dark-backdrop"

export const authInputClassName =
  "rounded-none border-zinc-700 bg-black/40 py-6 text-zinc-100 shadow-none placeholder:text-zinc-500 focus-visible:border-maestro-500/50 focus-visible:ring-maestro-500/20"

export const authOAuthButtonClassName =
  "inline-flex w-full items-center justify-center gap-2 rounded-none border border-zinc-700 bg-transparent px-4 py-6 text-sm font-medium text-zinc-300 shadow-none transition-colors hover:border-zinc-500 hover:bg-white/5 hover:text-zinc-100"

type MaestroAuthLayoutProps = {
  cardTitle: string
  lead: string
  children: ReactNode
}

export function MaestroAuthLayout({
  cardTitle,
  lead,
  children,
}: MaestroAuthLayoutProps) {
  return (
    <div className="relative -mt-20 min-h-screen overflow-hidden bg-[#0a0a0a] text-zinc-300">
      <MaestroDarkBackdrop />

      <main className="relative flex min-h-[100dvh] min-h-[100svh] items-center justify-center px-6 py-24">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900/50 shadow-sm">
              <Music className="h-10 w-10 text-maestro-400" strokeWidth={1.25} />
            </div>
            <h1
              className="text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              maestro
            </h1>
          </div>

          <p className="mb-5 text-center text-sm text-zinc-500">{lead}</p>

          <div className="border border-white/10 bg-zinc-950/60 p-8 shadow-xl shadow-black/40 backdrop-blur-xl">
            <h2
              className="mb-6 text-center text-xl font-semibold text-zinc-100"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {cardTitle}
            </h2>
            {children}
          </div>

          <p className="mt-6 text-center text-xs text-zinc-500">
            현재 베타 서비스 중입니다. 등록된 베타 계정만 이용 가능합니다.
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-zinc-500">
            <Link
              href="/terms"
              className="text-maestro-500/90 hover:text-maestro-400 hover:underline"
            >
              이용약관
            </Link>
            <span className="text-zinc-700" aria-hidden>
              {" "}
              &middot;{" "}
            </span>
            <Link
              href="/privacy"
              className="text-maestro-500/90 hover:text-maestro-400 hover:underline"
            >
              개인정보처리방침
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export function AuthDivider() {
  return (
    <div className="mb-6 flex items-center gap-4">
      <div className="h-px flex-1 bg-zinc-800" />
      <span className="text-sm text-zinc-500">또는</span>
      <div className="h-px flex-1 bg-zinc-800" />
    </div>
  )
}
'''

FILES["app/signup/page.tsx"] = '''"use client"

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
                ? "border-maestro-500/30 bg-maestro-950/40 text-maestro-200"
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
          className="font-medium text-maestro-500/90 hover:text-maestro-400 hover:underline"
        >
          로그인
        </Link>
      </p>
    </MaestroAuthLayout>
  )
}
'''

FILES["app/studio/page.tsx"] = '''import Link from "next/link"
import { BarChart3, Library, Sparkles } from "lucide-react"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const hubs = [
  {
    href: "/studio/analytics",
    title: "AI 오디오 분석 대시보드",
    role: "음원 업로드 직후, AI가 분석한 음악의 유전자 데이터를 먼저 확인합니다.",
    detail:
      "곡의 하이라이트 구간 파형, 감정 지수(우울함·파괴적·몽환적 등), 추출된 주 장르가 차트와 텍스트 태그로 표현됩니다.",
    Icon: BarChart3,
  },
  {
    href: "/studio/workspace",
    title: "비주얼 커스텀 워크스페이스",
    role: "AI 아트웍을 미세 조정하고 생성하는 핵심 툴 페이지입니다.",
    detail:
      "중앙의 스포티파이 9:16 미리보기와 우측 커스텀 패널(글리치 강도, 네온 팔레트, 파편화 비트 등)로 무드를 다듬습니다.",
    Icon: Sparkles,
  },
  {
    href: "/library",
    title: "마이 아카이브",
    role: "업로드한 프로젝트와 완성된 비주얼을 관리하는 개인 저장소입니다.",
    detail:
      "4K 영상 다운로드, 지난 프로젝트 다시 편집, 과거 오디오 분석 히스토리 조회를 제공할 예정입니다.",
    Icon: Library,
  },
] as const

export default function StudioPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 text-zinc-300 md:py-16">
      <header className="mb-10 text-center md:mb-14">
        <p className="text-xs font-bold uppercase tracking-wider text-maestro-500/90">
          Studio
        </p>
        <h1
          className="mt-2 text-3xl font-semibold tracking-tight text-zinc-100 md:text-4xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          비주얼 스튜디오
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500 md:text-base">
          작업 흐름에 맞게 분석 대시보드, 커스텀 워크스페이스, 아카이브로
          이동하세요.
        </p>
      </header>

      <ul className="grid gap-6 md:grid-cols-1 md:gap-8 lg:grid-cols-3">
        {hubs.map(({ href, title, role, detail, Icon }) => (
          <li key={href}>
            <Link href={href} className="group block h-full outline-none">
              <Card className="h-full border-white/10 bg-zinc-950/60 py-0 shadow-lg shadow-black/30 backdrop-blur-xl transition-colors hover:border-maestro-500/35 hover:bg-zinc-950/80">
                <CardHeader className="gap-4 px-6 py-6">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-zinc-700 bg-black/40 text-maestro-400 transition-colors group-hover:border-maestro-500/40 group-hover:text-maestro-300">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="text-xs font-medium text-zinc-600 transition-colors group-hover:text-maestro-500/80">
                      이동 →
                    </span>
                  </div>
                  <div>
                    <CardTitle
                      className="text-lg text-zinc-100"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {title}
                    </CardTitle>
                    <CardDescription className="mt-2 text-pretty text-sm leading-relaxed text-zinc-500">
                      {role}
                    </CardDescription>
                  </div>
                  <p className="text-pretty text-xs leading-relaxed text-zinc-600">
                    {detail}
                  </p>
                </CardHeader>
              </Card>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-12 text-center text-sm text-zinc-600">
        <Link
          href="/"
          className="font-medium text-maestro-500/90 hover:text-maestro-400 hover:underline"
        >
          ← 홈으로
        </Link>
      </p>
    </div>
  )
}
'''

FILES["components/hero-showcase-section.tsx"] = '''"use client"

import { useState } from "react"
import {
  ArrowRight,
  Brain,
  FileAudio,
  Play,
  Repeat2,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

const GENRES = [
  {
    id: "industrial",
    label: "Industrial Rock",
    hint: "마우스를 올려 미리보기",
    gradient:
      "bg-gradient-to-br from-zinc-900 via-red-950/90 to-zinc-800",
  },
  {
    id: "electronica",
    label: "Electronica",
    hint: "마우스를 올려 미리보기",
    gradient:
      "bg-gradient-to-br from-violet-950 via-fuchsia-900/80 to-maestro-950",
  },
  {
    id: "citypop",
    label: "City Pop",
    hint: "마우스를 올려 미리보기",
    gradient:
      "bg-gradient-to-br from-rose-400 via-orange-300 to-sky-400",
    featured: true,
  },
  {
    id: "synthpop",
    label: "Synth Pop",
    hint: "마우스를 올려 미리보기",
    gradient:
      "bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-900",
  },
] as const

const STEPS = [
  {
    icon: FileAudio,
    title: "1. Drop Audio",
    description: "원본 파일 업로드",
  },
  {
    icon: Brain,
    title: "2. AI Analyzes Aesthetic",
    description: "AI가 무드·리듬 분석",
  },
  {
    icon: Repeat2,
    title: "3. Get Loop",
    description: "캔버스·루프용 영상 생성",
  },
] as const

export function HeroShowcaseSection() {
  const [activeGenre, setActiveGenre] = useState<string>("citypop")

  return (
    <div className="mt-14 w-full max-w-5xl space-y-12 text-left">
      <div>
        <h2
          className="text-center text-lg font-semibold text-slate-900 sm:text-xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          장르별 미학 인터페이스
        </h2>

        <div className="mt-5 -mx-2 flex gap-3 overflow-x-auto px-2 pb-2 scrollbar-thin sm:justify-center sm:overflow-visible sm:pb-0">
          {GENRES.map((genre) => {
            const isActive = activeGenre === genre.id
            const isFeatured = "featured" in genre && genre.featured

            return (
              <button
                key={genre.id}
                type="button"
                onClick={() => setActiveGenre(genre.id)}
                className={cn(
                  "group relative h-36 w-28 shrink-0 overflow-hidden text-center transition-transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] sm:h-40 sm:w-32",
                  isActive && "ring-2 ring-[#2563eb] ring-offset-2 ring-offset-transparent",
                )}
              >
                <div
                  className={cn("absolute inset-0", genre.gradient)}
                  aria-hidden
                />
                <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/15" />
                {isFeatured && isActive && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/90 bg-white/10 backdrop-blur-sm">
                      <Play className="h-4 w-4 fill-white text-white" />
                    </span>
                  </div>
                )}
                <div className="relative flex h-full flex-col items-center justify-center gap-1 px-2 py-3">
                  <p className="text-sm font-bold leading-tight text-white drop-shadow-md sm:text-base">
                    {genre.label}
                  </p>
                  <p className="text-[10px] leading-snug text-white/85 sm:text-[11px]">
                    {genre.hint}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <h2
          className="text-center text-lg font-semibold text-slate-900 sm:text-xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          서비스 이용 절차
        </h2>

        <div className="mt-8 flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-4">
          {STEPS.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="flex items-center gap-4 sm:gap-4">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center text-[#38bdf8] sm:h-[4.5rem] sm:w-[4.5rem]">
                    <Icon
                      className="h-12 w-12 stroke-[1.25] sm:h-14 sm:w-14"
                      strokeWidth={1.25}
                    />
                  </div>
                  <p className="mt-2 text-sm font-medium text-slate-800 sm:text-base">
                    {step.title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">{step.description}</p>
                </div>
                {index < STEPS.length - 1 && (
                  <ArrowRight
                    className="hidden h-5 w-5 shrink-0 text-slate-400 sm:block"
                    aria-hidden
                  />
                )}
              </div>
            )
          })}
          <Sparkles
            className="hidden h-4 w-4 text-slate-400/80 sm:ml-2 sm:block"
            aria-hidden
          />
        </div>
      </div>
    </div>
  )
}
'''

FILES["components/domain-forms/domain-forms.tsx"] = '''"use client"

import { type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const fieldClass =
  "rounded-none border-zinc-700 bg-black/40 text-zinc-100 shadow-none placeholder:text-zinc-500 focus-visible:border-maestro-500/50 focus-visible:ring-maestro-500/20 md:text-sm"

const selectClass = cn(
  fieldClass,
  "h-9 w-full px-3 py-2 outline-none [&>option]:bg-zinc-950",
)

function backendBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:8000"
  ).replace(/\\/$/, "")
}

function formatApiError(status: number, raw: string): string {
  try {
    const data = JSON.parse(raw) as { detail?: unknown }
    const { detail } = data
    if (typeof detail === "string") return detail
    if (Array.isArray(detail)) {
      return detail
        .map((item) => {
          if (item && typeof item === "object" && "msg" in item) {
            return String((item as { msg: unknown }).msg)
          }
          return ""
        })
        .filter(Boolean)
        .join("\\n")
    }
  } catch {
    /* fallback below */
  }
  const preview = raw.trim().slice(0, 180).replace(/\\s+/g, " ")
  return preview ? `HTTP ${status}: ${preview}` : `요청 실패 (HTTP ${status})`
}

async function submitDomainForm(
  e: FormEvent<HTMLFormElement>,
  path: string,
  successLabel: string,
) {
  e.preventDefault()
  const form = e.currentTarget
  const fd = new FormData(form)
  const body: Record<string, string> = {}
  fd.forEach((value, key) => {
    body[key] = typeof value === "string" ? value : ""
  })
  const url = `${backendBaseUrl()}${path}`
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const raw = await res.text()
    if (!res.ok) {
      window.alert(`${successLabel}\\n\\n${formatApiError(res.status, raw)}`)
      return
    }
    let parsed: { id?: number; kind?: string } = {}
    if (raw) {
      try {
        parsed = JSON.parse(raw) as typeof parsed
      } catch {
        parsed = {}
      }
    }
    window.alert(
      `${successLabel}\\n\\n저장 완료 · DB id=${parsed.id ?? "?"} (${parsed.kind ?? ""})`,
    )
    form.reset()
  } catch {
    window.alert(
      `${successLabel}\\n\\n백엔드에 연결할 수 없습니다. FastAPI(기본 127.0.0.1:8000) 실행 여부와 NEXT_PUBLIC_BACKEND_URL 값을 확인하세요.`,
    )
  }
}

export function LibraryDataForm() {
  return (
    <form
      className="grid gap-5"
      onSubmit={(e) => submitDomainForm(e, "/api/domain/library", "마이 아카이브")}
    >
      <div className="grid gap-2">
        <Label htmlFor="library-title" className="text-zinc-400">
          프로젝트 이름
        </Label>
        <Input
          id="library-title"
          name="projectTitle"
          required
          placeholder="예: 앨범 A 캔버스 루프 v2"
          className={fieldClass}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="library-memo" className="text-zinc-400">
          메모
        </Label>
        <Textarea
          id="library-memo"
          name="memo"
          rows={3}
          placeholder="폴더 버전, 출시일 메모 등"
          className={fieldClass}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="library-tags" className="text-zinc-400">
          태그 (쉼표로 구분)
        </Label>
        <Input
          id="library-tags"
          name="tags"
          placeholder="electronica, canvas, loop"
          className={fieldClass}
        />
      </div>
      <Button
        type="submit"
        variant="outline"
        className="mt-2 w-full rounded-none border-zinc-600 bg-zinc-900/80 text-zinc-100 hover:bg-zinc-800 hover:text-white"
      >
        등록
      </Button>
    </form>
  )
}

export function StudioWorkspaceDataForm() {
  return (
    <form
      className="grid gap-5"
      onSubmit={(e) =>
        submitDomainForm(e, "/api/domain/studio/workspace", "워크스페이스")
      }
    >
      <div className="grid gap-2">
        <Label htmlFor="ws-name" className="text-zinc-400">
          작업 / 프리셋 이름
        </Label>
        <Input
          id="ws-name"
          name="workspaceName"
          required
          placeholder="예: Neon break draft"
          className={fieldClass}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="ws-glitch" className="text-zinc-400">
          글리치 강도 (0–100)
        </Label>
        <Input
          id="ws-glitch"
          name="glitchIntensity"
          type="number"
          min={0}
          max={100}
          defaultValue={42}
          className={fieldClass}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="ws-notes" className="text-zinc-400">
          커스텀 노트
        </Label>
        <Textarea
          id="ws-notes"
          name="notes"
          rows={4}
          placeholder="프레임, 비트 트리거,보내기 규격 등"
          className={fieldClass}
        />
      </div>
      <Button
        type="submit"
        variant="outline"
        className="mt-2 w-full rounded-none border-zinc-600 bg-zinc-900/80 text-zinc-100 hover:bg-zinc-800 hover:text-white"
      >
        저장
      </Button>
    </form>
  )
}

export function StudioAnalyticsDataForm() {
  return (
    <form
      className="grid gap-5"
      onSubmit={(e) =>
        submitDomainForm(e, "/api/domain/studio/analytics", "오디오 분석")
      }
    >
      <div className="grid gap-2">
        <Label htmlFor="an-track" className="text-zinc-400">
          트랙 / 작업명
        </Label>
        <Input
          id="an-track"
          name="trackTitle"
          required
          placeholder="곡 제목 또는 임시 ID"
          className={fieldClass}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="an-bpm" className="text-zinc-400">
          BPM
        </Label>
        <Input
          id="an-bpm"
          name="bpm"
          type="number"
          min={1}
          placeholder="120"
          className={fieldClass}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="an-mood" className="text-zinc-400">
          무드
        </Label>
        <select id="an-mood" name="mood" className={selectClass} required defaultValue="">
          <option value="" disabled>
            선택
          </option>
          <option value="dreamy">몽환적</option>
          <option value="aggressive">파괴적 / 강렬</option>
          <option value="melancholic">우울·정적</option>
          <option value="bright">밝음·에너지</option>
        </select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="an-genre" className="text-zinc-400">
          장르 태그
        </Label>
        <Input
          id="an-genre"
          name="genre"
          placeholder="예: Progressive, Industrial"
          className={fieldClass}
        />
      </div>
      <Button
        type="submit"
        variant="outline"
        className="mt-2 w-full rounded-none border-zinc-600 bg-zinc-900/80 text-zinc-100 hover:bg-zinc-800 hover:text-white"
      >
        분석 결과 저장
      </Button>
    </form>
  )
}

export function GalleryEntryForm() {
  return (
    <form
      className="grid gap-5"
      onSubmit={(e) => submitDomainForm(e, "/api/domain/gallery", "갤러리 등록")}
    >
      <div className="grid gap-2">
        <Label htmlFor="gal-title" className="text-zinc-400">
          작품 제목
        </Label>
        <Input
          id="gal-title"
          name="workTitle"
          required
          className={fieldClass}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="gal-artist" className="text-zinc-400">
          아티스트명
        </Label>
        <Input id="gal-artist" name="artist" required className={fieldClass} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="gal-genre" className="text-zinc-400">
          장르 · 태그
        </Label>
        <Input
          id="gal-genre"
          name="genreTags"
          placeholder="Industrial, Canvas"
          className={fieldClass}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="gal-url" className="text-zinc-400">
          미디어 URL (9:16 루프)
        </Label>
        <Input
          id="gal-url"
          name="mediaUrl"
          type="url"
          placeholder="https://"
          className={fieldClass}
        />
      </div>
      <Button
        type="submit"
        variant="outline"
        className="mt-2 w-full rounded-none border-zinc-600 bg-zinc-900/80 text-zinc-100 hover:bg-zinc-800 hover:text-white"
      >
        갤러리에 제출
      </Button>
    </form>
  )
}

export function MagazineArticleForm() {
  return (
    <form
      className="grid gap-5"
      onSubmit={(e) => submitDomainForm(e, "/api/domain/magazine", "매거진 기사")}
    >
      <div className="grid gap-2">
        <Label htmlFor="mag-title" className="text-zinc-400">
          기사 제목
        </Label>
        <Input id="mag-title" name="articleTitle" required className={fieldClass} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="mag-author" className="text-zinc-400">
          저자
        </Label>
        <Input id="mag-author" name="author" required className={fieldClass} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="mag-excerpt" className="text-zinc-400">
          요약
        </Label>
        <Textarea
          id="mag-excerpt"
          name="excerpt"
          rows={2}
          className={fieldClass}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="mag-body" className="text-zinc-400">
          본문
        </Label>
        <Textarea id="mag-body" name="body" rows={8} className={fieldClass} />
      </div>
      <Button
        type="submit"
        variant="outline"
        className="mt-2 w-full rounded-none border-zinc-600 bg-zinc-900/80 text-zinc-100 hover:bg-zinc-800 hover:text-white"
      >
        초안 저장
      </Button>
    </form>
  )
}

export function FaqEntryForm() {
  return (
    <form
      className="grid gap-5"
      onSubmit={(e) => submitDomainForm(e, "/api/domain/faq", "FAQ")}
    >
      <div className="grid gap-2">
        <Label htmlFor="faq-cat" className="text-zinc-400">
          카테고리
        </Label>
        <Input
          id="faq-cat"
          name="category"
          placeholder="캔버스, 계정, 요금 ..."
          className={fieldClass}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="faq-q" className="text-zinc-400">
          질문
        </Label>
        <Textarea id="faq-q" name="question" rows={2} required className={fieldClass} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="faq-a" className="text-zinc-400">
          답변
        </Label>
        <Textarea id="faq-a" name="answer" rows={6} required className={fieldClass} />
      </div>
      <Button
        type="submit"
        variant="outline"
        className="mt-2 w-full rounded-none border-zinc-600 bg-zinc-900/80 text-zinc-100 hover:bg-zinc-800 hover:text-white"
      >
        FAQ 등록
      </Button>
    </form>
  )
}
'''

for rel, content in FILES.items():
    path = ROOT / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8", newline="\n")
    print("wrote", rel)

# verify
bad = []
for rel in FILES:
    p = ROOT / rel
    try:
        p.read_text(encoding="utf-8")
    except UnicodeDecodeError as e:
        bad.append((rel, e))
if bad:
    print("STILL BAD:", bad)
else:
    print("all ok")
