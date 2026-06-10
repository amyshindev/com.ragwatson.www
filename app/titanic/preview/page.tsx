"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  fetchMyself,
  type MyselfResponse,
  TITANIC_MYSELF_ENDPOINTS,
} from "@/lib/titanic-api"

type CharacterRow = {
  slug: string
  label: string
  path: string
  data: MyselfResponse | null
  error: string | null
}

export default function TitanicPreviewPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rows, setRows] = useState<CharacterRow[]>([])

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true)
      setError(null)

      try {
        const results = await Promise.all(
          TITANIC_MYSELF_ENDPOINTS.map(async (character) => {
            try {
              const data = await fetchMyself(character.path)
              return {
                ...character,
                data,
                error: null,
              }
            } catch (err) {
              return {
                ...character,
                data: null,
                error: err instanceof Error ? err.message : "요청 실패",
              }
            }
          }),
        )
        setRows(results)
      } catch {
        setError("네트워크 오류가 발생했습니다.")
        setRows([])
      } finally {
        setLoading(false)
      }
    }

    void loadAll()
  }, [])

  return (
    <div className="relative -mt-20 min-h-screen overflow-x-hidden">
      <div
        className="fixed inset-0 scale-105 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/titanic-ship-bg.png)",
          filter: "grayscale(1) brightness(0.32) contrast(1.12)",
        }}
        aria-hidden
      />
      <div
        className="fixed inset-0 bg-gradient-to-b from-black/82 via-zinc-950/88 to-black/92"
        aria-hidden
      />

      <div className="relative z-10 mt-20 w-full px-4 py-8 pb-16 text-white md:px-6">
        <div className="mx-auto flex w-full max-w-6xl gap-6">
          <aside className="sticky top-24 hidden h-fit w-52 rounded-xl border border-blue-400/20 bg-zinc-950/45 p-3 backdrop-blur md:block">
            <p className="mb-2 text-xs font-semibold tracking-wide text-blue-200/75">섹션</p>
            <nav className="space-y-1">
              <Link
                href="/titanic"
                className="block rounded-md px-3 py-2 text-sm text-white/85 transition hover:bg-white/10 hover:text-white"
              >
                1. 데이터 수집
              </Link>
              <Link
                href="/titanic/preview"
                className="block rounded-md bg-white/10 px-3 py-2 text-sm text-white"
              >
                2. 캐릭터 자기소개
              </Link>
              <Link
                href="/titanic/smith"
                className="block rounded-md px-3 py-2 text-sm text-white/85 transition hover:bg-white/10 hover:text-white"
              >
                3. 스미스 선장과 대화
              </Link>
            </nav>
          </aside>

          <div className="w-full space-y-8">
            <div className="mx-auto w-full max-w-4xl">
              <h1
                className="text-2xl font-bold tracking-tight text-white drop-shadow md:text-3xl"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                타이타닉 모델 분석
              </h1>
            </div>

            <Card className="mx-auto w-full max-w-4xl border border-blue-400/25 bg-zinc-950/35 text-white shadow-2xl shadow-black/25 backdrop-blur-xl ring-1 ring-blue-400/15 supports-[backdrop-filter]:bg-zinc-950/25">
              <CardContent className="space-y-4 pt-6">
                <div>
                  <h2
                    className="text-xl font-semibold tracking-tight text-white md:text-2xl"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    2. 캐릭터 자기소개
                  </h2>
                  <p className="mt-2 text-sm text-blue-100/75">
                    각 캐릭터의 <code className="text-blue-200">/titanic/&#123;slug&#125;/myself</code>{" "}
                    응답입니다.
                  </p>
                </div>

                {loading && <p className="text-sm text-blue-100/80">자료를 불러오는 중입니다...</p>}
                {error && <p className="text-sm text-red-200">{error}</p>}

                {!loading && !error && rows.length > 0 && (
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/15 hover:bg-white/5">
                        <TableHead className="text-blue-200/95">캐릭터</TableHead>
                        <TableHead className="text-blue-200/95">endpoint</TableHead>
                        <TableHead className="text-blue-200/95">id</TableHead>
                        <TableHead className="text-blue-200/95">name</TableHead>
                        <TableHead className="text-blue-200/95">상태</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.slug} className="border-white/10 hover:bg-white/5">
                          <TableCell className="text-white/90">{row.label}</TableCell>
                          <TableCell className="max-w-[180px] truncate font-mono text-xs text-blue-100/85">
                            {row.path}
                          </TableCell>
                          <TableCell className="text-white/90">
                            {row.data?.id ?? "-"}
                          </TableCell>
                          <TableCell className="text-white/90">
                            {row.data?.name ?? "-"}
                          </TableCell>
                          <TableCell className="text-white/90">
                            {row.error ? (
                              <span className="text-red-200">{row.error}</span>
                            ) : (
                              <span className="text-emerald-200">ok</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
