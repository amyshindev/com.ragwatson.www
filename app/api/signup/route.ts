import { NextRequest, NextResponse } from "next/server"

const backendUrl = (
  process.env.BACKEND_URL ??
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  "http://127.0.0.1:8000"
).replace(/\/$/, "")

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "잘못된 JSON입니다." }, { status: 400 })
  }

  let res: Response
  try {
    res = await fetch(`${backendUrl}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  } catch {
    return NextResponse.json(
      {
        error:
          "백엔드에 연결할 수 없습니다. BACKEND_URL과 FastAPI 서버 상태를 확인하세요.",
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
    const detail =
      typeof data === "object" &&
      data !== null &&
      "detail" in data &&
      typeof (data as { detail: unknown }).detail === "string"
        ? (data as { detail: string }).detail
        : `회원가입 요청에 실패했습니다. (${res.status})`
    return NextResponse.json({ error: detail }, { status: res.status })
  }

  return NextResponse.json(data ?? { ok: true })
}
