import { cn } from "@/lib/utils"

export default function VisionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className={cn("mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6")}>
      {children}
    </main>
  )
}
