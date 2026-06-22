"use client"

import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Crown,
  Download,
  FileText,
  Loader2,
  Server,
  Settings,
  Sparkles,
  Users,
} from "lucide-react"
import { useCallback, useEffect, useState } from "react"

import { SvAdminShell } from "@/components/siliconvalley/sv-admin-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  fetchCharacterStatuses,
  SILICONVALLEY_API_BASE,
  SILICONVALLEY_INTENTS,
  type CharacterStatus,
} from "@/lib/siliconvalley-api"
import { cn } from "@/lib/utils"

type DashboardUiState = {
  loading: boolean
  error: string | null
  rows: CharacterStatus[]
  lastRefreshed: string | null
}

const initialUi: DashboardUiState = {
  loading: false,
  error: null,
  rows: [],
  lastRefreshed: null,
}

const ROLE_ICONS = {
  CEO: Crown,
  System: Server,
  Dash: BarChart3,
  COO: Settings,
  HR: Users,
} as const

const BAR_COLORS = [
  "bg-indigo-500",
  "bg-violet-500",
  "bg-sky-400",
  "bg-emerald-400",
  "bg-rose-400",
]

const PROGRESS_COLORS = [
  "bg-indigo-500",
  "bg-violet-500",
  "bg-sky-500",
  "bg-amber-500",
  "bg-pink-500",
]

function formatTime(iso: string | null) {
  if (!iso) return "—"
  return new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(iso))
}

function SoftCard({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white p-4 shadow-md ring-1 ring-gray-200 sm:rounded-[20px] sm:p-5 lg:p-6 dark:bg-zinc-900/80 dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)] dark:ring-zinc-800",
        className,
      )}
    >
      {children}
    </div>
  )
}

function RingProgress({
  value,
  label,
  sublabel,
  color = "#4f46e5",
  size = "md",
}: {
  value: number
  label: string
  sublabel?: string
  color?: string
  size?: "sm" | "md"
}) {
  const clamped = Math.min(100, Math.max(0, value))
  const outer =
    size === "sm"
      ? "h-20 w-20 lg:h-24 lg:w-24"
      : "h-24 w-24 sm:h-28 sm:w-28"
  const inner =
    size === "sm"
      ? "h-16 w-16 lg:h-[4.5rem] lg:w-[4.5rem]"
      : "h-[4.5rem] w-[4.5rem] sm:h-[5.5rem] sm:w-[5.5rem]"
  const valueText = size === "sm" ? "text-base lg:text-lg" : "text-lg sm:text-xl"

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3">
      <div
        className={cn("relative flex items-center justify-center rounded-full", outer)}
        style={{
          background: `conic-gradient(${color} ${clamped * 3.6}deg, var(--ring-track) ${clamped * 3.6}deg)`,
        }}
      >
        <div
          className={cn(
            "flex flex-col items-center justify-center rounded-full bg-white text-center shadow-inner ring-1 ring-gray-200 dark:bg-zinc-950 dark:ring-zinc-800",
            inner,
          )}
        >
          <span className={cn("font-bold text-gray-900 dark:text-zinc-100", valueText)}>{clamped}%</span>
          <span className="text-[9px] leading-tight text-gray-500 sm:text-[10px] dark:text-zinc-500">{label}</span>
        </div>
      </div>
      {sublabel && (
        <p className="max-w-[8rem] text-center text-[11px] text-gray-500 sm:text-xs dark:text-zinc-500">{sublabel}</p>
      )}
    </div>
  )
}

function StatPill({
  label,
  value,
  tone = "default",
}: {
  label: string
  value: string
  tone?: "default" | "success" | "danger"
}) {
  return (
    <div className="flex min-w-0 flex-col rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-gray-200 lg:rounded-[20px] lg:p-5 dark:bg-zinc-900/90 dark:ring-zinc-800">
      <span className="text-[11px] text-gray-500 lg:text-xs dark:text-zinc-500">{label}</span>
      <span
        className={cn(
          "mt-0.5 text-lg font-bold lg:text-2xl",
          tone === "success" && "text-emerald-600 dark:text-emerald-400",
          tone === "danger" && "text-rose-600 dark:text-rose-400",
          tone === "default" && "text-gray-900 dark:text-zinc-100",
        )}
      >
        {value}
      </span>
    </div>
  )
}

function ApiDetailCards({ rows }: { rows: CharacterStatus[] }) {
  return (
    <div className="space-y-3 lg:hidden">
      {rows.map((row) => (
        <div
          key={row.slug}
          className="rounded-2xl border border-gray-200 bg-gray-50 p-3.5 dark:border-zinc-800 dark:bg-zinc-900/60"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-medium text-gray-900 dark:text-zinc-100">{row.label}</p>
              <p className="text-xs text-gray-500 dark:text-zinc-500">{row.role}</p>
            </div>
            {row.error ? (
              <span className="rounded-full bg-rose-500/15 px-2 py-0.5 text-[11px] font-medium text-rose-400">
                error
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
                <CheckCircle2 className="h-3 w-3" />
                ok
              </span>
            )}
          </div>
          <p className="mt-2 break-all font-mono text-[11px] text-gray-500 dark:text-zinc-500">{row.path}</p>
          <div className="mt-2 flex gap-4 text-xs text-gray-600 dark:text-zinc-400">
            <span>ID {row.data?.id ?? "—"}</span>
            <span>{row.latencyMs !== null ? `${row.latencyMs}ms` : "—"}</span>
          </div>
          {row.error && (
            <p className="mt-2 text-xs text-rose-500" role="status">
              {row.error}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

export function SvAdminDashboard() {
  const [ui, setUi] = useState<DashboardUiState>(initialUi)
  const [selectedBar, setSelectedBar] = useState<string | null>(null)

  const loadAll = useCallback(async () => {
    setUi((prev) => ({ ...prev, loading: true, error: null }))
    try {
      const rows = await fetchCharacterStatuses()
      setUi({
        loading: false,
        error: null,
        rows,
        lastRefreshed: new Date().toISOString(),
      })
    } catch {
      setUi({
        loading: false,
        error: "네트워크 오류가 발생했습니다.",
        rows: [],
        lastRefreshed: null,
      })
    }
  }, [])

  useEffect(() => {
    void loadAll()
  }, [loadAll])

  const total = ui.rows.length
  const okCount = ui.rows.filter((row) => !row.error).length
  const failCount = total - okCount
  const uptimePct = total > 0 ? Math.round((okCount / total) * 100) : 0
  const latencyRows = ui.rows.filter((row) => row.latencyMs !== null)
  const avgLatency =
    latencyRows.length > 0
      ? Math.round(
          latencyRows.reduce((sum, row) => sum + (row.latencyMs ?? 0), 0) /
            latencyRows.length,
        )
      : null
  const maxLatency = Math.max(...latencyRows.map((r) => r.latencyMs ?? 0), 1)
  const latencyTrend =
    avgLatency !== null && uptimePct >= 80 ? "+0.3%" : "-0.1%"
  const trendUp = latencyTrend.startsWith("+")

  return (
    <SvAdminShell
      onRefresh={() => void loadAll()}
      refreshing={ui.loading}
      lastRefreshed={formatTime(ui.lastRefreshed)}
    >
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <h1
          className="text-xl font-bold tracking-tight text-gray-900 dark:text-zinc-100 sm:text-2xl lg:text-3xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Dashboard
        </h1>
        <p className="mt-1 text-xs text-gray-500 sm:text-sm lg:text-base dark:text-zinc-500">
          Silicon Valley API health · character modules · intent routing
        </p>
      </div>

      {ui.error && (
        <p
          className="mb-4 rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-400 ring-1 ring-rose-500/20"
          role="status"
        >
          {ui.error}
        </p>
      )}

      {/* Mobile KPI */}
      <div className="mb-4 grid grid-cols-2 gap-2 sm:mb-5 md:hidden">
        <StatPill
          label="Uptime"
          value={ui.loading ? "…" : `${uptimePct}%`}
          tone={uptimePct >= 80 ? "success" : "danger"}
        />
        <StatPill
          label="Latency"
          value={ui.loading || avgLatency === null ? "…" : `${avgLatency}ms`}
        />
        <StatPill
          label="OK"
          value={ui.loading ? "…" : `${okCount}/${total}`}
          tone="success"
        />
        <StatPill
          label="Errors"
          value={ui.loading ? "…" : String(failCount)}
          tone={failCount > 0 ? "danger" : "default"}
        />
      </div>

      {/* Desktop KPI row */}
      <div className="mb-6 hidden gap-4 md:grid md:grid-cols-2 lg:mb-8 lg:grid-cols-4">
        <StatPill
          label="Uptime"
          value={ui.loading ? "…" : `${uptimePct}%`}
          tone={uptimePct >= 80 ? "success" : "danger"}
        />
        <StatPill
          label="Avg latency"
          value={ui.loading || avgLatency === null ? "—" : `${avgLatency}ms`}
        />
        <StatPill
          label="Endpoints OK"
          value={ui.loading ? "…" : `${okCount}/${total}`}
          tone="success"
        />
        <StatPill
          label="Errors"
          value={ui.loading ? "…" : String(failCount)}
          tone={failCount > 0 ? "danger" : "default"}
        />
      </div>

      <div className="flex flex-col gap-3 sm:gap-5 lg:grid lg:grid-cols-12 lg:gap-6">
        {/* Mobile: team first · Desktop: row 2 center */}
        <SoftCard className="order-1 lg:order-none lg:col-span-5 lg:col-start-5 lg:row-start-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900 sm:text-base dark:text-zinc-100">Character team</h2>
            <Badge variant="secondary" className="rounded-full bg-gray-100 text-[11px] text-gray-700 sm:text-xs dark:bg-zinc-800 dark:text-zinc-300">
              {total} members
            </Badge>
          </div>
          {ui.loading ? (
            <div className="flex h-40 items-center justify-center sm:h-48">
              <Loader2 className="h-6 w-6 animate-spin text-indigo-400" />
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {ui.rows.map((row, index) => {
                const Icon =
                  ROLE_ICONS[row.role as keyof typeof ROLE_ICONS] ?? Users
                const health = row.error ? 0 : 100
                return (
                  <div key={row.slug} className="flex items-center gap-2.5 sm:gap-3">
                    <div
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white sm:h-9 sm:w-9",
                        BAR_COLORS[index % BAR_COLORS.length],
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium text-gray-800 dark:text-zinc-200">
                          {row.label}
                        </p>
                        <span className="shrink-0 text-[11px] text-gray-500 sm:text-xs dark:text-zinc-500">
                          {row.latencyMs !== null ? `${row.latencyMs}ms` : "—"}
                        </span>
                      </div>
                      <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-gray-200 sm:h-2 dark:bg-zinc-800">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all",
                            row.error
                              ? "bg-rose-400"
                              : PROGRESS_COLORS[index % PROGRESS_COLORS.length],
                          )}
                          style={{ width: `${health}%` }}
                        />
                      </div>
                    </div>
                    <span className="w-7 shrink-0 text-right text-[11px] font-medium text-gray-500 sm:w-8 sm:text-xs dark:text-zinc-400">
                      {row.data?.id ?? "—"}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </SoftCard>

        <div className="order-2 grid grid-cols-2 gap-3 sm:gap-4 lg:order-none lg:col-span-3 lg:col-start-6 lg:row-start-1 lg:grid-cols-1 lg:gap-5">
          <SoftCard className="flex flex-col items-center justify-center py-4 sm:py-6 lg:py-8">
            {ui.loading ? (
              <Loader2 className="h-6 w-6 animate-spin text-indigo-400" />
            ) : (
              <RingProgress
                value={uptimePct}
                label="API up"
                sublabel="Backend endpoints healthy"
                color="#4f46e5"
                size="sm"
              />
            )}
          </SoftCard>
          <SoftCard className="flex flex-col items-center justify-center py-4 sm:py-6 lg:py-8">
            {ui.loading ? (
              <Loader2 className="h-6 w-6 animate-spin text-violet-400" />
            ) : (
              <>
                <RingProgress
                  value={Math.round((okCount / Math.max(total, 1)) * 100)}
                  label="Team"
                  color="#8b5cf6"
                  size="sm"
                />
                <div className="mt-2 flex -space-x-1.5 sm:-space-x-2">
                  {ui.rows.slice(0, 4).map((row, i) => (
                    <div
                      key={row.slug}
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-[8px] font-bold text-white dark:border-zinc-950 sm:h-7 sm:w-7 sm:text-[9px]",
                        BAR_COLORS[i % BAR_COLORS.length],
                      )}
                      title={row.label}
                    >
                      {row.label[0]}
                    </div>
                  ))}
                </div>
              </>
            )}
          </SoftCard>
        </div>

        <SoftCard className="order-3 lg:order-none lg:col-span-5 lg:col-start-1 lg:row-start-1">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between lg:mb-6">
            <div>
              <p className="text-xs text-gray-500 sm:text-sm dark:text-zinc-500">API Latency</p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-zinc-100">
                  {ui.loading || avgLatency === null ? "—" : `${avgLatency}ms`}
                </span>
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium",
                    trendUp
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-rose-500/15 text-rose-400",
                  )}
                >
                  {trendUp ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {latencyTrend}
                </span>
              </div>
            </div>
            <div className="hidden gap-4 text-xs text-gray-500 sm:flex dark:text-zinc-500">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-500" />
                This poll
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-gray-400 dark:bg-zinc-600" />
                Baseline
              </span>
            </div>
          </div>

          {selectedBar && (
            <p className="mb-2 rounded-lg bg-gray-100 px-2 py-1.5 text-center text-[11px] text-gray-700 md:hidden dark:bg-zinc-800/80 dark:text-zinc-300">
              {ui.rows.find((r) => r.slug === selectedBar)?.label}{" "}
              {ui.rows.find((r) => r.slug === selectedBar)?.latencyMs ?? "—"}ms
            </p>
          )}

          {ui.loading ? (
            <div className="flex h-36 items-center justify-center sm:h-44 lg:h-52">
              <Loader2 className="h-6 w-6 animate-spin text-indigo-400" />
            </div>
          ) : (
            <div className="flex h-36 items-end justify-between gap-1.5 px-0.5 sm:h-44 sm:gap-2 sm:px-1 lg:h-52">
              {ui.rows.map((row, index) => {
                const height =
                  row.latencyMs !== null
                    ? Math.max(12, (row.latencyMs / maxLatency) * 100)
                    : 8
                const isSelected = selectedBar === row.slug
                return (
                  <button
                    key={row.slug}
                    type="button"
                    onClick={() =>
                      setSelectedBar((prev) => (prev === row.slug ? null : row.slug))
                    }
                    className="group flex min-w-0 flex-1 flex-col items-center gap-1.5 sm:gap-2 lg:pointer-events-none lg:cursor-default"
                  >
                    <div className="relative flex h-28 w-full flex-col items-center justify-end sm:h-36 lg:h-44">
                      <div className="absolute -top-7 hidden rounded-lg bg-gray-800 px-2 py-1 text-[10px] text-white lg:group-hover:block dark:bg-zinc-800">
                        {row.label} {row.latencyMs ?? "—"}ms
                      </div>
                      <div
                        className={cn(
                          "w-full max-w-[1.75rem] rounded-t-lg transition-all sm:max-w-[2rem] sm:rounded-t-xl lg:max-w-[2.5rem]",
                          row.error ? "bg-rose-900/60" : BAR_COLORS[index % BAR_COLORS.length],
                          isSelected && "ring-2 ring-indigo-400 ring-offset-2 ring-offset-white dark:ring-offset-zinc-900 lg:ring-0",
                        )}
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <span className="truncate text-[9px] text-gray-500 sm:text-[10px] lg:text-xs dark:text-zinc-500">
                      {row.label}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </SoftCard>

        <SoftCard className="relative order-4 overflow-hidden lg:order-none lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:min-h-[280px]">
          <div className="relative z-10">
            <p className="text-[10px] font-medium uppercase tracking-wider text-indigo-200 sm:text-xs">
              Backend
            </p>
            <p className="mt-1 text-base font-semibold text-white sm:text-lg">
              Silicon Valley API
            </p>
            <p className="mt-3 font-mono text-xs tracking-widest text-white/90 sm:mt-4 sm:text-sm">
              ···· ···· ···· 8000
            </p>
            <p className="mt-1 text-[11px] text-indigo-200/80 sm:text-xs">FastAPI · localhost</p>
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] via-[#4f46e5] to-[#6366f1]"
            aria-hidden
          />
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" aria-hidden />
          <div className="absolute -bottom-12 -left-4 h-40 w-40 rounded-full bg-white/5" aria-hidden />
          <div className="relative z-10 mt-5 flex flex-wrap gap-2 sm:mt-6">
            <Button
              size="sm"
              className="min-h-10 rounded-full bg-white/20 px-4 text-white hover:bg-white/30"
              asChild
            >
              <a href={SILICONVALLEY_API_BASE + "/docs"} target="_blank" rel="noreferrer">
                OpenAPI
              </a>
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="min-h-10 rounded-full border-white/30 bg-transparent px-4 text-white hover:bg-white/10"
              asChild
            >
              <a href="/siliconvalley">Lesson</a>
            </Button>
          </div>
        </SoftCard>

        <SoftCard className="order-5 lg:order-none lg:col-span-4 lg:col-start-1 lg:row-start-2">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div>
              <p className="text-xs text-gray-500 sm:text-sm dark:text-zinc-500">Modules</p>
              <p className="text-lg font-bold text-gray-900 sm:text-xl dark:text-zinc-100">
                {SILICONVALLEY_INTENTS.length} intents
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-medium text-emerald-400 sm:text-xs">
              +{okCount} live
            </span>
          </div>
          <div className="flex h-24 items-end gap-1.5 sm:h-32 sm:gap-2">
            {SILICONVALLEY_INTENTS.map((intent, i) => (
              <div key={intent.key} className="flex min-w-0 flex-1 flex-col items-center gap-1">
                <div
                  className={cn("w-full rounded-t-md sm:rounded-t-lg", BAR_COLORS[i % BAR_COLORS.length])}
                  style={{ height: `${40 + i * 12}%` }}
                />
                <span className="truncate text-[8px] text-gray-500 sm:text-[9px] dark:text-zinc-500">
                  {intent.key.slice(0, 3)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-2xl bg-gray-50 px-3 py-2.5 ring-1 ring-gray-200 dark:bg-zinc-950/80 dark:ring-zinc-800">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12"
              style={{
                background: `conic-gradient(#10b981 ${uptimePct * 3.6}deg, var(--ring-track) ${uptimePct * 3.6}deg)`,
              }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[11px] font-bold text-emerald-600 ring-1 ring-gray-200 dark:bg-zinc-950 dark:text-emerald-400 dark:ring-zinc-800 sm:h-9 sm:w-9 sm:text-xs">
                {uptimePct}%
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-gray-800 sm:text-sm dark:text-zinc-200">Backend endpoints</p>
              <p className="truncate font-mono text-[10px] text-gray-500 sm:text-[11px] dark:text-zinc-500">
                {SILICONVALLEY_API_BASE}
              </p>
            </div>
          </div>
        </SoftCard>

        <div className="order-6 flex flex-col gap-3 sm:gap-5 lg:order-none lg:col-span-3 lg:col-start-10 lg:row-start-2">
          <SoftCard>
            <h2 className="mb-3 text-sm font-semibold text-gray-900 sm:mb-4 sm:text-base dark:text-zinc-100">
              Intent map
            </h2>
            <ul className="space-y-2 sm:space-y-3">
              {SILICONVALLEY_INTENTS.map((intent, i) => {
                const icons = [Sparkles, Server, BarChart3, Activity, Users]
                const Icon = icons[i % icons.length]
                return (
                  <li
                    key={intent.key}
                    className="flex items-center gap-3 rounded-xl px-1 py-2 active:bg-gray-100 sm:px-2 sm:py-1.5 sm:hover:bg-gray-100 dark:active:bg-zinc-800/80 dark:sm:hover:bg-zinc-800/60"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 sm:h-8 sm:w-8 dark:bg-indigo-500/15 dark:text-indigo-400">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-800 dark:text-zinc-200">{intent.label}</p>
                      <p className="truncate text-xs text-gray-500 dark:text-zinc-500">{intent.owner}</p>
                    </div>
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  </li>
                )
              })}
            </ul>
          </SoftCard>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-900/80 via-rose-800 to-orange-900/80 p-4 text-white shadow-lg shadow-black/30 ring-1 ring-rose-500/20 sm:rounded-[20px] sm:p-5">
            <p className="text-[10px] font-medium uppercase tracking-wider text-white/80 sm:text-xs">
              Docs
            </p>
            <p className="mt-1 text-base font-bold sm:text-lg">Silicon Valley Guide</p>
            <p className="mt-2 text-xs text-white/90 sm:text-sm">
              Hexagonal architecture lesson with 5 character modules.
            </p>
            <Button
              size="sm"
              className="mt-4 min-h-10 w-full rounded-full bg-white text-rose-600 hover:bg-white/90 sm:w-auto"
              asChild
            >
              <a href="/siliconvalley">
                <Download className="mr-2 h-4 w-4" />
                Open lesson
              </a>
            </Button>
            <FileText className="absolute -bottom-2 -right-2 h-20 w-20 text-white/20 sm:h-24 sm:w-24" />
          </div>
        </div>
      </div>

      <SoftCard className="mt-4 sm:mt-5 lg:mt-8">
        <h2 className="mb-3 text-sm font-semibold text-gray-900 sm:mb-4 sm:text-base lg:text-lg dark:text-zinc-100">
          API detail
        </h2>
        {!ui.loading && ui.rows.length > 0 && (
          <>
            <ApiDetailCards rows={ui.rows} />
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-xs text-gray-500 dark:border-zinc-800 dark:text-zinc-500">
                    <th className="pb-3 pr-4 font-medium">Character</th>
                    <th className="pb-3 pr-4 font-medium">Role</th>
                    <th className="pb-3 pr-4 font-medium">Endpoint</th>
                    <th className="pb-3 pr-4 font-medium">ID</th>
                    <th className="pb-3 pr-4 font-medium">ms</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ui.rows.map((row) => (
                    <tr key={row.slug} className="border-b border-gray-100 last:border-0 dark:border-zinc-800/60">
                      <td className="py-3 pr-4 font-medium text-gray-800 dark:text-zinc-200">{row.label}</td>
                      <td className="py-3 pr-4 text-gray-600 dark:text-zinc-400">{row.role}</td>
                      <td className="max-w-[200px] truncate py-3 pr-4 font-mono text-xs text-gray-500 dark:text-zinc-500">
                        {row.path}
                      </td>
                      <td className="py-3 pr-4 text-gray-600 dark:text-zinc-400">{row.data?.id ?? "—"}</td>
                      <td className="py-3 pr-4 text-gray-600 dark:text-zinc-400">{row.latencyMs ?? "—"}</td>
                      <td className="py-3">
                        {row.error ? (
                          <span className="text-rose-400">{row.error}</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-emerald-400">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            ok
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </SoftCard>
    </SvAdminShell>
  )
}
