import { createClient } from '@libsql/client'
import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

// Strip potential BOM (U+FEFF) that PowerShell may prepend when setting env vars
function stripBom(str: string | undefined): string | undefined {
  return str?.replace(/^﻿/, '')
}

function createPrismaClient() {
  const libsql = createClient({
    url: stripBom(process.env.TURSO_DATABASE_URL)!,
    authToken: stripBom(process.env.TURSO_AUTH_TOKEN),
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const adapter = new PrismaLibSql(libsql as any)
  return new PrismaClient({ adapter })
}

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
