import { StudioWorkspaceDataForm } from "@/components/domain-forms/domain-forms"
import { DomainFormShell } from "@/components/marketing/domain-form-shell"

export default function StudioWorkspacePage() {
  return (
    <DomainFormShell
      title="비주얼 커스텀 워크스페이스"
      lead="프리셋과 글리치 강도 등을 임시로 기록합니다. 실제 9:16 미리보기·패널 UI는 추후 연결됩니다."
      backHref="/studio"
      backLabel="스튜디오"
    >
      <StudioWorkspaceDataForm />
    </DomainFormShell>
  )
}
