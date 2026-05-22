import { LibraryDataForm } from "@/components/domain-forms/domain-forms"
import { DomainFormShell } from "@/components/marketing/domain-form-shell"

export default function AdminLibraryPage() {
  return (
    <DomainFormShell
      title="아카이브 인입"
      lead="FastAPI POST /api/domain/library 로 DB에 저장합니다."
      backHref="/admin"
      backLabel="관리 홈"
    >
      <LibraryDataForm />
    </DomainFormShell>
  )
}
