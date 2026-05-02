import { config } from 'dotenv'
config({ path: '.env.local' })
import { createClient } from '@libsql/client'
import { readFileSync } from 'fs'
import { join } from 'path'

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

const sqlPath = join(process.cwd(), 'prisma/migrations/20260426124311_init/migration.sql')
const sql = readFileSync(sqlPath, 'utf-8')

const statements = sql.split(';').map((s) => s.trim()).filter((s) => s.length > 0)

async function run() {
  console.log(`Applying ${statements.length} statements to Turso...`)
  for (const stmt of statements) {
    try {
      await client.execute(stmt)
      console.log(`✓ ${stmt.slice(0, 60)}…`)
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes('already exists')) {
        console.log(`⚠ Skipped (already exists): ${stmt.slice(0, 60)}…`)
      } else {
        console.error(`✗ Error: ${err instanceof Error ? err.message : err}`)
        console.error(`  Statement: ${stmt.slice(0, 100)}`)
      }
    }
  }
  console.log('Done!')
  process.exit(0)
}

run()
