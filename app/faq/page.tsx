import { getFaqEntries } from "@/lib/domain-content"

export const dynamic = "force-dynamic"

export default async function FaqPage() {
  const entries = await getFaqEntries()

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 text-zinc-300 md:py-16">
      <header className="mb-10">
        <p className="text-xs font-bold uppercase tracking-wider text-maestro-500/90">
          FAQ
        </p>
        <h1
          className="mt-2 text-3xl font-semibold tracking-tight text-zinc-100 md:text-4xl"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          FAQ
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500">
          관리자가 등록한 자주 묻는 질문과 답변을 보여줍니다.
        </p>
      </header>

      {entries.length === 0 ? (
        <p className="border border-white/10 bg-zinc-950/60 p-6 text-sm text-zinc-500">
          아직 등록된 FAQ가 없습니다.
        </p>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <article
              key={entry.id}
              className="border border-white/10 bg-zinc-950/60 p-5 shadow-lg shadow-black/20"
            >
              {entry.category ? (
                <p className="text-xs text-maestro-500/80">{entry.category}</p>
              ) : null}
              <h2 className="mt-2 text-base font-semibold text-zinc-100">
                {entry.question}
              </h2>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-zinc-500">
                {entry.answer}
              </p>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
