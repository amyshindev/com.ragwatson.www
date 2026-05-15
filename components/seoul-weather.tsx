"use client"

import { useEffect, useState } from "react"
import {
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Moon,
  Sun,
} from "lucide-react"
import { cn } from "@/lib/utils"

type WeatherData = {
  city: string
  temp: number
  description: string
  icon: string
}

const pillClass =
  "flex items-center gap-1.5 rounded-full border border-white/70 bg-white/45 px-2.5 py-1.5 text-sm text-slate-700 shadow-sm backdrop-blur-sm"

/** OpenWeather icon code → Lucide (no external image — works on Vercel & localhost) */
function WeatherGlyph({ code }: { code: string }) {
  const id = code.slice(0, 2)
  const isNight = code.endsWith("n")
  const className = "h-5 w-5 shrink-0"

  if (id === "01") {
    return isNight ? (
      <Moon className={cn(className, "text-indigo-500")} aria-hidden />
    ) : (
      <Sun className={cn(className, "text-amber-500")} aria-hidden />
    )
  }
  if (id === "02") {
    return <Cloud className={cn(className, "text-slate-500")} aria-hidden />
  }
  if (id === "03" || id === "04") {
    return <Cloud className={cn(className, "text-slate-400")} aria-hidden />
  }
  if (id === "09" || id === "10") {
    return <CloudRain className={cn(className, "text-sky-600")} aria-hidden />
  }
  if (id === "11") {
    return (
      <CloudLightning className={cn(className, "text-violet-600")} aria-hidden />
    )
  }
  if (id === "13") {
    return <CloudSnow className={cn(className, "text-sky-400")} aria-hidden />
  }
  if (id === "50") {
    return <CloudFog className={cn(className, "text-slate-400")} aria-hidden />
  }
  return <Cloud className={cn(className, "text-slate-500")} aria-hidden />
}

export function SeoulWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

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
      <WeatherGlyph code={weather.icon} />
      <span className="font-medium tabular-nums">{weather.city}</span>
      <span className="tabular-nums">{weather.temp}°</span>
      <span className="hidden max-w-[5rem] truncate text-slate-500 sm:inline md:max-w-none">
        {weather.description}
      </span>
    </div>
  )
}

