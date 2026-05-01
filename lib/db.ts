import { createClient } from '@libsql/client'
import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

function createPrismaClient() {
  const libsql = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const adapter = new PrismaLibSql(libsql as any)
  return new PrismaClient({ adapter })
}

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
