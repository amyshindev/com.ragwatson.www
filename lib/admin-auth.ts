import type { MaestroAuthUser } from "@/lib/auth-session"

export const ADMIN_ROLE = "admin"

export function isAdminUser(user: MaestroAuthUser | null): boolean {
  return user?.role === ADMIN_ROLE
}
