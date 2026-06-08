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
  { slug: "walter", label: "Walter", path: "/api/walter/v1/myself" },
  { slug: "andrews", label: "Andrews", path: "/api/andrews/v1/myself" },
  { slug: "hartley", label: "Hartley", path: "/api/hartley/v1/myself" },
  { slug: "lowe", label: "Lowe", path: "/api/lowe/v1/myself" },
  { slug: "smith", label: "Smith", path: "/api/smith/v1/myself" },
  { slug: "cal", label: "Cal", path: "/api/cal/v1/myself" },
  { slug: "isidor", label: "Isidor", path: "/api/isidor/v1/myself" },
  { slug: "jack", label: "Jack", path: "/api/jack/v1/myself" },
  { slug: "molly", label: "Molly", path: "/api/molly/v1/myself" },
  { slug: "rose", label: "Rose", path: "/api/rose/v1/myself" },
  { slug: "ruth", label: "Ruth", path: "/api/ruth/v1/myself" },
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
