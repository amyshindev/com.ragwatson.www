import Link from "next/link"
import { getGalleryItems } from "@/lib/domain-content"

export const dynamic = "force-dynamic"

export default async function GalleryPage() {
  const items = await getGalleryItems()

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 text-zinc-300 md:py-16">
      <header className="mb-10">
        <p className="text-xs font-bold uppercase tracking-wider text-maestro-500/90">
          Gallery
        </p>
        <h1
          className="mt-2 text-3xl font-semibold tracking-tight text-zinc-100 md:text-4xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          갤러리
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500">
          관리자가 등록한 커뮤니티 갤러리 작품과 미디어 링크를 보여줍니다.
        </p>
      </header>

      {items.length === 0 ? (
        <p className="border border-white/10 bg-zinc-950/60 p-6 text-sm text-zinc-500">
          아직 등록된 갤러리 항목이 없습니다.
        </p>
      ) : (
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="border border-white/10 bg-zinc-950/60 p-5 shadow-lg shadow-black/20"
            >
              <p className="text-xs text-maestro-500/80">
                {item.genreTags || "untagged"}
              </p>
              <h2 className="mt-3 text-lg font-semibold text-zinc-100">
                {item.workTitle}
              </h2>
              <p className="mt-1 text-sm text-zinc-500">{item.artist}</p>
              {item.mediaUrl ? (
                <Link
                  href={item.mediaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-block text-sm font-medium text-maestro-500/90 hover:text-maestro-400 hover:underline"
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
