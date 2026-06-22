import Link from "next/link"
import { getGalleryItems } from "@/lib/domain-content"
import {
  surfaceBody,
  surfaceCard,
  surfaceEyebrow,
  surfaceLink,
  surfaceMuted,
  surfaceTitle,
} from "@/lib/theme-surface"
import { cn } from "@/lib/utils"

export const dynamic = "force-dynamic"

export default async function GalleryPage() {
  const items = await getGalleryItems()

  return (
    <main className={cn("mx-auto max-w-6xl px-4 py-12 md:py-16", surfaceBody)}>
      <header className="mb-10">
        <p className={surfaceEyebrow}>Gallery</p>
        <h1
          className={cn(
            "mt-2 text-3xl font-semibold tracking-tight md:text-4xl",
            surfaceTitle,
          )}
          style={{ fontFamily: "var(--font-heading)" }}
        >
          갤러리
        </h1>
        <p className={cn("mt-4 max-w-2xl text-sm leading-relaxed", surfaceMuted)}>
          관리자가 등록한 커뮤니티 갤러리 작품과 미디어 링크를 보여줍니다.
        </p>
      </header>

      {items.length === 0 ? (
        <p className={cn("p-6 text-sm", surfaceCard, surfaceMuted)}>
          아직 등록된 갤러리 항목이 없습니다.
        </p>
      ) : (
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.id} className={cn("p-5", surfaceCard)}>
              <p className="text-xs text-blue-600 dark:text-maestro-500/80">
                {item.genreTags || "untagged"}
              </p>
              <h2 className={cn("mt-3 text-lg font-semibold", surfaceTitle)}>
                {item.workTitle}
              </h2>
              <p className={cn("mt-1 text-sm", surfaceMuted)}>{item.artist}</p>
              {item.mediaUrl ? (
                <Link
                  href={item.mediaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn("mt-5 inline-block text-sm", surfaceLink)}
                >
                  미디어 열기 →
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
