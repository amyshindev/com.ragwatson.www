import { PricingInquiryForm } from "@/components/domain-forms/domain-forms"
import { DomainFormShell } from "@/components/marketing/domain-form-shell"

export default function PricingPage() {
  return (
    <DomainFormShell
      title="멤버십"
      lead="플랜 선택과 문의 내용을 남겨 두세요. 결제(PG) 연동 전까지는 데모로만 동작합니다."
    >
      <PricingInquiryForm />
    </DomainFormShell>
  )
}
