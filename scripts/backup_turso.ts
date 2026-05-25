import { config } from 'dotenv'
config({ path: '.env.local' })
import { createClient } from '@libsql/client'
import * as fs from 'fs'
import * as path from 'path'

const db = createClient({
  url: (process.env.TURSO_DATABASE_URL || '').replace('libsql://', 'https://'),
  authToken: process.env.TURSO_AUTH_TOKEN,
})

const BACKUP_DIR = path.join(process.cwd(), 'backups')
const MAX_BACKUPS = 7

const TABLES = [
  'usuarios',
  'modulos',
  'piscinas',
  'coeficientes_cuota',
  'obras',
  'testimonios',
  'articulos_blog',
  'config_sitio',
]

async function exportTable(table: string): Promise<Record<string, unknown>[]> {
  const result = await db.execute({ sql: `SELECT * FROM ${table}`, args: [] })
  return result.rows.map((row) => {
    const obj: Record<string, unknown> = {}
    result.columns.forEach((col, i) => { obj[col] = row[i] })
    return obj
  })
}

async function run() {
  // Crear directorio de backups si no existe
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true })
    console.log(`📁 Directorio creado: ${BACKUP_DIR}`)
  }

  console.log('📦 Iniciando backup de Turso DB...')

  const backup: Record<string, unknown[]> = {
    _meta: {
      fecha: new Date().toISOString(),
      tablas: TABLES,
      version: '1.0',
    } as unknown as unknown[],
  }

  for (const table of TABLES) {
    try {
      const rows = await exportTable(table)
      backup[table] = rows
      console.log(`  ✅ ${table}: ${rows.length} registros`)
    } catch (err) {
      console.warn(`  ⚠️  ${table}: tabla no encontrada o error (${(err as Error).message})`)
      backup[table] = []
    }
  }

  // Nombre del archivo con fecha
  const fecha = new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-')
  const filename = `turso_${fecha}.json`
  const filepath = path.join(BACKUP_DIR, filename)

  fs.writeFileSync(filepath, JSON.stringify(backup, null, 2), 'utf-8')
  console.log(`\n💾 Backup guardado: backups/${filename}`)

  // Mantener solo los últimos MAX_BACKUPS backups
  const files = fs
    .readdirSync(BACKUP_DIR)
    .filter((f) => f.startsWith('turso_') && f.endsWith('.json'))
    .sort() // orden cronológico ascendente por nombre

  if (files.length > MAX_BACKUPS) {
    const toDelete = files.slice(0, files.length - MAX_BACKUPS)
    for (const old of toDelete) {
      fs.unlinkSync(path.join(BACKUP_DIR, old))
      console.log(`🗑️  Backup antiguo eliminado: ${old}`)
    }
  }

  const totalRows = Object.entries(backup)
    .filter(([k]) => k !== '_meta')
    .reduce((acc, [, rows]) => acc + (rows as unknown[]).length, 0)

  console.log(`\n🎉 Backup completado. Total: ${totalRows} registros en ${TABLES.length} tablas.`)
  process.exit(0)
}

run().catch((e) => { console.error('❌ Error en backup:', e); process.exit(1) })
