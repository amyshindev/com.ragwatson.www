import Link from "next/link"
import {
  BarChart3,
  BookOpen,
  HelpCircle,
  ImageIcon,
  Library,
  Sparkles,
} from "lucide-react"

const tasks = [
  {
    href: "/admin/gallery-register",
    title: "갤러리 등록",
    description: "커뮤니티 갤러리 작품·미디어 URL 인입",
    Icon: ImageIcon,
  },
  {
    href: "/admin/magazine-register",
    title: "매거진 등록",
    description: "아티스트 쇼케이스·기사 초안",
    Icon: BookOpen,
  },
  {
    href: "/admin/faq-register",
    title: "FAQ 등록",
    description: "가이드·지원 센터 질문/답변",
    Icon: HelpCircle,
  },
  {
    href: "/admin/library",
    title: "아카이브 인입",
    description: "마이 라이브러리 프로젝트·태그",
    Icon: Library,
  },
  {
    href: "/admin/studio-analytics",
    title: "오디오 분석 인입",
    description: "트랙·BPM·무드 분석 데이터",
    Icon: BarChart3,
  },
  {
    href: "/admin/studio-workspace",
    title: "워크스페이스 인입",
    description: "비주얼 커스텀 프리셋·글리치 설정",
    Icon: Sparkles,
  },
] as const

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-zinc-300 md:py-16">
      <header className="mb-10">
        <p className="text-xs font-bold uppercase tracking-wider text-maestro-500/90">
          Admin
        </p>
        <h1
          className="mt-2 text-3xl font-semibold tracking-tight text-zinc-100"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          운영 · 데이터 인입
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-zinc-500">
          GNB에 노출되지 않습니다. 북마크하거나 URL로 직접 접근하세요 (
          <code className="text-zinc-400">/admin</code>
          ).
        </p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-2">
        {tasks.map(({ href, title, description, Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex h-full flex-col gap-3 border border-white/10 bg-zinc-950/60 p-5 transition-colors hover:border-maestro-500/35 hover:bg-zinc-950/80"
            >
              <Icon
                className="h-5 w-5 text-maestro-400 transition-colors group-hover:text-maestro-300"
                aria-hidden
              />
              <div>
                <h2 className="font-medium text-zinc-100">{title}</h2>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                  {description}
                </p>
              </div>
              <span className="mt-auto text-xs text-maestro-500/80 group-hover:text-maestro-400">
                열기 →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/"
        className="mt-10 inline-block text-sm font-medium text-maestro-500/90 hover:text-maestro-400 hover:underline"
      >
        ← 홈으로
      </Link>
    </div>
  )
}
