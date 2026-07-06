import { matchesRecipientNickname } from "@/lib/korean-search"

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "http://127.0.0.1:8000"

export type FakerEmailRequest = {
  to: string
  prompt: string
  subject?: string
}

export type FakerEmailResponse = {
  ok: boolean
  to: string
  subject: string
  body_preview: string
  n8n_status: string
}

export async function sendFakerEmail(
  payload: FakerEmailRequest,
): Promise<FakerEmailResponse> {
  const res = await fetch(`${API_BASE}/automata/faker/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  const json = (await res.json()) as FakerEmailResponse & { detail?: string }

  if (!res.ok) {
    const detail =
      typeof json.detail === "string"
        ? json.detail
        : `요청 실패 (${res.status})`
    throw new Error(detail)
  }

  return json
}

export type ContactItem = {
  id: number
  nickname: string
  email: string
}

export type ContactListResponse = {
  items: ContactItem[]
  total: number
  page: number
  page_size: number
}

export type ContactUploadResponse = {
  filename?: string
  saved?: number
  detail?: string
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

export function resolveRecipientEmail(
  input: string,
  contacts: ContactItem[],
): string | null {
  const trimmed = input.trim()
  if (!trimmed) return null
  if (EMAIL_RE.test(trimmed)) return trimmed.toLowerCase()

  const byNickname = contacts.filter((contact) =>
    matchesRecipientNickname(contact.nickname, trimmed),
  )
  const exact = byNickname.find((contact) => contact.nickname === trimmed)
  if (exact) return exact.email
  if (byNickname.length === 1) return byNickname[0].email
  return null
}

export async function fetchAllContacts(): Promise<ContactItem[]> {
  const pageSize = 200
  const first = await fetchContacts(1, pageSize)
  if (first.total <= first.items.length) return first.items

  const items = [...first.items]
  const totalPages = Math.ceil(first.total / pageSize)
  for (let page = 2; page <= totalPages; page += 1) {
    const next = await fetchContacts(page, pageSize)
    items.push(...next.items)
  }
  return items
}

export async function fetchContacts(
  page = 1,
  pageSize = 50,
): Promise<ContactListResponse> {
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
  })
  const res = await fetch(`${API_BASE}/automata/contacts?${params}`)
  const json = (await res.json()) as ContactListResponse & { detail?: string }
  if (!res.ok) {
    throw new Error(json.detail ?? "주소록을 불러오지 못했습니다.")
  }
  return json
}

export async function uploadContactsCsv(
  file: File,
): Promise<ContactUploadResponse> {
  const fd = new FormData()
  fd.append("file", file)
  const res = await fetch(`${API_BASE}/automata/contacts/upload`, {
    method: "POST",
    body: fd,
  })
  const raw = await res.text()
  let data: ContactUploadResponse = {}
  if (raw) {
    try {
      data = JSON.parse(raw) as ContactUploadResponse & { detail?: string }
    } catch {
      throw new Error("업로드 응답을 읽을 수 없습니다.")
    }
  }
  if (!res.ok) {
    const detail =
      typeof (data as { detail?: string }).detail === "string"
        ? (data as { detail?: string }).detail
        : "업로드에 실패했습니다."
    throw new Error(detail)
  }
  if ((data.saved ?? 0) === 0) {
    throw new Error(
      "저장된 연락처가 없습니다. CSV 헤더에 First Name, email 컬럼이 있는지 확인하세요.",
    )
  }
  return data
}

export type InboundMailItem = {
  id: number
  message_id: string
  from_email: string
  from_name: string | null
  subject: string
  body: string
  received_at: string
}

export type InboundMailListResponse = {
  items: InboundMailItem[]
  total: number
  page: number
  page_size: number
}

export async function fetchInboundMail(
  page = 1,
  pageSize = 50,
): Promise<InboundMailListResponse> {
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
  })
  const res = await fetch(`${API_BASE}/automata/inbound/mail?${params}`)
  const json = (await res.json()) as InboundMailListResponse & { detail?: string }
  if (!res.ok) {
    throw new Error(json.detail ?? "수신 메일을 불러오지 못했습니다.")
  }
  return json
}
