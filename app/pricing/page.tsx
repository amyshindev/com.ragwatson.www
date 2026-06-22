import { DomainFormShell } from "@/components/marketing/domain-form-shell"
import { surfaceMuted } from "@/lib/theme-surface"
import { cn } from "@/lib/utils"

export default function PricingPage() {
  return (
    <DomainFormShell
      title="요금제"
      lead="무료·프로·팀 플랜 비교는 준비 중입니다."
    >
      <p className={cn("text-sm", surfaceMuted)}>
        플랜 비교표와 문의 폼은 추후 업데이트됩니다.
      </p>
    </DomainFormShell>
  )
}
