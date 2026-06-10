"use client"

import { useCallback, useRef, useState } from "react"
import { FileUp, Loader2, Trash2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { uploadTitanicCsv } from "@/lib/titanic-api"

function parseCsvPreview(text: string, maxLines: number): string[][] {
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0)
  return lines.slice(0, maxLines).map((line) => line.split(",").map((c) => c.trim()))
}

export default function TitanicHomePage() {
  const rowsPerPage = 15
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string[][]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(
    null,
  )

  const loadFile = useCallback(async (f: File) => {
    if (!f.name.toLowerCase().endsWith(".csv")) {
      setMessage({ type: "err", text: "CSV 파일만 선택할 수 있습니다." })
      return
    }
    setFile(f)
    setMessage(null)
    const text = await f.text()
    setPreview(parseCsvPreview(text, Number.MAX_SAFE_INTEGER))
    setCurrentPage(1)
  }, [])

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) void loadFile(f)
    e.target.value = ""
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    const f = e.dataTransfer.files?.[0]
    if (f) void loadFile(f)
  }

  const clearFile = () => {
    setFile(null)
    setPreview([])
    setCurrentPage(1)
    setMessage(null)
  }

  const upload = async () => {
    if (!file) return
    setUploading(true)
    setMessage(null)
    try {
      const data = await uploadTitanicCsv(file)
      setMessage({
        type: "ok",
        text: `업로드 완료: ${data.filename ?? file.name} (${data.saved ?? 0}건 저장)`,
      })
    } catch (error) {
      setMessage({
        type: "err",
        text:
          error instanceof Error
            ? error.message
            : error instanceof TypeError
              ? "네트워크 오류가 발생했습니다."
              : "응답 처리 중 오류가 발생했습니다.",
      })
    } finally {
      setUploading(false)
    }
  }

  const header = preview[0] ?? []
  const dataRows = preview.slice(1)
  const totalPages = Math.max(1, Math.ceil(dataRows.length / rowsPerPage))
  const safePage = Math.min(currentPage, totalPages)
  const start = (safePage - 1) * rowsPerPage
  const pageRows = dataRows.slice(start, start + rowsPerPage)
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
              <a
                href="#data-collection"
                className="block rounded-md px-3 py-2 text-sm text-white/85 transition hover:bg-white/10 hover:text-white"
              >
                1. 데이터 수집
              </a>
              <Link
                href="/titanic/preview"
                className="block rounded-md px-3 py-2 text-sm text-white/85 transition hover:bg-white/10 hover:text-white"
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

          <Card
            id="data-collection"
            className="mx-auto w-full max-w-4xl border border-blue-400/25 bg-zinc-950/35 text-white shadow-2xl shadow-black/25 backdrop-blur-xl ring-1 ring-blue-400/15 supports-[backdrop-filter]:bg-zinc-950/25"
          >
            <CardContent className="space-y-6 pt-6">
              <div>
                <h2
                  className="text-xl font-semibold tracking-tight text-white md:text-2xl"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  1. 데이터 수집
                </h2>
                <p className="mt-2 text-sm text-blue-100/75">
                  분석에 사용할 타이타닉 CSV 데이터를 업로드합니다.
                </p>
              </div>
              <input
                ref={inputRef}
                type="file"
                accept=".csv,text/csv"
                className="sr-only"
                onChange={onInputChange}
              />

              <div
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") inputRef.current?.click()
                }}
                onClick={() => inputRef.current?.click()}
                onDragEnter={(e) => {
                  e.preventDefault()
                  setDragActive(true)
                }}
                onDragLeave={(e) => {
                  e.preventDefault()
                  setDragActive(false)
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
                className={cn(
                  "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-14 transition-colors",
                  dragActive
                    ? "border-blue-400 bg-blue-500/20 shadow-inner shadow-blue-500/20 backdrop-blur-sm"
                    : file
                      ? "border-blue-400/55 bg-blue-500/10 backdrop-blur-sm"
                      : "border-white/30 bg-white/[0.06] hover:border-blue-400/40 hover:bg-blue-500/10 backdrop-blur-sm",
                )}
              >
                <FileUp className="mb-3 h-10 w-10 text-blue-300" />
                <p className="text-center font-medium text-white/95">
                  {file ? file.name : "클릭하여 파일 선택"}
                </p>
                <p className="mt-1 text-center text-sm text-blue-200/85">
                  {file
                    ? `${(file.size / 1024).toFixed(1)} KB · 다른 CSV를 선택하려면 클릭`
                    : "또는 CSV 파일을 이 영역으로 드래그"}
                </p>
                {file && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-4 gap-1 border-white/20 bg-white/5 text-white hover:bg-white/10"
                    onClick={(e) => {
                      e.stopPropagation()
                      clearFile()
                    }}
                    disabled={uploading}
                  >
                    <Trash2 className="h-4 w-4" />
                    제거
                  </Button>
                )}
              </div>

              {file && (
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    className="min-w-[120px] bg-[#2563eb] text-white shadow-md shadow-blue-500/25 hover:bg-[#1d4ed8]"
                    disabled={uploading}
                    onClick={() => void upload()}
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        업로드 중…
                      </>
                    ) : (
                      "업로드"
                    )}
                  </Button>
                </div>
              )}

              {message && (
                <p
                  className={cn(
                    "rounded-lg border px-3 py-2 text-sm",
                    message.type === "ok"
                      ? "border-emerald-400/35 bg-emerald-500/15 text-emerald-100"
                      : "border-red-400/35 bg-red-500/15 text-red-100",
                  )}
                >
                  {message.text}
                </p>
              )}

              <div id="preview-section" className="space-y-2">
                {preview.length > 0 ? (
                  <>
                  <p className="text-sm font-medium text-blue-100">
                    미리보기 ({dataRows.length} rows, 페이지당 {rowsPerPage} rows)
                  </p>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/15 hover:bg-white/5">
                        {header.map((h, i) => (
                          <TableHead key={i} className="text-blue-200/95">
                            {h || `열 ${i + 1}`}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pageRows.map((row, ri) => (
                        <TableRow key={ri} className="border-white/10 hover:bg-white/5">
                          {header.map((_, ci) => (
                            <TableCell
                              key={ci}
                              className="max-w-[160px] truncate text-white/90"
                            >
                              {row[ci] ?? ""}
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
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          className="h-8 px-2 text-xs text-white/85 hover:bg-white/10 disabled:opacity-40"
                          disabled={safePage === 1}
                          onClick={() => setCurrentPage(safePage - 1)}
                        >
                          이전
                        </Button>
                        {pageWindowStart > 1 && (
                          <>
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              className="h-8 min-w-8 px-2 text-xs text-white/85 hover:bg-white/10"
                              onClick={() => setCurrentPage(1)}
                            >
                              1
                            </Button>
                            {pageWindowStart > 2 && (
                              <span className="px-1 text-xs text-white/50">...</span>
                            )}
                          </>
                        )}
                        {visiblePages.map((page) => (
                          <Button
                            key={page}
                            type="button"
                            size="sm"
                            variant={page === safePage ? "default" : "ghost"}
                            className={
                              page === safePage
                                ? "h-8 min-w-8 bg-blue-600 px-2 text-xs text-white hover:bg-blue-700"
                                : "h-8 min-w-8 px-2 text-xs text-white/85 hover:bg-white/10"
                            }
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </Button>
                        ))}
                        {pageWindowEnd < totalPages && (
                          <>
                            {pageWindowEnd < totalPages - 1 && (
                              <span className="px-1 text-xs text-white/50">...</span>
                            )}
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              className="h-8 min-w-8 px-2 text-xs text-white/85 hover:bg-white/10"
                              onClick={() => setCurrentPage(totalPages)}
                            >
                              {totalPages}
                            </Button>
                          </>
                        )}
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          className="h-8 px-2 text-xs text-white/85 hover:bg-white/10 disabled:opacity-40"
                          disabled={safePage === totalPages}
                          onClick={() => setCurrentPage(safePage + 1)}
                        >
                          다음
                        </Button>
                      </div>
                    </div>
                  )}
                  </>
                ) : (
                  <p className="text-sm text-blue-100/75">CSV를 업로드하면 미리보기가 표시됩니다.</p>
                )}
              </div>
            </CardContent>
          </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
