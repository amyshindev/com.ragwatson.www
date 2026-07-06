const DIRECT_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ??
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ??
  process.env.BACKEND_URL?.replace(/\/$/, "") ??
  "http://127.0.0.1:8000"

/** 브라우저에서는 Next.js rewrite(`/backend-api`)로 same-origin 프록시. */
function resolveApiBase(): string {
  if (typeof window !== "undefined") {
    return "/backend-api"
  }
  return DIRECT_API_BASE
}

export type VisionCharacter = {
  id: string
  route: string
  name: string
  role: string
  myself_path: string
}

export type VisionCharacterListResponse = {
  items: VisionCharacter[]
}

export type VisionUploadResponse = {
  ok: boolean
  file_id: string
  filename: string
  content_type: string
  size_bytes: number
  storage?: string
  s3_bucket?: string | null
  s3_key?: string | null
  s3_url?: string | null
  message?: string
}

export type VisionMyselfResponse = {
  name?: string
  role?: string
  message?: string
  text?: string
  [key: string]: unknown
}

export type YoloTrainRequest = {
  epochs?: number
  batch_size?: number
  imgsz?: number
  device?: string
  base_weights?: string
  force_prepare?: boolean
}

export type YoloTrainResponse = {
  ok: boolean
  dataset_yaml: string
  weights_path: string | null
  save_dir: string | null
  message: string
}

async function parseError(res: Response, json: unknown): Promise<string> {
  const body = json as { detail?: string | { msg?: string }[] }
  if (typeof body.detail === "string") return body.detail
  if (Array.isArray(body.detail) && body.detail[0]?.msg) {
    return body.detail[0].msg
  }
  return `요청 실패 (${res.status})`
}

function wrapFetchError(error: unknown): Error {
  if (error instanceof TypeError && error.message === "Failed to fetch") {
    return new Error(
      "백엔드에 연결할 수 없습니다. backend/start-backend.ps1 실행 후 페이지를 새로고침하세요.",
    )
  }
  if (error instanceof Error) return error
  return new Error("비전 API 요청 중 오류가 발생했습니다.")
}

async function visionFetch(path: string, init?: RequestInit): Promise<Response> {
  try {
    return await fetch(`${resolveApiBase()}${path}`, init)
  } catch (error) {
    throw wrapFetchError(error)
  }
}

export async function fetchVisionCharacters(): Promise<VisionCharacter[]> {
  const res = await visionFetch("/vision/characters")
  const json = (await res.json()) as VisionCharacterListResponse & {
    detail?: string
  }
  if (!res.ok) {
    throw new Error(await parseError(res, json))
  }
  return json.items ?? []
}

export async function fetchVisionMyself(
  route: string,
): Promise<VisionMyselfResponse> {
  const res = await visionFetch(`/vision/${route}/myself`)
  const json = (await res.json()) as VisionMyselfResponse & { detail?: string }
  if (!res.ok) {
    throw new Error(await parseError(res, json))
  }
  return json
}

export async function uploadVisionImage(
  file: File,
): Promise<VisionUploadResponse> {
  const form = new FormData()
  form.append("file", file)

  const res = await visionFetch("/vision/upload", {
    method: "POST",
    body: form,
  })

  const json = (await res.json()) as VisionUploadResponse & { detail?: string }
  if (!res.ok) {
    throw new Error(await parseError(res, json))
  }
  return json
}

export async function trainYoloFace(
  body: YoloTrainRequest = {},
): Promise<YoloTrainResponse> {
  const res = await visionFetch("/vision/yolo/train", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      epochs: body.epochs ?? 10,
      batch_size: body.batch_size ?? 16,
      imgsz: body.imgsz ?? 640,
      device: body.device ?? "auto",
      force_prepare: body.force_prepare ?? false,
      ...(body.base_weights ? { base_weights: body.base_weights } : {}),
    }),
  })

  const json = (await res.json()) as YoloTrainResponse & { detail?: string }
  if (!res.ok) {
    throw new Error(await parseError(res, json))
  }
  return json
}
