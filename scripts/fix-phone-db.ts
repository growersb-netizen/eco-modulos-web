import { config } from 'dotenv'
config({ path: '.env.local' })
import { createClient } from '@libsql/client'

const db = createClient({
  url: (process.env.TURSO_DATABASE_URL || '').replace('libsql://', 'https://'),
  authToken: process.env.TURSO_AUTH_TOKEN,
})

async function run() {
  const res = await db.execute({
    sql: "UPDATE config_sitio SET valor = '+54 9 11 6873-3406' WHERE clave = 'empresa_telefono'",
    args: [],
  })
  console.log('✅ Teléfono actualizado en DB. Rows affected:', res.rowsAffected)
  process.exit(0)
}

run().catch((e) => { console.error(e); process.exit(1) })
