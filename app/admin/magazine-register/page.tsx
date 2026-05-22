import { MagazineArticleForm } from "@/components/domain-forms/domain-forms"
import { DomainFormShell } from "@/components/marketing/domain-form-shell"

export default function AdminMagazineRegisterPage() {
  return (
    <DomainFormShell
      title="매거진 등록"
      lead="FastAPI POST /api/domain/magazine 로 DB에 저장합니다."
      backHref="/admin"
      backLabel="관리 홈"
    >
      <MagazineArticleForm />
    </DomainFormShell>
  )
}
