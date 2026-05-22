import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

const MODEL_FAST = "gemini-2.5-flash"
const MODEL_PRO = "gemini-2.5-pro"

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY?.trim()
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "GEMINI_API_KEY가 설정되지 않았습니다. .env.local 또는 Vercel 환경 변수를 확인하세요.",
      },
      { status: 503 },
    )
  }

  let body: { message?: string; model?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "잘못된 요청 본문입니다." }, { status: 400 })
  }

  const message = body.message?.trim()
  if (!message) {
    return NextResponse.json({ error: "message가 필요합니다." }, { status: 400 })
  }

  const modelName = body.model === "pro" ? MODEL_PRO : MODEL_FAST

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: modelName })
    const result = await model.generateContent(message)
    const reply = result.response.text()
    if (!reply?.trim()) {
      return NextResponse.json(
        { error: "모델이 비어 있는 응답을 반환했습니다." },
        { status: 500 },
      )
    }
    return NextResponse.json({ reply })
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Gemini API 오류"
    return NextResponse.json({ error: detail }, { status: 502 })
  }
}
