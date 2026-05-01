import 'dotenv/config'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // Only needed for prisma migrate (CLI). Runtime uses TURSO_DATABASE_URL via lib/db.ts
    url: process.env.DATABASE_URL || 'file:./prisma/dev.db',
  },
})
