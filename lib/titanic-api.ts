export const TITANIC_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000"

export type MyselfResponse = {
  id: number
  name: string
}

export type JamesUploadResponse = {
  filename?: string
  saved?: number
  detail?: string
  error?: string
}

export const TITANIC_MYSELF_ENDPOINTS = [
  { slug: "walter", label: "Walter", path: "/titanic/walter/myself" },
  { slug: "andrews", label: "Andrews", path: "/titanic/andrews/myself" },
  { slug: "hartley", label: "Hartley", path: "/titanic/hartley/myself" },
  { slug: "lowe", label: "Lowe", path: "/titanic/lowe/myself" },
  { slug: "smith", label: "Smith", path: "/titanic/smith/myself" },
  { slug: "cal", label: "Cal", path: "/titanic/cal/myself" },
  { slug: "isidor", label: "Isidor", path: "/titanic/isidor/myself" },
  { slug: "jack", label: "Jack", path: "/titanic/jack/myself" },
  { slug: "molly", label: "Molly", path: "/titanic/molly/myself" },
  { slug: "rose", label: "Rose", path: "/titanic/rose/myself" },
  { slug: "ruth", label: "Ruth", path: "/titanic/ruth/myself" },
] as const

export async function fetchMyself(path: string): Promise<MyselfResponse> {
  const res = await fetch(`${TITANIC_API_BASE}${path}`, {
    method: "GET",
    headers: { "Cache-Control": "no-cache" },
  })
  const raw = await res.text()
  const data = (raw ? JSON.parse(raw) : null) as MyselfResponse & { detail?: string }

  if (!res.ok) {
    throw new Error(data?.detail ?? "자료를 불러오지 못했습니다.")
  }

  return {
    id: data.id,
    name: data.name,
  }
}

export async function chatWithSmithCaptain(message: string): Promise<string> {
  const res = await fetch(`${TITANIC_API_BASE}/titanic/smith/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  })

  const raw = await res.text()
  let data: { reply?: string; detail?: string; error?: string } = {}
  if (raw) {
    try {
      data = JSON.parse(raw)
    } catch {
      throw new Error("채팅 응답을 읽을 수 없습니다.")
    }
  }
  if (!res.ok) {
    throw new Error(data.detail ?? data.error ?? "선장과의 대화에 실패했습니다.")
  }
  return data.reply?.trim() ?? ""
}

export async function uploadTitanicCsv(file: File): Promise<JamesUploadResponse> {
  const fd = new FormData()
  fd.append("file", file)
  const res = await fetch(`${TITANIC_API_BASE}/api/james/v1/upload`, {
    method: "POST",
    body: fd,
  })
  const raw = await res.text()
  const data = (raw ? JSON.parse(raw) : {}) as JamesUploadResponse

  if (!res.ok) {
    throw new Error(data.detail ?? data.error ?? "업로드에 실패했습니다.")
  }

  return data
}
