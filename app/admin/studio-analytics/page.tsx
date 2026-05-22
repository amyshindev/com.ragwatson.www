import { StudioAnalyticsDataForm } from "@/components/domain-forms/domain-forms"
import { DomainFormShell } from "@/components/marketing/domain-form-shell"

export default function AdminStudioAnalyticsPage() {
  return (
    <DomainFormShell
      title="오디오 분석 인입"
      lead="FastAPI POST /api/domain/studio/analytics 로 DB에 저장합니다."
      backHref="/admin"
      backLabel="관리 홈"
    >
      <StudioAnalyticsDataForm />
    </DomainFormShell>
  )
}
