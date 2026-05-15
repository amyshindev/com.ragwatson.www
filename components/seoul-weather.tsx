"use client"

import { useEffect, useState } from "react"
import { Cloud, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

type WeatherData = {
  city: string
  temp: number
  description: string
  icon: string
}

const pillClass =
  "flex items-center gap-1.5 rounded-full border border-white/70 bg-white/45 px-2.5 py-1.5 text-sm text-slate-700 shadow-sm backdrop-blur-sm"

export function SeoulWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [iconFailed, setIconFailed] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch("/api/weather/seoul")
        const raw = await res.text()
        if (!raw) {
          if (!cancelled) setError("빈 응답")
          return
        }
        const data = JSON.parse(raw) as WeatherData & { error?: string }
        if (!res.ok || data.error) {
          if (!cancelled) {
            setError(
              data.error ??
                (res.status === 401
                  ? "API 키가 올바르지 않습니다. OpenWeatherMap에서 키를 확인하세요."
                  : `오류 (${res.status})`),
            )
          }
          return
        }
        if (!cancelled) {
          setWeather(data)
          setError(null)
          setIconFailed(false)
        }
      } catch {
        if (!cancelled) setError("날씨를 불러오지 못했습니다.")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return (
      <span className={cn(pillClass, "text-slate-500")} aria-busy="true">
        <Cloud className="h-4 w-4 shrink-0 opacity-60" aria-hidden />
        <span className="text-xs sm:text-sm">서울 …</span>
      </span>
    )
  }

  if (error || !weather) {
    return (
      <span
        className={cn(pillClass, "max-w-[11rem] text-xs text-slate-500 sm:max-w-none sm:text-sm")}
        title={error ?? undefined}
      >
        <Cloud className="h-4 w-4 shrink-0" aria-hidden />
        <span className="truncate">서울 · 날씨 없음</span>
      </span>
    )
  }

  return (
    <div
      className={pillClass}
      title={`${weather.city} ${weather.description}`}
    >
      {iconFailed ? (
        <Sun className="h-5 w-5 shrink-0 text-amber-500" aria-hidden />
      ) : (
        <img
          src={`/api/weather/icon?code=${encodeURIComponent(weather.icon)}`}
          alt=""
          width={28}
          height={28}
          className="h-7 w-7 shrink-0 object-contain"
          onError={() => setIconFailed(true)}
        />
      )}
      <span className="font-medium tabular-nums">{weather.city}</span>
      <span className="tabular-nums">{weather.temp}°</span>
      <span className="hidden max-w-[5rem] truncate text-slate-500 sm:inline md:max-w-none">
        {weather.description}
      </span>
    </div>
  )
}
