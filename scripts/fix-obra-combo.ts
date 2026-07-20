import { config } from 'dotenv'
config({ path: '.env.local' })

async function main() {
  const { prisma } = await import('../lib/db')
  const obras = await prisma.obra.findMany({ where: { descripcion: { contains: '60 cuotas fijas' } } })
  console.log('Obras con "60 cuotas fijas":', obras.map((o) => ({ id: o.id, titulo: o.titulo, descripcion: o.descripcion })))
  for (const o of obras) {
    await prisma.obra.update({
      where: { id: o.id },
      data: { descripcion: o.descripcion.replace('Financiación en 60 cuotas fijas.', 'Financiado en un solo plan, ajustado por ICC.') },
    })
    console.log(`Patcheada obra: ${o.id}`)
  }
}
main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
