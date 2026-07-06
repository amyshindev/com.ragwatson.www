import { MailShell } from "@/components/mail-shell"

export default function MailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MailShell>{children}</MailShell>
}
