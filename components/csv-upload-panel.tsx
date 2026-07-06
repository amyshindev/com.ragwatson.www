"use client"

import { useCallback, useRef, useState } from "react"
import { FileUp, Loader2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

function parseCsvPreview(text: string): string[][] {
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0)
  return lines.map((line) => line.split(",").map((c) => c.trim()))
}

type CsvUploadPanelProps = {
  description?: string
  onUpload: (file: File) => Promise<string | void>
  onSuccess?: () => void
}

export function CsvUploadPanel({
  description = "CSV 파일을 선택하거나 드래그하여 업로드합니다.",
  onUpload,
  onSuccess,
}: CsvUploadPanelProps) {
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
    setPreview(parseCsvPreview(text))
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
      const result = await onUpload(file)
      setMessage({
        type: "ok",
        text: result ?? `업로드 완료: ${file.name}`,
      })
      onSuccess?.()
    } catch (error) {
      setMessage({
        type: "err",
        text:
          error instanceof Error
            ? error.message
            : "업로드 중 오류가 발생했습니다.",
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

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{description}</p>
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
          "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 transition-colors",
          dragActive
            ? "border-blue-400 bg-blue-50 dark:bg-blue-950/30"
            : file
              ? "border-blue-300 bg-blue-50/50 dark:border-maestro-500/40 dark:bg-maestro-950/20"
              : "border-gray-300 bg-gray-50 hover:border-blue-300 hover:bg-blue-50/60 dark:border-white/15 dark:bg-white/[0.03] dark:hover:border-maestro-500/40",
        )}
      >
        <FileUp className="mb-3 h-9 w-9 text-blue-600 dark:text-maestro-400" />
        <p className="text-center font-medium">
          {file ? file.name : "클릭하여 파일 선택"}
        </p>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          {file
            ? `${(file.size / 1024).toFixed(1)} KB · 다른 CSV를 선택하려면 클릭`
            : "또는 CSV 파일을 이 영역으로 드래그"}
        </p>
        {file && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-4 gap-1"
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
        <div className="flex justify-end">
          <Button type="button" disabled={uploading} onClick={() => void upload()}>
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
              ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-200"
              : "border-red-200 bg-red-50 text-red-700 dark:border-red-500/30 dark:bg-red-950/40 dark:text-red-300",
          )}
          role="status"
        >
          {message.text}
        </p>
      )}

      {preview.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">
            미리보기 ({dataRows.length} rows)
          </p>
          <div className="max-h-48 overflow-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {header.map((h, i) => (
                    <TableHead key={i}>{h || `열 ${i + 1}`}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageRows.map((row, ri) => (
                  <TableRow key={ri}>
                    {header.map((_, ci) => (
                      <TableCell key={ci} className="max-w-[140px] truncate">
                        {row[ci] ?? ""}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  )
}
