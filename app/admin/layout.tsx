"use client"

import { usePathname } from "next/navigation"
import { AdminShell } from "@/components/admin/admin-shell"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLogin = pathname === "/admin/login"

  if (isLogin) {
    return children
  }

  return (
    <div className="-mt-20 min-h-[100dvh] md:min-h-screen">
      <AdminShell>{children}</AdminShell>
    </div>
  )
}
