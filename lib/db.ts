import { createClient } from '@libsql/client'
import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

// Strip potential BOM (U+FEFF) that PowerShell may prepend when setting env vars
function clean(str: string | undefined): string {
  return (str || '').replace(/^﻿/, '').trim()
}

function createPrismaClient() {
  const rawUrl = clean(process.env.TURSO_DATABASE_URL)
  // Use https:// instead of libsql:// for reliable HTTP mode in serverless environments
  // WebSocket (libsql://) can fail in Vercel Lambda due to connection lifecycle issues
  const url = rawUrl.startsWith('libsql://')
    ? rawUrl.replace('libsql://', 'https://')
    : rawUrl

  const libsql = createClient({
    url,
    authToken: clean(process.env.TURSO_AUTH_TOKEN) || undefined,
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const adapter = new PrismaLibSql(libsql as any)
  return new PrismaClient({ adapter })
}

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
