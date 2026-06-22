"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { getAuthUser } from "@/lib/auth-session"
import { isAdminUser } from "@/lib/admin-auth"

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const user = getAuthUser()
    if (!isAdminUser(user)) {
      const next = encodeURIComponent(pathname)
      router.replace(`/admin/login?next=${next}`)
      return
    }
    setReady(true)
  }, [router, pathname])

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-gray-500 dark:text-zinc-500">
        확인 중…
      </div>
    )
  }

  return <>{children}</>
}
