import { getFaqEntries } from "@/lib/domain-content"
import {
  surfaceBody,
  surfaceCard,
  surfaceEyebrow,
  surfaceMuted,
  surfaceTitle,
} from "@/lib/theme-surface"
import { cn } from "@/lib/utils"

export const dynamic = "force-dynamic"

export default async function FaqPage() {
  const entries = await getFaqEntries()

  return (
    <main className={cn("mx-auto max-w-4xl px-4 py-12 md:py-16", surfaceBody)}>
      <header className="mb-10">
        <p className={surfaceEyebrow}>FAQ</p>
        <h1
          className={cn(
            "mt-2 text-3xl font-semibold tracking-tight md:text-4xl",
            surfaceTitle,
          )}
          style={{ fontFamily: "var(--font-heading)" }}
        >
          FAQ
        </h1>
        <p className={cn("mt-4 max-w-2xl text-sm leading-relaxed", surfaceMuted)}>
          관리자가 등록한 자주 묻는 질문과 답변을 보여줍니다.
        </p>
      </header>

      {entries.length === 0 ? (
        <p className={cn("p-6 text-sm", surfaceCard, surfaceMuted)}>
          아직 등록된 FAQ가 없습니다.
        </p>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <article key={entry.id} className={cn("p-5", surfaceCard)}>
              {entry.category ? (
                <p className="text-xs text-blue-600 dark:text-maestro-500/80">
                  {entry.category}
                </p>
              ) : null}
              <h2 className={cn("mt-2 text-base font-semibold", surfaceTitle)}>
                {entry.question}
              </h2>
              <p className={cn("mt-3 whitespace-pre-wrap text-sm leading-relaxed", surfaceMuted)}>
                {entry.answer}
              </p>
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
