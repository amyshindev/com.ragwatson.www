import { NextRequest, NextResponse } from "next/server"

/** Server route: prefer BACKEND_URL (Vercel). NEXT_PUBLIC_* is optional fallback. */
const backendUrl = (
  process.env.BACKEND_URL ??
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  "http://127.0.0.1:8000"
).replace(/\/$/, "")

function formatBackendError(status: number, data: unknown): string {
  if (typeof data === "object" && data !== null) {
    if ("detail" in data) {
      const detail = (data as { detail: unknown }).detail
      if (typeof detail === "string") return detail
      if (Array.isArray(detail)) {
        return detail
          .map((d) =>
            typeof d === "object" && d !== null && "msg" in d
              ? String((d as { msg: unknown }).msg)
              : String(d),
          )
          .join(", ")
      }
    }
    if ("error" in data && typeof (data as { error: unknown }).error === "string") {
      return (data as { error: string }).error
    }
  }
  return `채팅 요청에 실패했습니다. (${status})`
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "잘못된 JSON입니다." }, { status: 400 })
  }

  let res: Response
  try {
    res = await fetch(`${backendUrl}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  } catch {
    return NextResponse.json(
      {
        error:
          "백엔드에 연결할 수 없습니다. BACKEND_URL(Vercel)과 Railway 서버 상태를 확인하세요.",
      },
      { status: 503 },
    )
  }

  const raw = await res.text()
  let data: unknown = null
  if (raw) {
    try {
      data = JSON.parse(raw)
    } catch {
      return NextResponse.json(
        { error: "백엔드 응답 형식이 올바르지 않습니다." },
        { status: 502 },
      )
    }
  }

  if (!res.ok) {
    return NextResponse.json(
      { error: formatBackendError(res.status, data) },
      { status: res.status },
    )
  }

  if (!data || typeof data !== "object" || !("reply" in data)) {
    return NextResponse.json(
      { error: "백엔드에서 빈 응답을 받았습니다." },
      { status: 502 },
    )
  }

  return NextResponse.json(data)
}
