"use client"

import { useCallback, useEffect, useState } from "react"
import { Loader2, Plus } from "lucide-react"
import { CsvUploadPanel } from "@/components/csv-upload-panel"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  fetchContacts,
  uploadContactsCsv,
  type ContactItem,
} from "@/lib/automata-api"
import {
  surfaceCard,
  surfaceSubtle,
  surfaceTitle,
} from "@/lib/theme-surface"
import { cn } from "@/lib/utils"

type ListState = {
  items: ContactItem[]
  total: number
  page: number
  pageSize: number
  status: "idle" | "loading" | "ok" | "err"
  error: string | null
}

const initialList: ListState = {
  items: [],
  total: 0,
  page: 1,
  pageSize: 50,
  status: "idle",
  error: null,
}

export default function MailContactsPage() {
  const [list, setList] = useState<ListState>(initialList)
  const [registerOpen, setRegisterOpen] = useState(false)

  const loadContacts = useCallback(async (page = 1) => {
    setList((prev) => ({ ...prev, status: "loading", error: null }))
    try {
      const data = await fetchContacts(page, 50)
      setList({
        items: data.items,
        total: data.total,
        page: data.page,
        pageSize: data.page_size,
        status: "ok",
        error: null,
      })
    } catch (err) {
      setList((prev) => ({
        ...prev,
        status: "err",
        error:
          err instanceof Error ? err.message : "주소록을 불러오지 못했습니다.",
      }))
    }
  }, [])

  useEffect(() => {
    void loadContacts()
  }, [loadContacts])

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className={cn("text-2xl font-bold md:text-3xl", surfaceTitle)}>
            주소록
          </h1>
          <p className={cn("mt-2 text-sm", surfaceSubtle)}>
            CSV로 연락처를 등록하고 메일 발송 시 수신자로 사용합니다.
          </p>
        </div>
        <Button type="button" className="gap-1" onClick={() => setRegisterOpen(true)}>
          <Plus className="h-4 w-4" />
          등록
        </Button>
      </div>

      <div className={cn("mt-6 rounded-lg p-4 md:p-6", surfaceCard)}>
        {list.status === "loading" && list.items.length === 0 && (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            주소록 불러오는 중…
          </p>
        )}

        {list.error && (
          <p
            className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-950/40 dark:text-red-300"
            role="status"
          >
            {list.error}
          </p>
        )}

        {list.status === "ok" && list.items.length === 0 && !list.error && (
          <p className="text-sm text-muted-foreground">
            등록된 연락처가 없습니다. 상단 등록 버튼으로 CSV를 업로드하세요.
          </p>
        )}

        {list.items.length > 0 && (
          <>
            <p className="mb-3 text-sm text-muted-foreground">
              총 {list.total}건
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">No.</TableHead>
                  <TableHead>닉네임</TableHead>
                  <TableHead>이메일</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {list.items.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      {(list.page - 1) * list.pageSize + index + 1}
                    </TableCell>
                    <TableCell>{row.nickname}</TableCell>
                    <TableCell>{row.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </div>

      <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>주소록 CSV 등록</DialogTitle>
            <DialogDescription>
              타이타닉 승객 목록 업로드와 동일한 방식으로 CSV를 선택·미리보기 후
              업로드합니다. 헤더에 First Name, email 컬럼이 있어야
              합니다.
            </DialogDescription>
          </DialogHeader>
          <CsvUploadPanel
            description="닉네임·이메일이 포함된 CSV를 업로드하세요."
            onUpload={async (file) => {
              const data = await uploadContactsCsv(file)
              await loadContacts()
              return `업로드 완료: ${data.filename ?? file.name} (${data.saved ?? 0}건 저장)`
            }}
            onSuccess={() => {
              setRegisterOpen(false)
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
