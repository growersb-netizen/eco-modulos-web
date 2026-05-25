import { config } from 'dotenv'
config({ path: '.env.local' })
import { createClient } from '@libsql/client'

const db = createClient({
  url: (process.env.TURSO_DATABASE_URL || '').replace('libsql://', 'https://'),
  authToken: process.env.TURSO_AUTH_TOKEN,
})

async function run() {
  const m = await db.execute({ sql: 'SELECT nombre, imagen FROM modulos ORDER BY orden', args: [] })
  const p = await db.execute({ sql: 'SELECT nombre, imagen FROM piscinas ORDER BY orden', args: [] })
  const o = await db.execute({ sql: 'SELECT titulo, imagen FROM obras ORDER BY creadoEn DESC LIMIT 10', args: [] })

  console.log('\n=== MÓDULOS ===')
  m.rows.forEach(r => console.log(`  ${r[0]}  →  ${r[1] ?? 'NULL'}` ))

  console.log('\n=== PISCINAS ===')
  p.rows.forEach(r => console.log(`  ${r[0]}  →  ${r[1] ?? 'NULL'}` ))

  console.log('\n=== OBRAS (últimas 10) ===')
  o.rows.forEach(r => console.log(`  ${r[0]}  →  ${r[1] ?? 'NULL'}` ))

  process.exit(0)
}
run().catch(e => { console.error(e); process.exit(1) })
