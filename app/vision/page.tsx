"use client"

import { useEffect, useRef, useState } from "react"
import { ImageIcon, Loader2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  fetchVisionCharacters,
  trainYoloFace,
  uploadVisionImage,
  type VisionCharacter,
} from "@/lib/vision-api"
import {
  surfaceBody,
  surfaceCard,
  surfaceEyebrow,
  surfaceMuted,
  surfaceSubtle,
  surfaceTitle,
} from "@/lib/theme-surface"
import { cn } from "@/lib/utils"

type PageState = {
  loading: boolean
  error: string | null
  characters: VisionCharacter[]
  uploadMessage: string | null
  trainMessage: string | null
  training: boolean
}

const initialState: PageState = {
  loading: true,
  error: null,
  characters: [],
  uploadMessage: null,
  trainMessage: null,
  training: false,
}

export default function VisionPage() {
  const [state, setState] = useState<PageState>(initialState)
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let cancelled = false
    void fetchVisionCharacters()
      .then((items) => {
        if (!cancelled) {
          setState({ loading: false, error: null, characters: items, uploadMessage: null })
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            loading: false,
            error: error instanceof Error ? error.message : "비전 API 연결 실패",
            characters: [],
            uploadMessage: null,
          })
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const onSelectFile = (f: File) => {
    if (!f.type.startsWith("image/")) return
    setFile(f)
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return URL.createObjectURL(f)
    })
  }

  const upload = async () => {
    if (!file) return
    setUploading(true)
    setState((prev) => ({ ...prev, uploadMessage: null }))
    try {
      const result = await uploadVisionImage(file)
      setState((prev) => ({
        ...prev,
        uploadMessage: result.message ?? `업로드 완료: ${result.filename}`,
      }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        uploadMessage:
          error instanceof Error ? error.message : "업로드 중 오류가 발생했습니다.",
      }))
    } finally {
      setUploading(false)
    }
  }

  const startTraining = async () => {
    setState((prev) => ({ ...prev, training: true, trainMessage: null }))
    try {
      const result = await trainYoloFace({ epochs: 10, device: "auto", batch_size: 16 })
      setState((prev) => ({
        ...prev,
        training: false,
        trainMessage: result.message ?? `학습 완료: ${result.weights_path ?? "weights"}`,
      }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        training: false,
        trainMessage:
          error instanceof Error ? error.message : "YOLO 학습 중 오류가 발생했습니다.",
      }))
    }
  }

  return (
    <div>
      <p className={surfaceEyebrow}>Vision</p>
      <h1 className={cn("mt-2 text-3xl font-bold", surfaceTitle)}>비전 처리</h1>
      <p className={cn("mt-3 text-sm", surfaceSubtle)}>
        이미지 업로드와 YOLO 기반 얼굴 인식 모듈을 사용합니다.
      </p>

      <div className={cn("mt-8 rounded-lg p-6", surfaceCard)}>
        <h2 className={cn("text-lg font-semibold", surfaceTitle)}>이미지 업로드</h2>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) onSelectFile(f)
            e.target.value = ""
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-4 flex w-full cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-gray-300 px-6 py-10 dark:border-white/15"
        >
          <ImageIcon className="mb-3 h-9 w-9 text-blue-600 dark:text-maestro-400" />
          <span className="font-medium">{file ? file.name : "클릭하여 이미지 선택"}</span>
        </button>
        {previewUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="미리보기" className="mt-4 max-h-64 rounded-lg" />
        )}
        {file && (
          <div className="mt-4 flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setFile(null)
                setPreviewUrl((prev) => {
                  if (prev) URL.revokeObjectURL(prev)
                  return null
                })
              }}
            >
              <Trash2 className="mr-1 h-4 w-4" />
              제거
            </Button>
            <Button type="button" disabled={uploading} onClick={() => void upload()}>
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  업로드 중…
                </>
              ) : (
                "업로드"
              )}
            </Button>
          </div>
        )}
        {state.uploadMessage && (
          <p className="mt-3 text-sm text-emerald-700 dark:text-emerald-300" role="status">
            {state.uploadMessage}
          </p>
        )}
      </div>

      <div className={cn("mt-8 rounded-lg p-6", surfaceCard)}>
        <h2 className={cn("text-lg font-semibold", surfaceTitle)}>YOLO 얼굴 학습</h2>
        <p className={cn("mt-2 text-sm", surfaceSubtle)}>
          celebrity 데이터셋으로 YOLOv11 Nano를 학습합니다. device=auto이면 GPU가 있으면 자동 사용합니다.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button
            type="button"
            disabled={state.training}
            onClick={() => void startTraining()}
          >
            {state.training ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                학습 중… (수 분 소요)
              </>
            ) : (
              "GPU 학습 시작 (10 epochs)"
            )}
          </Button>
        </div>
        {state.trainMessage && (
          <p
            className={cn(
              "mt-3 text-sm",
              state.trainMessage.includes("오류") || state.trainMessage.includes("실패")
                ? "text-red-700 dark:text-red-300"
                : "text-emerald-700 dark:text-emerald-300",
            )}
            role="status"
          >
            {state.trainMessage}
          </p>
        )}
      </div>

      <div className={cn("mt-8 rounded-lg p-6", surfaceCard)}>
        <h2 className={cn("text-lg font-semibold", surfaceTitle)}>비전 모듈</h2>
        {state.loading && <p className={cn("mt-4 text-sm", surfaceBody)}>불러오는 중…</p>}
        {state.error && (
          <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-950/40 dark:text-red-300">
            {state.error}
          </p>
        )}
        {!state.loading && !state.error && (
          <ul className="mt-4 space-y-3">
            {state.characters.map((character) => (
              <li
                key={character.id}
                className="rounded-lg border border-gray-200 px-4 py-3 dark:border-white/10"
              >
                <div className="flex flex-wrap justify-between gap-2">
                  <span className={cn("font-medium", surfaceTitle)}>{character.name}</span>
                  <span className={cn("text-xs", surfaceMuted)}>{character.myself_path}</span>
                </div>
                <p className={cn("mt-1 text-sm", surfaceSubtle)}>{character.role}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
