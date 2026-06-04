"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type WalterMyself = {
  id: number
  name: string
  memo: string
}

const DEFAULT_WALTER: WalterMyself = {
  id: 1,
  name: "Walter",
  memo: "월터는 타이타닉의 승무원이다.",
}

export default function TitanicPreviewPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000"
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [walter, setWalter] = useState<WalterMyself | null>(null)

  useEffect(() => {
    const loadMyself = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`${apiBase}/api/walter/v1/myself`, {
          method: "GET",
          headers: { "Cache-Control": "no-cache" },
        })
        const raw = await res.text()
        const data = (raw ? JSON.parse(raw) : null) as {
          detail?: string
          id?: number
          name?: string
          memo?: string
        } | null

        if (!res.ok) {
          setError(data?.detail ?? "자료를 불러오지 못했습니다.")
          setWalter(null)
          return
        }

        setWalter({
          id: data?.id ?? DEFAULT_WALTER.id,
          name: data?.name ?? DEFAULT_WALTER.name,
          memo: data?.memo ?? DEFAULT_WALTER.memo,
        })
      } catch {
        setError("네트워크 오류가 발생했습니다.")
        setWalter(null)
      } finally {
        setLoading(false)
      }
    }
    void loadMyself()
  }, [apiBase])

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
                2. 월터 자기소개
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
                <h2
                  className="text-xl font-semibold tracking-tight text-white md:text-2xl"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  2. 월터 자기소개
                </h2>
                {loading && <p className="text-sm text-blue-100/80">자료를 불러오는 중입니다...</p>}
                {error && <p className="text-sm text-red-200">{error}</p>}
                {!loading && !error && walter && (
                  <div className="space-y-2">
                    <p className="text-sm text-blue-100/80">
                      백엔드: WalterSchema 기본값 생성 → UseCase에서 DTO로 옮겨 담음 → Repository 로그
                      처리 후 JSON 응답
                    </p>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/15 hover:bg-white/5">
                          <TableHead className="text-blue-200/95">id</TableHead>
                          <TableHead className="text-blue-200/95">name</TableHead>
                          <TableHead className="text-blue-200/95">memo</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="border-white/10 hover:bg-white/5">
                          <TableCell className="text-white/90">{walter.id}</TableCell>
                          <TableCell className="text-white/90">{walter.name}</TableCell>
                          <TableCell className="max-w-[320px] text-white/90">{walter.memo}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
