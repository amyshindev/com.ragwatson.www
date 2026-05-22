import { GalleryEntryForm } from "@/components/domain-forms/domain-forms"
import { DomainFormShell } from "@/components/marketing/domain-form-shell"

export default function AdminGalleryRegisterPage() {
  return (
    <DomainFormShell
      title="갤러리 등록"
      lead="FastAPI POST /api/domain/gallery 로 DB에 저장합니다."
      backHref="/admin"
      backLabel="관리 홈"
    >
      <GalleryEntryForm />
    </DomainFormShell>
  )
}
