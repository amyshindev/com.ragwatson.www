import { FaqEntryForm } from "@/components/domain-forms/domain-forms"
import { DomainFormShell } from "@/components/marketing/domain-form-shell"

export default function FaqPage() {
  return (
    <DomainFormShell
      title="FAQ"
      lead="카테고리·질문·답변을 적어 두면 향후 FAQ API와 렌더 모듈에 연결하기 쉽습니다."
    >
      <FaqEntryForm />
    </DomainFormShell>
  )
}
