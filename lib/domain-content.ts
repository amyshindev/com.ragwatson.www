const backendUrl = (
  process.env.BACKEND_URL ??
  process.env.NEXT_PUBLIC_BACKEND_URL ??
  "http://127.0.0.1:8000"
).replace(/\/$/, "")

export type GalleryItem = {
  id: number
  workTitle: string
  artist: string
  genreTags?: string | null
  mediaUrl?: string | null
  createdAt: string
}

export type MagazineArticle = {
  id: number
  articleTitle: string
  author: string
  excerpt?: string | null
  body?: string | null
  createdAt: string
}

export type FaqEntry = {
  id: number
  category?: string | null
  question: string
  answer: string
  createdAt: string
}

async function fetchDomainItems<T>(path: string): Promise<T[]> {
  try {
    const res = await fetch(`${backendUrl}${path}`, { cache: "no-store" })
    if (!res.ok) return []
    const data = (await res.json()) as unknown
    return Array.isArray(data) ? (data as T[]) : []
  } catch {
    return []
  }
}

export function getGalleryItems() {
  return fetchDomainItems<GalleryItem>("/api/domain/gallery")
}

export function getMagazineArticles() {
  return fetchDomainItems<MagazineArticle>("/api/domain/magazine")
}

export function getFaqEntries() {
  return fetchDomainItems<FaqEntry>("/api/domain/faq")
}
