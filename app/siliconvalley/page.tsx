"use client"

import Link from "next/link"
import { ArrowRight, LayoutDashboard, Users } from "lucide-react"

import { SvPageShell } from "@/components/siliconvalley/sv-page-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SILICONVALLEY_CHARACTERS } from "@/lib/siliconvalley-api"

export default function SiliconValleyHomePage() {
  return (
    <SvPageShell>
      <div className="mx-auto w-full max-w-4xl space-y-4">
        <p className="text-sm font-medium tracking-wide text-emerald-300/80">
          Lesson · Silicon Valley
        </p>
        <h1
          className="text-3xl font-bold tracking-tight text-white drop-shadow md:text-4xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          실리콘밸리 스타트업 분석
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-emerald-100/75 md:text-base">
          Pied Piper 팀 캐릭터별 hexagonal 모듈로 CEO 전략, 시스템, 대시보드, 운영,
          HR API를 탐색합니다.
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-4xl gap-4 sm:grid-cols-2">
        <Card className="border border-emerald-400/25 bg-zinc-950/35 text-white shadow-2xl shadow-black/25 backdrop-blur-xl ring-1 ring-emerald-400/15">
          <CardContent className="space-y-4 pt-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">어드민 대시보드</h2>
              <p className="mt-1 text-sm text-emerald-100/70">
                KPI, API 가동률, 캐릭터 헬스, 의도 분류 맵을 한 화면에서 확인합니다.
              </p>
            </div>
            <Button asChild className="bg-emerald-600 text-white hover:bg-emerald-500">
              <Link href="/admin">
                대시보드 열기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-emerald-400/25 bg-zinc-950/35 text-white shadow-2xl shadow-black/25 backdrop-blur-xl ring-1 ring-emerald-400/15">
          <CardContent className="space-y-4 pt-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">캐릭터</h2>
              <p className="mt-1 text-sm text-emerald-100/70">
                Hendricks, Gilfoyle, Dinesh, Dunn, Bighetti 모듈이 준비되어 있습니다.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="border-emerald-400/30 bg-transparent text-emerald-100 hover:bg-emerald-950/40 hover:text-white"
            >
              <Link href="/admin">캐릭터 상태 보기</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mx-auto w-full max-w-4xl border border-emerald-400/25 bg-zinc-950/35 text-white shadow-2xl shadow-black/25 backdrop-blur-xl ring-1 ring-emerald-400/15">
        <CardContent className="space-y-4 pt-6">
          <h2
            className="text-xl font-semibold tracking-tight text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            캐릭터 라인업
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {SILICONVALLEY_CHARACTERS.map((character) => (
              <li
                key={character.slug}
                className="rounded-lg border border-white/10 bg-black/20 px-4 py-3"
              >
                <p className="font-medium text-white">
                  {character.label}{" "}
                  <span className="text-emerald-300/80">({character.role})</span>
                </p>
                <p className="mt-1 text-xs text-emerald-100/65">{character.description}</p>
                <p className="mt-2 font-mono text-[11px] text-emerald-200/50">
                  {character.path}
                </p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </SvPageShell>
  )
}
