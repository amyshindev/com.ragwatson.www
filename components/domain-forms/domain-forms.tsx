"use client"

import { type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getAuthUser } from "@/lib/auth-session"
import { cn } from "@/lib/utils"

const fieldClass =
  "rounded-none border-gray-300 bg-white text-gray-900 shadow-none placeholder:text-gray-400 focus-visible:border-blue-500/50 focus-visible:ring-blue-500/20 md:text-sm dark:border-zinc-700 dark:bg-black/40 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus-visible:border-maestro-500/50 dark:focus-visible:ring-maestro-500/20"

const labelClass = "text-gray-600 dark:text-zinc-400"

const submitButtonClass =
  "mt-2 w-full rounded-none border-gray-300 bg-gray-100 text-gray-900 hover:bg-gray-200 hover:text-gray-950 dark:border-zinc-600 dark:bg-zinc-900/80 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:hover:text-white"

const selectClass = cn(
  fieldClass,
  "h-9 w-full px-3 py-2 outline-none [&>option]:bg-zinc-950",
)

function backendBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:8000"
  ).replace(/\/$/, "")
}

function formatApiError(status: number, raw: string): string {
  try {
    const data = JSON.parse(raw) as { detail?: unknown }
    const { detail } = data
    if (typeof detail === "string") return detail
    if (Array.isArray(detail)) {
      return detail
        .map((item) => {
          if (item && typeof item === "object" && "msg" in item) {
            return String((item as { msg: unknown }).msg)
          }
          return ""
        })
        .filter(Boolean)
        .join("\n")
    }
  } catch {
    /* fallback below */
  }
  const preview = raw.trim().slice(0, 180).replace(/\s+/g, " ")
  return preview ? `HTTP ${status}: ${preview}` : `요청 실패 (HTTP ${status})`
}

async function submitDomainForm(
  e: FormEvent<HTMLFormElement>,
  path: string,
  successLabel: string,
) {
  e.preventDefault()
  const form = e.currentTarget
  const fd = new FormData(form)
  const body: Record<string, string> = {}
  fd.forEach((value, key) => {
    body[key] = typeof value === "string" ? value : ""
  })
  const url = `${backendBaseUrl()}${path}`
  const authUser = getAuthUser()
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authUser ? { "X-Maestro-User-Id": String(authUser.id) } : {}),
      },
      body: JSON.stringify(body),
    })
    const raw = await res.text()
    if (!res.ok) {
      window.alert(`${successLabel}\n\n${formatApiError(res.status, raw)}`)
      return
    }
    let parsed: { id?: number; kind?: string } = {}
    if (raw) {
      try {
        parsed = JSON.parse(raw) as typeof parsed
      } catch {
        parsed = {}
      }
    }
    window.alert(
      `${successLabel}\n\n저장 완료 · DB id=${parsed.id ?? "?"} (${parsed.kind ?? ""})`,
    )
    form.reset()
  } catch {
    window.alert(
      `${successLabel}\n\n백엔드에 연결할 수 없습니다. FastAPI(기본 127.0.0.1:8000) 실행 여부와 NEXT_PUBLIC_BACKEND_URL 값을 확인하세요.`,
    )
  }
}

export function LibraryDataForm() {
  return (
    <form
      className="grid gap-5"
      onSubmit={(e) => submitDomainForm(e, "/api/domain/library", "마이 아카이브")}
    >
      <div className="grid gap-2">
        <Label htmlFor="library-title" className={labelClass}>
          프로젝트 이름
        </Label>
        <Input
          id="library-title"
          name="projectTitle"
          required
          placeholder="예: 앨범 A 캔버스 루프 v2"
          className={fieldClass}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="library-memo" className={labelClass}>
          메모
        </Label>
        <Textarea
          id="library-memo"
          name="memo"
          rows={3}
          placeholder="폴더 버전, 출시일 메모 등"
          className={fieldClass}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="library-tags" className={labelClass}>
          태그 (쉼표로 구분)
        </Label>
        <Input
          id="library-tags"
          name="tags"
          placeholder="electronica, canvas, loop"
          className={fieldClass}
        />
      </div>
      <Button
        type="submit"
        variant="outline"
        className={submitButtonClass}
      >
        등록
      </Button>
    </form>
  )
}

export function StudioWorkspaceDataForm() {
  return (
    <form
      className="grid gap-5"
      onSubmit={(e) =>
        submitDomainForm(e, "/api/domain/studio/workspace", "워크스페이스")
      }
    >
      <div className="grid gap-2">
        <Label htmlFor="ws-name" className={labelClass}>
          작업 / 프리셋 이름
        </Label>
        <Input
          id="ws-name"
          name="workspaceName"
          required
          placeholder="예: Neon break draft"
          className={fieldClass}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="ws-glitch" className={labelClass}>
          글리치 강도 (0–100)
        </Label>
        <Input
          id="ws-glitch"
          name="glitchIntensity"
          type="number"
          min={0}
          max={100}
          defaultValue={42}
          className={fieldClass}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="ws-notes" className={labelClass}>
          커스텀 노트
        </Label>
        <Textarea
          id="ws-notes"
          name="notes"
          rows={4}
          placeholder="프레임, 비트 트리거,보내기 규격 등"
          className={fieldClass}
        />
      </div>
      <Button
        type="submit"
        variant="outline"
        className={submitButtonClass}
      >
        저장
      </Button>
    </form>
  )
}

export function StudioAnalyticsDataForm() {
  return (
    <form
      className="grid gap-5"
      onSubmit={(e) =>
        submitDomainForm(e, "/api/domain/studio/analytics", "오디오 분석")
      }
    >
      <div className="grid gap-2">
        <Label htmlFor="an-track" className={labelClass}>
          트랙 / 작업명
        </Label>
        <Input
          id="an-track"
          name="trackTitle"
          required
          placeholder="곡 제목 또는 임시 ID"
          className={fieldClass}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="an-bpm" className={labelClass}>
          BPM
        </Label>
        <Input
          id="an-bpm"
          name="bpm"
          type="number"
          min={1}
          placeholder="120"
          className={fieldClass}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="an-mood" className={labelClass}>
          무드
        </Label>
        <select id="an-mood" name="mood" className={selectClass} required defaultValue="">
          <option value="" disabled>
            선택
          </option>
          <option value="dreamy">몽환적</option>
          <option value="aggressive">파괴적 / 강렬</option>
          <option value="melancholic">우울·정적</option>
          <option value="bright">밝음·에너지</option>
        </select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="an-genre" className={labelClass}>
          장르 태그
        </Label>
        <Input
          id="an-genre"
          name="genre"
          placeholder="예: Progressive, Industrial"
          className={fieldClass}
        />
      </div>
      <Button
        type="submit"
        variant="outline"
        className={submitButtonClass}
      >
        분석 결과 저장
      </Button>
    </form>
  )
}

export function GalleryEntryForm() {
  return (
    <form
      className="grid gap-5"
      onSubmit={(e) => submitDomainForm(e, "/api/domain/gallery", "갤러리 등록")}
    >
      <div className="grid gap-2">
        <Label htmlFor="gal-title" className={labelClass}>
          작품 제목
        </Label>
        <Input
          id="gal-title"
          name="workTitle"
          required
          className={fieldClass}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="gal-artist" className={labelClass}>
          아티스트명
        </Label>
        <Input id="gal-artist" name="artist" required className={fieldClass} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="gal-genre" className={labelClass}>
          장르 · 태그
        </Label>
        <Input
          id="gal-genre"
          name="genreTags"
          placeholder="Industrial, Electronica"
          className={fieldClass}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="gal-url" className={labelClass}>
          미디어 URL (9:16 루프)
        </Label>
        <Input
          id="gal-url"
          name="mediaUrl"
          type="url"
          placeholder="https://"
          className={fieldClass}
        />
      </div>
      <Button
        type="submit"
        variant="outline"
        className={submitButtonClass}
      >
        갤러리에 제출
      </Button>
    </form>
  )
}

export function MagazineArticleForm() {
  return (
    <form
      className="grid gap-5"
      onSubmit={(e) => submitDomainForm(e, "/api/domain/magazine", "매거진 기사")}
    >
      <div className="grid gap-2">
        <Label htmlFor="mag-title" className={labelClass}>
          기사 제목
        </Label>
        <Input id="mag-title" name="articleTitle" required className={fieldClass} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="mag-author" className={labelClass}>
          저자
        </Label>
        <Input id="mag-author" name="author" required className={fieldClass} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="mag-excerpt" className={labelClass}>
          요약
        </Label>
        <Textarea
          id="mag-excerpt"
          name="excerpt"
          rows={2}
          className={fieldClass}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="mag-body" className={labelClass}>
          본문
        </Label>
        <Textarea id="mag-body" name="body" rows={8} className={fieldClass} />
      </div>
      <Button
        type="submit"
        variant="outline"
        className={submitButtonClass}
      >
        초안 저장
      </Button>
    </form>
  )
}

export function FaqEntryForm() {
  return (
    <form
      className="grid gap-5"
      onSubmit={(e) => submitDomainForm(e, "/api/domain/faq", "FAQ")}
    >
      <div className="grid gap-2">
        <Label htmlFor="faq-cat" className={labelClass}>
          카테고리
        </Label>
        <Input
          id="faq-cat"
          name="category"
          placeholder="캔버스, 계정, 요금 ..."
          className={fieldClass}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="faq-q" className={labelClass}>
          질문
        </Label>
        <Textarea id="faq-q" name="question" rows={2} required className={fieldClass} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="faq-a" className={labelClass}>
          답변
        </Label>
        <Textarea id="faq-a" name="answer" rows={6} required className={fieldClass} />
      </div>
      <Button
        type="submit"
        variant="outline"
        className={submitButtonClass}
      >
        FAQ 등록
      </Button>
    </form>
  )
}
