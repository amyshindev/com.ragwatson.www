import { NextResponse } from "next/server"

const backendUrl = (
  process.env.BACKEND_URL ??
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  "http://127.0.0.1:8000"
).replace(/\/$/, "")

function errorMessage(status: number, data: unknown): string {
  if (typeof data === "object" && data !== null && "detail" in data) {
    const detail = (data as { detail: unknown }).detail
    if (typeof detail === "string") return detail
  }
  return `로그인 요청에 실패했습니다. (${status})`
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "잘못된 JSON입니다." }, { status: 400 })
  }

  let res: Response
  try {
    res = await fetch(`${backendUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  } catch {
    return NextResponse.json(
      { error: "백엔드 로그인 서버에 연결할 수 없습니다." },
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
        { error: "백엔드가 JSON이 아닌 응답을 반환했습니다." },
        { status: 502 },
      )
    }
  }

  if (!res.ok) {
    return NextResponse.json(
      { error: errorMessage(res.status, data) },
      { status: res.status },
    )
  }

  return NextResponse.json(data ?? {})
}
