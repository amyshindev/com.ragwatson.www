import { getMagazineArticles } from "@/lib/domain-content"
import {
  surfaceBody,
  surfaceCard,
  surfaceEyebrow,
  surfaceMuted,
  surfaceSubtle,
  surfaceTitle,
} from "@/lib/theme-surface"
import { cn } from "@/lib/utils"

export const dynamic = "force-dynamic"

export default async function MagazinePage() {
  const articles = await getMagazineArticles()

  return (
    <main className={cn("mx-auto max-w-5xl px-4 py-12 md:py-16", surfaceBody)}>
      <header className="mb-10">
        <p className={surfaceEyebrow}>Magazine</p>
        <h1
          className={cn(
            "mt-2 text-3xl font-semibold tracking-tight md:text-4xl",
            surfaceTitle,
          )}
          style={{ fontFamily: "var(--font-heading)" }}
        >
          매거진
        </h1>
        <p className={cn("mt-4 max-w-2xl text-sm leading-relaxed", surfaceMuted)}>
          관리자가 등록한 아티스트 쇼케이스와 기사 초안을 보여줍니다.
        </p>
      </header>

      {articles.length === 0 ? (
        <p className={cn("p-6 text-sm", surfaceCard, surfaceMuted)}>
          아직 등록된 매거진 글이 없습니다.
        </p>
      ) : (
        <div className="grid gap-5">
          {articles.map((article) => (
            <article key={article.id} className={cn("p-6", surfaceCard)}>
              <p className="text-xs text-blue-600 dark:text-maestro-500/80">
                {article.author}
              </p>
              <h2 className={cn("mt-3 text-xl font-semibold", surfaceTitle)}>
                {article.articleTitle}
              </h2>
              {article.excerpt ? (
                <p className={cn("mt-4 text-sm leading-relaxed", surfaceMuted)}>
                  {article.excerpt}
                </p>
              ) : null}
              {article.body ? (
                <p className={cn("mt-5 whitespace-pre-wrap text-sm leading-relaxed", surfaceSubtle)}>
                  {article.body}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
