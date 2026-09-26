import { config } from 'dotenv'
config({ path: '.env.local' })
import { createClient } from '@libsql/client'

const db = createClient({
  url: (process.env.TURSO_DATABASE_URL || '').replace('libsql://', 'https://'),
  authToken: process.env.TURSO_AUTH_TOKEN,
})

const VIEJO = '+54 9 11 6873-3406'
const NUEVO = '+54 9 11 2603-6495'

async function run() {
  const cfg = await db.execute({
    sql: "UPDATE config_sitio SET valor = ? WHERE clave = 'empresa_telefono'",
    args: [NUEVO],
  })
  console.log('✅ config_sitio.empresa_telefono actualizado. Rows affected:', cfg.rowsAffected)

  const blog = await db.execute({
    sql: 'UPDATE articulos_blog SET contenido = REPLACE(contenido, ?, ?) WHERE contenido LIKE ?',
    args: [VIEJO, NUEVO, `%${VIEJO}%`],
  })
  console.log('✅ articulos_blog con número viejo actualizados. Rows affected:', blog.rowsAffected)
  process.exit(0)
}

run().catch((e) => { console.error(e); process.exit(1) })
