import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { headers } from 'next/headers'

/**
 * Returns true if the request comes from either:
 *  1. An authenticated NextAuth admin session (browser), or
 *  2. The CRM backend sending X-Api-Key matching CRM_API_KEY env var.
 *
 * Usage in GET handlers (no req param):   if (!await isAdminAuth()) ...
 * Usage in POST/PUT/DELETE handlers:      if (!await isAdminAuth(req)) ...
 */
export async function isAdminAuth(req?: Request): Promise<boolean> {
  // 1. Browser session
  const session = await getServerSession(authOptions)
  if (session) return true

  // 2. CRM API key
  const crmKey = process.env.CRM_API_KEY
  if (!crmKey) return false

  let incomingKey: string | null = null
  if (req) {
    incomingKey = req.headers.get('x-api-key')
  } else {
    const h = await headers()
    incomingKey = h.get('x-api-key')
  }

  return incomingKey === crmKey
}
