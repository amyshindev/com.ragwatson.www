"use client"

import { useEffect, useRef, useState } from "react"
import { RecipientInput } from "@/components/recipient-input"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  fetchAllContacts,
  resolveRecipientEmail,
  sendFakerEmail,
  type ContactItem,
} from "@/lib/automata-api"
import {
  surfaceBody,
  surfaceCard,
  surfaceEyebrow,
  surfaceSubtle,
  surfaceTitle,
} from "@/lib/theme-surface"
import { cn } from "@/lib/utils"

type FormState = {
  to: string
  prompt: string
  subject: string
  status: "idle" | "loading" | "ok" | "err"
  error: string | null
  preview: string | null
  sentSubject: string | null
}

const initialState: FormState = {
  to: "",
  prompt: "",
  subject: "",
  status: "idle",
  error: null,
  preview: null,
  sentSubject: null,
}

export default function AutomataPage() {
  const [form, setForm] = useState<FormState>(initialState)
  const [contacts, setContacts] = useState<ContactItem[]>([])
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    void fetchAllContacts()
      .then(setContacts)
      .catch(() => setContacts([]))
  }, [])

  return (
    <div>
      <p className={surfaceEyebrow}>Automata</p>
      <h1 className={cn("mt-2 text-3xl font-bold", surfaceTitle)}>
        ExaONE Gmail 발송
      </h1>
      <p className={cn("mt-3 text-sm", surfaceSubtle)}>
        ExaONE이 메일 초안을 작성하고 n8n Gmail 워크플로로 발송합니다.
      </p>

      <div className={cn("mt-8 rounded-lg p-6", surfaceCard)}>
        <form
          ref={formRef}
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault()
            const el = formRef.current
            if (!el) return

            const data = new FormData(el)
            const prompt = String(data.get("prompt") ?? "").trim()
            const subject = String(data.get("subject") ?? "").trim()
            const to = resolveRecipientEmail(form.to, contacts)

            if (!to || !prompt) {
              setForm((prev) => ({
                ...prev,
                status: "err",
                error: !to
                  ? "받는 사람(이름 또는 이메일)을 입력해 주세요."
                  : "작성 지시를 입력해 주세요.",
                preview: null,
                sentSubject: null,
              }))
              return
            }

            setForm((prev) => ({
              ...prev,
              to,
              status: "loading",
              error: null,
              preview: null,
              sentSubject: null,
            }))

            try {
              const result = await sendFakerEmail({
                to,
                prompt,
                subject: subject || undefined,
              })
              setForm((prev) => ({
                ...prev,
                status: "ok",
                error: null,
                preview: result.body_preview,
                sentSubject: result.subject,
              }))
            } catch (err) {
              setForm((prev) => ({
                ...prev,
                status: "err",
                error:
                  err instanceof Error
                    ? err.message
                    : "메일 발송 요청에 실패했습니다.",
                preview: null,
                sentSubject: null,
              }))
            }
          }}
        >
          <div>
            <label htmlFor="to" className={cn("mb-1 block text-sm", surfaceBody)}>
              받는 사람
            </label>
            <RecipientInput
              id="to"
              value={form.to}
              onChange={(to) => setForm((prev) => ({ ...prev, to }))}
              contacts={contacts}
              placeholder="이름 또는 이메일"
            />
            {contacts.length > 0 && (
              <p className="mt-1 text-xs text-muted-foreground">
                주소록 {contacts.length}명 — 이름을 입력하면 자동완성됩니다.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="subject"
              className={cn("mb-1 block text-sm", surfaceBody)}
            >
              제목 (선택)
            </label>
            <Input
              id="subject"
              name="subject"
              type="text"
              placeholder="없으면 ExaONE이 생성합니다"
              defaultValue={form.subject}
            />
          </div>

          <div>
            <label
              htmlFor="prompt"
              className={cn("mb-1 block text-sm", surfaceBody)}
            >
              작성 지시
            </label>
            <Textarea
              id="prompt"
              name="prompt"
              rows={5}
              placeholder="예: 타이타닉 automata 프로젝트 진행 상황을 정중하게 요약해줘"
              defaultValue={form.prompt}
              required
            />
          </div>

          {form.error && (
            <p
              className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-950/40 dark:text-red-300"
              role="status"
            >
              {form.error}
            </p>
          )}

          {form.status === "ok" && form.preview && (
            <div
              className="rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm text-blue-900 dark:border-maestro-500/30 dark:bg-maestro-950/40 dark:text-maestro-200"
              role="status"
            >
              <p className="font-medium">
                발송 완료 — {form.sentSubject ?? "제목 없음"}
              </p>
              <p className="mt-2 whitespace-pre-wrap text-xs opacity-90">
                {form.preview}
              </p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={form.status === "loading"}
          >
            {form.status === "loading" ? "작성 및 발송 중…" : "ExaONE으로 작성 후 발송"}
          </Button>
        </form>
      </div>
    </div>
  )
}
