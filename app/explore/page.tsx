import { GalleryEntryForm } from "@/components/domain-forms/domain-forms"
import { DomainFormShell } from "@/components/marketing/domain-form-shell"

export default function ExplorePage() {
  return (
    <DomainFormShell
      title="갤러리"
      lead="공개 노출 전 작품 정보를 미리 채워 넣습니다. 목록 UI·노출 승인은 추후 연동됩니다."
    >
      <GalleryEntryForm />
    </DomainFormShell>
  )
}
