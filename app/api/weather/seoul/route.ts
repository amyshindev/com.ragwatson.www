import { NextResponse } from "next/server"

export const revalidate = 600

type OwmWeather = {
  main?: { temp?: number }
  weather?: Array<{ description?: string; icon?: string }>
  name?: string
}

export async function GET() {
  const apiKey = (process.env.OPENWEATHERMAP_API_KEY ?? "").trim()

  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENWEATHERMAP_API_KEY is not set." },
      { status: 503 },
    )
  }

  const url = new URL("https://api.openweathermap.org/data/2.5/weather")
  url.searchParams.set("q", "Seoul,KR")
  url.searchParams.set("appid", apiKey)
  url.searchParams.set("units", "metric")
  url.searchParams.set("lang", "kr")

  let res: Response
  try {
    res = await fetch(url.toString(), { next: { revalidate: 600 } })
  } catch {
    return NextResponse.json(
      { error: "날씨 서비스에 연결할 수 없습니다." },
      { status: 503 },
    )
  }

  const raw = await res.text()
  let data: OwmWeather | null = null
  if (raw) {
    try {
      data = JSON.parse(raw) as OwmWeather
    } catch {
      return NextResponse.json(
        { error: "날씨 응답 형식이 올바르지 않습니다." },
        { status: 502 },
      )
    }
  }

  if (!res.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof (data as { message: unknown }).message === "string"
        ? (data as { message: string }).message
        : "날씨를 가져오지 못했습니다."
    return NextResponse.json({ error: message }, { status: res.status })
  }

  const temp = data?.main?.temp
  const weather = data?.weather?.[0]
  if (temp === undefined || !weather?.icon) {
    return NextResponse.json(
      { error: "날씨 데이터가 비어 있습니다." },
      { status: 502 },
    )
  }

  return NextResponse.json({
    city: "서울",
    temp: Math.round(temp),
    description: weather.description ?? "",
    icon: weather.icon,
  })
}
