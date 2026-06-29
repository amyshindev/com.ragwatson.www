const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "http://127.0.0.1:8000"

export type FakerEmailRequest = {
  to: string
  prompt: string
  subject?: string
}

export type FakerEmailResponse = {
  ok: boolean
  to: string
  subject: string
  body_preview: string
  n8n_status: string
}

export async function sendFakerEmail(
  payload: FakerEmailRequest,
): Promise<FakerEmailResponse> {
  const res = await fetch(`${API_BASE}/automata/faker/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  const json = (await res.json()) as FakerEmailResponse & { detail?: string }

  if (!res.ok) {
    const detail =
      typeof json.detail === "string"
        ? json.detail
        : `요청 실패 (${res.status})`
    throw new Error(detail)
  }

  return json
}
