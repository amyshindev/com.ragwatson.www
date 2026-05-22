import { StudioWorkspaceDataForm } from "@/components/domain-forms/domain-forms"
import { DomainFormShell } from "@/components/marketing/domain-form-shell"

export default function AdminStudioWorkspacePage() {
  return (
    <DomainFormShell
      title="워크스페이스 인입"
      lead="FastAPI POST /api/domain/studio/workspace 로 DB에 저장합니다."
      backHref="/admin"
      backLabel="관리 홈"
    >
      <StudioWorkspaceDataForm />
    </DomainFormShell>
  )
}
