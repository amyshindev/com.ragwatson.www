import { LibraryDataForm } from "@/components/domain-forms/domain-forms"
import { DomainFormShell } from "@/components/marketing/domain-form-shell"

export default function LibraryPage() {
  return (
    <DomainFormShell
      title="마이 아카이브"
      lead="프로젝트와 태그를 입력해 두면, 이후 API와 연결해 저장·목록 조회에 사용할 수 있습니다."
    >
      <LibraryDataForm />
    </DomainFormShell>
  )
}
