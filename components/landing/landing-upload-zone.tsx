"use client"

import { useCallback, useRef, useState } from "react"
import { Upload } from "lucide-react"
import { cn } from "@/lib/utils"

const AUDIO_ACCEPT = "audio/*,.mp3,.wav,.flac,.m4a,.aac,.ogg"

type LandingUploadZoneProps = {
  className?: string
  /** Larger copy and hit area for full-viewport CTA blocks */
  imposing?: boolean
}

export function LandingUploadZone({
  className,
  imposing = false,
}: LandingUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)

  const openPicker = useCallback(() => {
    inputRef.current?.click()
  }, [])

  return (
    <div className={cn("w-full max-w-xl", className)}>
      <input
        id="landing-upload"
        ref={inputRef}
        type="file"
        accept={AUDIO_ACCEPT}
        className="sr-only"
        onChange={() => {
          if (inputRef.current) inputRef.current.value = ""
        }}
      />

      <div
        role="button"
        tabIndex={0}
        className={cn(
          "cursor-pointer border border-dashed text-center transition-colors",
          imposing
            ? "px-8 py-10 text-base sm:px-10 sm:py-12 sm:text-lg"
            : "px-6 py-8 text-sm",
          dragActive
            ? "border-cyan-500/50 bg-cyan-950/20 text-cyan-200/90"
            : "border-zinc-700 bg-black/30 text-zinc-500 hover:border-zinc-500 hover:text-zinc-400",
        )}
        onClick={openPicker}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") openPicker()
        }}
        onDragEnter={(e) => {
          e.preventDefault()
          setDragActive(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          setDragActive(false)
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          setDragActive(false)
        }}
      >
        <Upload
          className={cn(
            "mx-auto mb-2 text-zinc-600",
            imposing ? "h-10 w-10 sm:h-12 sm:w-12" : "h-8 w-8",
          )}
        />
        MP3 / WAV / SoundCloud / YouTube 링크
      </div>
    </div>
  )
}
