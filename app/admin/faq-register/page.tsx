import { FaqEntryForm } from "@/components/domain-forms/domain-forms"
import { DomainFormShell } from "@/components/marketing/domain-form-shell"

export default function AdminFaqRegisterPage() {
  return (
    <DomainFormShell
      title="FAQ 등록"
      lead="FastAPI POST /api/domain/faq 로 DB에 저장합니다."
      backHref="/admin"
      backLabel="관리 홈"
    >
      <FaqEntryForm />
    </DomainFormShell>
  )
}
