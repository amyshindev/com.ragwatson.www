"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function TitanicPreviewPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000"
  const rowsPerPage = 50
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rows, setRows] = useState<Record<string, unknown>[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const loadPreview = async () => {
      const hasUploaded = localStorage.getItem("hasUploadedTitanicData") === "true"
      if (!hasUploaded) {
        setRows([])
        setError("업로드 성공 후에만 자료를 볼 수 있습니다.")
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`${apiBase}/api/walter/v1/preview`, {
          method: "GET",
          headers: { "Cache-Control": "no-cache" },
        })
        const data = (await res.json()) as { detail?: string; items?: Record<string, unknown>[] }
        if (!res.ok) {
          setError(data.detail ?? "자료를 불러오지 못했습니다.")
          setRows([])
          return
        }
        const items = data.items ?? []
        if (items.length === 0) {
          setError("업로드된 자료가 없거나 서버가 재시작되었습니다. 다시 업로드해 주세요.")
          setRows([])
          localStorage.removeItem("hasUploadedTitanicData")
          return
        }
        setRows(items)
        setCurrentPage(1)
      } catch {
        setError("네트워크 오류가 발생했습니다.")
        setRows([])
      } finally {
        setLoading(false)
      }
    }
    void loadPreview()
  }, [apiBase])

  const columns = useMemo(() => Object.keys(rows[0] ?? {}), [rows])
  const totalPages = Math.max(1, Math.ceil(rows.length / rowsPerPage))
  const safePage = Math.min(currentPage, totalPages)
  const start = (safePage - 1) * rowsPerPage
  const pageRows = rows.slice(start, start + rowsPerPage)
  const pageWindowStart = Math.max(1, safePage - 2)
  const pageWindowEnd = Math.min(totalPages, safePage + 2)
  const visiblePages = Array.from(
    { length: pageWindowEnd - pageWindowStart + 1 },
    (_, i) => pageWindowStart + i,
  )

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
                2. 자료 보기
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
                  2. 자료 보기
                </h2>
                {loading && <p className="text-sm text-blue-100/80">자료를 불러오는 중입니다...</p>}
                {error && <p className="text-sm text-red-200">{error}</p>}
                {!loading && !error && rows.length === 0 && (
                  <p className="text-sm text-blue-100/80">표시할 자료가 없습니다.</p>
                )}
                {!loading && !error && rows.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-blue-100/80">
                      총 {rows.length} rows (페이지당 {rowsPerPage} rows)
                    </p>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/15 hover:bg-white/5">
                          {columns.map((column) => (
                            <TableHead key={column} className="text-blue-200/95">
                              {column}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pageRows.map((row, idx) => (
                          <TableRow key={idx} className="border-white/10 hover:bg-white/5">
                            {columns.map((column) => (
                              <TableCell key={`${idx}-${column}`} className="max-w-[180px] truncate text-white/90">
                                {String(row[column] ?? "")}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {totalPages > 1 && (
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <p className="text-xs text-blue-200/80">
                          {safePage} / {totalPages} 페이지
                        </p>
                        <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] p-1">
                          <button
                            type="button"
                            className="h-8 rounded-md px-2 text-xs text-white/85 hover:bg-white/10 disabled:opacity-40"
                            disabled={safePage === 1}
                            onClick={() => setCurrentPage(safePage - 1)}
                          >
                            이전
                          </button>
                          {pageWindowStart > 1 && (
                            <>
                              <button
                                type="button"
                                className="h-8 min-w-8 rounded-md px-2 text-xs text-white/85 hover:bg-white/10"
                                onClick={() => setCurrentPage(1)}
                              >
                                1
                              </button>
                              {pageWindowStart > 2 && (
                                <span className="px-1 text-xs text-white/50">...</span>
                              )}
                            </>
                          )}
                          {visiblePages.map((page) => (
                            <button
                              key={page}
                              type="button"
                              className={
                                page === safePage
                                  ? "h-8 min-w-8 rounded-md bg-blue-600 px-2 text-xs text-white hover:bg-blue-700"
                                  : "h-8 min-w-8 rounded-md px-2 text-xs text-white/85 hover:bg-white/10"
                              }
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </button>
                          ))}
                          {pageWindowEnd < totalPages && (
                            <>
                              {pageWindowEnd < totalPages - 1 && (
                                <span className="px-1 text-xs text-white/50">...</span>
                              )}
                              <button
                                type="button"
                                className="h-8 min-w-8 rounded-md px-2 text-xs text-white/85 hover:bg-white/10"
                                onClick={() => setCurrentPage(totalPages)}
                              >
                                {totalPages}
                              </button>
                            </>
                          )}
                          <button
                            type="button"
                            className="h-8 rounded-md px-2 text-xs text-white/85 hover:bg-white/10 disabled:opacity-40"
                            disabled={safePage === totalPages}
                            onClick={() => setCurrentPage(safePage + 1)}
                          >
                            다음
                          </button>
                        </div>
                      </div>
                    )}
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

