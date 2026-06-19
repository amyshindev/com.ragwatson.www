export const SILICONVALLEY_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000"

export type MyselfResponse = {
  id: number
  name: string
}

export const SILICONVALLEY_CHARACTERS = [
  {
    slug: "hendricks",
    label: "Hendricks",
    role: "CEO",
    path: "/siliconvalley/hendricks/myself",
    description: "CEO · 전략·오케스트레이션",
  },
  {
    slug: "gilfoyle",
    label: "Gilfoyle",
    role: "System",
    path: "/siliconvalley/gilfoyle/myself",
    description: "System · 인프라·배포",
  },
  {
    slug: "dinesh",
    label: "Dinesh",
    role: "Dash",
    path: "/siliconvalley/dinesh/myself",
    description: "Dash · 지표·대시보드",
  },
  {
    slug: "dunn",
    label: "Dunn",
    role: "COO",
    path: "/siliconvalley/dunn/myself",
    description: "COO · 운영·프로세스",
  },
  {
    slug: "bighetti",
    label: "Bighetti",
    role: "HR",
    path: "/siliconvalley/bighetti/myself",
    description: "HR · 인사·조직",
  },
] as const

export const SILICONVALLEY_INTENTS = [
  { key: "STRATEGY", label: "전략", owner: "Hendricks", keywords: "ceo, 비전, 피치, 투자" },
  { key: "INFRA", label: "인프라", owner: "Gilfoyle", keywords: "서버, 배포, 장애" },
  { key: "METRICS", label: "지표", owner: "Dinesh", keywords: "대시보드, mau, dau" },
  { key: "OPERATIONS", label: "운영", owner: "Dunn", keywords: "프로세스, coo" },
  { key: "HR", label: "인사", owner: "Bighetti", keywords: "채용, 팀, 조직" },
] as const

export type CharacterStatus = (typeof SILICONVALLEY_CHARACTERS)[number] & {
  data: MyselfResponse | null
  error: string | null
  latencyMs: number | null
}

export async function fetchMyself(path: string): Promise<MyselfResponse> {
  const res = await fetch(`${SILICONVALLEY_API_BASE}${path}`, {
    method: "GET",
    headers: { "Cache-Control": "no-cache" },
  })
  const raw = await res.text()
  const data = (raw ? JSON.parse(raw) : null) as MyselfResponse & {
    detail?: string
  }

  if (!res.ok) {
    throw new Error(data?.detail ?? "자료를 불러오지 못했습니다.")
  }

  return {
    id: data.id,
    name: data.name,
  }
}

export async function fetchCharacterStatuses(): Promise<CharacterStatus[]> {
  return Promise.all(
    SILICONVALLEY_CHARACTERS.map(async (character) => {
      const started = performance.now()
      try {
        const data = await fetchMyself(character.path)
        return {
          ...character,
          data,
          error: null,
          latencyMs: Math.round(performance.now() - started),
        }
      } catch (err) {
        return {
          ...character,
          data: null,
          error: err instanceof Error ? err.message : "요청 실패",
          latencyMs: null,
        }
      }
    }),
  )
}
