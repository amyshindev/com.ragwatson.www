import { getMagazineArticles } from "@/lib/domain-content"

export const dynamic = "force-dynamic"

export default async function MagazinePage() {
  const articles = await getMagazineArticles()

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 text-zinc-300 md:py-16">
      <header className="mb-10">
        <p className="text-xs font-bold uppercase tracking-wider text-maestro-500/90">
          Magazine
        </p>
        <h1
          className="mt-2 text-3xl font-semibold tracking-tight text-zinc-100 md:text-4xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          매거진
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500">
          관리자가 등록한 아티스트 쇼케이스와 기사 초안을 보여줍니다.
        </p>
      </header>

      {articles.length === 0 ? (
        <p className="border border-white/10 bg-zinc-950/60 p-6 text-sm text-zinc-500">
          아직 등록된 매거진 글이 없습니다.
        </p>
      ) : (
        <div className="grid gap-5">
          {articles.map((article) => (
            <article
              key={article.id}
              className="border border-white/10 bg-zinc-950/60 p-6 shadow-lg shadow-black/20"
            >
              <p className="text-xs text-maestro-500/80">{article.author}</p>
              <h2 className="mt-3 text-xl font-semibold text-zinc-100">
                {article.articleTitle}
              </h2>
              {article.excerpt ? (
                <p className="mt-4 text-sm leading-relaxed text-zinc-500">
                  {article.excerpt}
                </p>
              ) : null}
              {article.body ? (
                <p className="mt-5 whitespace-pre-wrap text-sm leading-relaxed text-zinc-400">
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
