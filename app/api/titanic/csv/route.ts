import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const form = await request.formData()
  const entry = form.get("file")
  if (!entry || typeof entry === "string") {
    return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 })
  }
  const file = entry as File
  const name = file.name.toLowerCase()
  if (!name.endsWith(".csv")) {
    return NextResponse.json({ error: "CSV 파일만 업로드할 수 있습니다." }, { status: 400 })
  }
  const buf = await file.arrayBuffer()
  return NextResponse.json({
    ok: true,
    filename: file.name,
    size: buf.byteLength,
  })
}
