import Link from "next/link"
import { BarChart3, Library, Sparkles } from "lucide-react"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  surfaceBody,
  surfaceEyebrow,
  surfaceLink,
  surfaceMuted,
  surfaceSubtle,
  surfaceTitle,
} from "@/lib/theme-surface"
import { cn } from "@/lib/utils"

const hubs = [
  {
    href: "/studio/analytics",
    title: "AI 오디오 분석 대시보드",
    role: "음원 업로드 직후, AI가 분석한 음악의 유전자 데이터를 먼저 확인합니다.",
    detail:
      "곡의 하이라이트 구간 파형, 감정 지수(우울함·파괴적·몽환적 등), 추출된 주 장르가 차트와 텍스트 태그로 표현됩니다.",
    Icon: BarChart3,
  },
  {
    href: "/studio/workspace",
    title: "비주얼 커스텀 워크스페이스",
    role: "AI 아트웍을 미세 조정하고 생성하는 핵심 툴 페이지입니다.",
    detail:
      "중앙의 스포티파이 9:16 미리보기와 우측 커스텀 패널(글리치 강도, 네온 팔레트, 파편화 비트 등)로 무드를 다듬습니다.",
    Icon: Sparkles,
  },
  {
    href: "/studio/library",
    title: "마이 아카이브",
    role: "업로드한 프로젝트와 완성된 비주얼을 관리하는 개인 저장소입니다.",
    detail:
      "4K 영상 다운로드, 지난 프로젝트 다시 편집, 과거 오디오 분석 히스토리 조회를 제공할 예정입니다.",
    Icon: Library,
  },
] as const

export default function StudioPage() {
  return (
    <div className={cn("mx-auto max-w-5xl px-4 py-12 md:py-16", surfaceBody)}>
      <header className="mb-10 text-center md:mb-14">
        <p className={surfaceEyebrow}>Studio</p>
        <h1
          className={cn(
            "mt-2 text-3xl font-semibold tracking-tight md:text-4xl",
            surfaceTitle,
          )}
          style={{ fontFamily: "var(--font-heading)" }}
        >
          비주얼 스튜디오
        </h1>
        <p className={cn("mx-auto mt-4 max-w-2xl text-sm leading-relaxed md:text-base", surfaceMuted)}>
          작업 흐름에 맞게 분석 대시보드, 커스텀 워크스페이스, 아카이브로
          이동하세요.
        </p>
      </header>

      <ul className="grid gap-6 md:grid-cols-1 md:gap-8 lg:grid-cols-3">
        {hubs.map(({ href, title, role, detail, Icon }) => (
          <li key={href}>
            <Link href={href} className="group block h-full outline-none">
              <Card className="h-full border-gray-200 bg-white py-0 shadow-md transition-colors hover:border-blue-300 hover:bg-gray-50 dark:border-white/10 dark:bg-zinc-950/60 dark:shadow-lg dark:shadow-black/30 dark:backdrop-blur-xl dark:hover:border-maestro-500/35 dark:hover:bg-zinc-950/80">
                <CardHeader className="gap-4 px-6 py-6">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-gray-200 bg-gray-50 text-blue-600 transition-colors group-hover:border-blue-300 group-hover:text-blue-700 dark:border-zinc-700 dark:bg-black/40 dark:text-maestro-400 dark:group-hover:border-maestro-500/40 dark:group-hover:text-maestro-300">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="text-xs font-medium text-gray-400 transition-colors group-hover:text-blue-600 dark:text-zinc-600 dark:group-hover:text-maestro-500/80">
                      이동 →
                    </span>
                  </div>
                  <div>
                    <CardTitle
                      className={cn("text-lg", surfaceTitle)}
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {title}
                    </CardTitle>
                    <CardDescription className={cn("mt-2 text-pretty text-sm leading-relaxed", surfaceMuted)}>
                      {role}
                    </CardDescription>
                  </div>
                  <p className={cn("text-pretty text-xs leading-relaxed", surfaceSubtle)}>
                    {detail}
                  </p>
                </CardHeader>
              </Card>
            </Link>
          </li>
        ))}
      </ul>

      <p className={cn("mt-12 text-center text-sm", surfaceSubtle)}>
        <Link href="/" className={surfaceLink}>
          ← 홈으로
        </Link>
      </p>
    </div>
  )
}
