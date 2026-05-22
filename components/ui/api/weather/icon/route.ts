import { NextRequest, NextResponse } from "next/server"

export const revalidate = 86400

/** Proxy OWM icons — avoids hotlink/referrer blocks in production browsers */
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code")?.trim()
  if (!code || !/^[0-9]{2}[dn]$/i.test(code)) {
    return new NextResponse("Invalid icon code", { status: 400 })
  }

  const iconUrl = `https://openweathermap.org/img/wn/${code}@2x.png`

  let res: Response
  try {
    res = await fetch(iconUrl, { next: { revalidate: 86400 } })
  } catch {
    return new NextResponse("Icon fetch failed", { status: 502 })
  }

  if (!res.ok) {
    return new NextResponse("Icon not found", { status: res.status })
  }

  const body = await res.arrayBuffer()
  return new NextResponse(body, {
    headers: {
      "Content-Type": res.headers.get("content-type") ?? "image/png",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  })
}
