import { MailShell } from "@/components/mail-shell"

export default function AutomataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MailShell>{children}</MailShell>
}
