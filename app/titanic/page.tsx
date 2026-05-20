"use client"

import { useCallback, useRef, useState } from "react"
import { FileUp, Loader2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

function parseCsvPreview(text: string, maxLines: number): string[][] {
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0)
  return lines.slice(0, maxLines).map((line) => line.split(",").map((c) => c.trim()))
}

export default function TitanicHomePage() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string[][]>([])
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
    setPreview(parseCsvPreview(text, 8))
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
    setMessage(null)
  }

  const upload = async () => {
    if (!file) return
    setUploading(true)
    setMessage(null)
    try {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/titanic/csv", { method: "POST", body: fd })
      const data = (await res.json()) as { ok?: boolean; error?: string; filename?: string; size?: number }
      if (!res.ok) {
        setMessage({ type: "err", text: data.error ?? "업로드에 실패했습니다." })
        return
      }
      setMessage({
        type: "ok",
        text: `업로드 완료: ${data.filename} (${(data.size! / 1024).toFixed(1)} KB)`,
      })
    } catch {
      setMessage({ type: "err", text: "네트워크 오류가 발생했습니다." })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="relative -mt-20 min-h-[100dvh] overflow-hidden">
      {/* 배경: 흑백 + 짙은 톤 (전체 뷰포트) */}
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/titanic-ship-bg.png)",
          filter: "grayscale(1) brightness(0.32) contrast(1.12)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/82 via-zinc-950/88 to-black/92"
        aria-hidden
      />

      <div className="relative z-10 flex mt-20 min-h-[calc(100dvh-5rem)] w-full flex-col items-center justify-center overflow-y-auto px-4 py-8 text-white">
        <div className="mx-auto w-full max-w-3xl space-y-8">
          <div className="text-center">
            <h1
              className="text-2xl font-bold tracking-tight text-white drop-shadow md:text-3xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              타이타닉 홈
            </h1>
            <p className="mt-2 text-sm text-zinc-300 drop-shadow">
              타이타닉 데이터용 CSV 파일을 선택하거나 여기로 끌어다 놓으세요.
            </p>
          </div>

          <Card className="border border-blue-400/25 bg-zinc-950/35 text-white shadow-2xl shadow-black/25 backdrop-blur-xl ring-1 ring-blue-400/15 supports-[backdrop-filter]:bg-zinc-950/25">
            <CardHeader>
              <CardTitle className="text-xl text-white" style={{ fontFamily: "var(--font-heading)" }}>
                CSV 업로드
              </CardTitle>
              <CardDescription className="text-blue-200/90">
                확장자{" "}
                <code className="rounded border border-blue-400/25 bg-blue-500/15 px-1.5 py-0.5 text-blue-100">
                  .csv
                </code>{" "}
                만 허용됩니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
                    : "border-white/30 bg-white/[0.06] hover:border-blue-400/40 hover:bg-blue-500/10 backdrop-blur-sm",
                )}
              >
                <FileUp className="mb-3 h-10 w-10 text-blue-300" />
                <p className="text-center font-medium text-white/95">클릭하여 파일 선택</p>
                <p className="mt-1 text-center text-sm text-blue-200/85">
                  또는 CSV 파일을 이 영역으로 드래그
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Label className="text-blue-200/90">선택된 파일</Label>
                <span className="text-sm text-white/85">
                  {file ? `${file.name} (${(file.size / 1024).toFixed(1)} KB)` : "없음"}
                </span>
                {file && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-1 border-white/20 bg-white/5 text-white hover:bg-white/10"
                    onClick={clearFile}
                    disabled={uploading}
                  >
                    <Trash2 className="h-4 w-4" />
                    제거
                  </Button>
                )}
              </div>

              {preview.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-blue-100">미리보기 (최대 8행)</p>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/15 hover:bg-white/5">
                        {(preview[0] ?? []).map((h, i) => (
                          <TableHead key={i} className="text-blue-200/95">
                            {h || `열 ${i + 1}`}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {preview.slice(1).map((row, ri) => (
                        <TableRow key={ri} className="border-white/10 hover:bg-white/5">
                          {(preview[0] ?? []).map((_, ci) => (
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

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  className="min-w-[120px] bg-[#2563eb] text-white shadow-md shadow-blue-500/25 hover:bg-[#1d4ed8]"
                  disabled={!file || uploading}
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

