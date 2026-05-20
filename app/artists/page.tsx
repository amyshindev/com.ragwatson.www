import { MagazineArticleForm } from "@/components/domain-forms/domain-forms"
import { DomainFormShell } from "@/components/marketing/domain-form-shell"

export default function ArtistsPage() {
  return (
    <DomainFormShell
      title="매거진"
      lead="매거진 기사 초안 필드를 제공합니다. 발행 워크플로와 에디터는 이후 단계에서 붙입니다."
    >
      <MagazineArticleForm />
    </DomainFormShell>
  )
}
