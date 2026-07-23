import { config } from 'dotenv'
config({ path: '.env.local' })

const { prisma } = await import('../lib/db')

const updates = [
  { match: '18', imagen: '/img/modulos/studio-18.jpg' },
  { match: '36', imagen: '/img/modulos/quincho-36.jpg' },
  { match: '54', imagen: '/img/modulos/2dorm-54.jpg' },
  { match: '72', imagen: '/img/modulos/3dorm-72.jpg' },
]

async function run() {
  const modulos = await prisma.modulo.findMany()
  for (const u of updates) {
    const row = modulos.find((m) => m.medida.includes(u.match) || m.nombre.includes(u.match))
    if (!row) {
      console.log(`No match for ${u.match} m² — skipped`)
      continue
    }
    await prisma.modulo.update({ where: { id: row.id }, data: { imagen: u.imagen } })
    console.log(`${row.nombre} (${row.medida}) -> ${u.imagen}`)
  }
}

run().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
