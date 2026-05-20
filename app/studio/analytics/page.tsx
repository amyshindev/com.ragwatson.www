import { StudioAnalyticsDataForm } from "@/components/domain-forms/domain-forms"
import { DomainFormShell } from "@/components/marketing/domain-form-shell"

export default function StudioAnalyticsPage() {
  return (
    <DomainFormShell
      title="AI 오디오 분석 대시보드"
      lead="분석에 쓸 메타데이터를 수동으로 적어 둘 수 있습니다. 자동 분석 파이프라인과 합치면 히스토리로 쓰입니다."
      backHref="/studio"
      backLabel="스튜디오"
    >
      <StudioAnalyticsDataForm />
    </DomainFormShell>
  )
}
