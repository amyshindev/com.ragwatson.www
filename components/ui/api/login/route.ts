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

  const loginUrl = `${backendUrl}/login`
  console.log("[api/login] FastAPI 호출:", loginUrl)

  let res: Response
  try {
    res = await fetch(loginUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    console.log("[api/login] FastAPI 응답:", res.status)
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
      const preview = raw.trim().slice(0, 200).replace(/\s+/g, " ")
      return NextResponse.json(
        {
          error:
            `백엔드가 JSON이 아닌 응답을 보냈습니다 (HTTP ${res.status}). FastAPI 주소·실행 여부를 확인하세요. 미리보기: ${preview || "(빈 본문)"}`,
        },
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
        : `로그인 요청에 실패했습니다. (${res.status})`
    return NextResponse.json({ error: detail }, { status: res.status })
  }

  return NextResponse.json(data ?? { ok: true })
}
